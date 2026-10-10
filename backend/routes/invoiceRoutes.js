const express = require('express');
const Invoice = require('../models/Invoice');
const Client = require('../models/Client');
const ClientUser = require('../models/ClientUser');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const { authenticateClient } = require('../middleware/clientAuthMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const { calculateInvoice } = require('../utils/invoice');
const { invoiceEmail } = require('../utils/invoiceEmail');
const { sendEmail } = require('../services/emailService');
const notifyInvoice = async (invoice, client) => {
  const user = !client?.contactEmail ? await ClientUser.findOne({ client: invoice.client, isActive: true }) : null;
  const to = client?.contactEmail || user?.email;
  if (!to) return 'No client email available; invoice is visible in the dashboard.';
  try { await sendEmail({ to, ...invoiceEmail(invoice) }); await Invoice.updateOne({ _id: invoice._id }, { $set: { notificationSentAt: new Date() } }); return invoice.status === 'Paid' ? 'Payment thank-you email sent.' : 'Pending-payment email sent.'; }
  catch (_error) { return 'Email notification failed; the invoice remains available in the dashboard. Check SMTP settings.'; }
};
const createInvoiceRouter = (admin) => {
  const router = express.Router();
  router.use(admin ? authenticateAdmin : authenticateClient);
  if (admin) router.use(requireRole('Super Admin'));
  router.use('/files', require('./uploadedInvoiceRoutes').createUploadedInvoiceRouter(admin));
  router.get('/', async (req, res) => {
    const query = admin ? {} : { client: req.client._id, status: { $ne: 'Draft' } };
    const invoices = await Invoice.find(query).populate('client','name domain').sort({ createdAt: -1 }).limit(100).lean();
    res.json({ success: true, data: invoices });
  });
  if (!admin) return router;
  router.get('/sample', (_req, res) => res.json({ success: true, data: require(require('fs').existsSync(require('path').join(__dirname, '../data/sampleInvoice.local.json')) ? '../data/sampleInvoice.local.json' : '../data/sampleInvoice.json') }));
  router.post('/', async (req, res) => {
    let data; try { data = calculateInvoice(req.body); } catch (error) { return res.status(400).json({ success: false, message: error.message }); }
    if (!/^[a-f0-9]{24}$/i.test(req.body.client || '') || !await Client.exists({ _id: req.body.client })) return res.status(400).json({ success: false, message: 'Choose an existing client.' });
    const invoice = await Invoice.create({ ...data, client: req.body.client, createdBy: req.admin._id });
    res.status(201).json({ success: true, data: invoice });
  });
  router.patch('/:id', async (req, res) => {
    let data; try { data = calculateInvoice(req.body); } catch (error) { return res.status(400).json({ success: false, message: error.message }); }
    const invoice = await Invoice.findOneAndUpdate({ _id: req.params.id, status: 'Draft' }, { $set: data }, { new: true, runValidators: true });
    if (!invoice) return res.status(409).json({ success: false, message: 'Only draft invoices can be edited.' });
    res.json({ success: true, data: invoice });
  });
  router.post('/:id/issue', async (req, res) => {
    const draft = await Invoice.findOne({ _id: req.params.id, status: 'Draft' });
    if (!draft) return res.status(409).json({ success: false, message: 'Invoice is already issued or unavailable.' });
    const client = await Client.findById(draft.client);
    if (!client || client.status !== 'Active') return res.status(400).json({ success: false, message: 'Activate the client before issuing an invoice.' });
    const billedTo = Object.fromEntries(['name','contactName','contactEmail','phone','address'].map(key=>[key,client[key] || '']));
    if (draft.buyerName) billedTo.name = draft.buyerName;
    if (draft.buyerAddress) billedTo.address = draft.buyerAddress;
    const invoice = await Invoice.findOneAndUpdate({ _id: draft._id, status: 'Draft' }, { $set: { status: 'Pending', issuedAt: new Date(), billedTo } }, { new: true });
    if (!invoice) return res.status(409).json({ success: false, message: 'Invoice was already issued.' });
    const notification = await notifyInvoice(invoice, client);
    res.json({ success: true, data: invoice, message: `Invoice issued. ${notification}` });
  });
  router.post('/:id/remind', async (req, res) => {
    const invoice = await Invoice.findOne({ _id: req.params.id, status: 'Pending' });
    if (!invoice) return res.status(409).json({ success: false, message: 'Only pending invoices can receive reminders.' });
    const client = await Client.findById(invoice.client);
    res.json({ success: true, message: await notifyInvoice(invoice, client) });
  });
  router.post('/:id/status', async (req, res) => {
    if (!['Pending','Paid','Cancelled'].includes(req.body.status)) return res.status(400).json({ success: false, message: 'Choose Pending, Paid or Cancelled.' });
    const invoice = await Invoice.findOneAndUpdate({ _id: req.params.id, status: { $in: ['Pending','Paid'] } }, { $set: { status: req.body.status, paidAt: req.body.status === 'Paid' ? new Date() : null } }, { new: true });
    if (!invoice) return res.status(409).json({ success: false, message: 'Only pending or paid invoices can change payment status.' });
    const client = await Client.findById(invoice.client);
    const notification = req.body.status !== 'Cancelled' ? await notifyInvoice(invoice, client) : 'Invoice cancelled.';
    res.json({ success: true, data: invoice, message: `Status updated. ${notification}` });
  });
  return router;
};
module.exports = { createInvoiceRouter };
