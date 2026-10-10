const express = require('express');
const multer = require('multer');
const Model = require('../models/UploadedInvoice');
const Client = require('../models/Client');
const notifyServiceInvoice = async (file, Clients) => {
  if (file.provider !== 'Service') return 'Payment status updated for your records.';
  const client = await Clients.findById(file.client);
  const user = !client?.contactEmail ? await require('../models/ClientUser').findOne({client:file.client,isActive:true}) : null;
  const to = client?.contactEmail || user?.email;
  if (!to) return 'No contact email available. The invoice is visible in the dashboard.';
  const paid = file.status === 'Paid';
  const html = require('../utils/marketingTemplate').renderMarketingTemplate({headline:paid?'Thank you for your payment':'Your service invoice is pending payment',body:`${paid?'Thank you for your payment. Your service invoice has been marked paid.':'Please arrange payment for your service invoice using its payment details.'}\n\nInvoice: ${file.title}`,buttonLabel:'View invoice',buttonUrl:'https://keyroutes.co/client',style:'classic'});
  try { await require('../services/emailService').sendEmail({to,subject:paid?'KeyRoutes payment received':'KeyRoutes payment reminder',html}); return paid?'Payment thank-you email sent.':'Pending-payment email sent.'; }
  catch(_error){return 'Email delivery failed. Check SMTP settings; the invoice is still available in the dashboard.';}
};
const createUploadedInvoiceRouter = (admin, Store = Model, Clients = Client) => {
  const router = express.Router();
  const scope = req => admin ? {} : { client: req.client._id };
  router.get('/', async (req, res) => res.json({ success: true, data: await Store.find(scope(req)).populate('client','name').sort({ createdAt: -1 }).limit(100).lean() }));
  router.get('/:id/download', async (req, res) => {
    if (!/^[a-f0-9]{24}$/i.test(req.params.id)) return res.status(404).json({ success: false, message: 'Invoice file not found.' });
    const file = await Store.findOne({ _id: req.params.id, ...scope(req) }).select('+content');
    if (!file) return res.status(404).json({ success: false, message: 'Invoice file not found.' });
    res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${file.filename.replace(/[^a-zA-Z0-9._ -]/g,'_')}"`, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
    res.send(file.content);
  });
  if (!admin) return router;
  const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024, files: 1, fields: 5, fieldSize: 1000 } }).single('invoice');
  router.post('/', (req, res, next) => upload(req, res, error => error ? res.status(400).json({ success: false, message: 'Upload one PDF invoice, up to 10 MB.' }) : next()), async (req, res) => {
    const { client, title, provider, status } = req.body || {};
    if (!req.file || req.file.buffer.toString('ascii',0,5) !== '%PDF-' || !req.file.buffer.subarray(Math.max(0,req.file.buffer.length-2048)).includes(Buffer.from('%%EOF'))) return res.status(400).json({ success: false, message: 'Choose a valid PDF invoice.' });
    if (!/^[a-f0-9]{24}$/i.test(client || '') || !await Clients.exists({ _id: client })) return res.status(400).json({ success: false, message: 'Choose an existing client.' });
    if (typeof title !== 'string' || !title.trim() || title.length > 200 || !['Service','Google','Meta','Other'].includes(provider) || !['Pending','Paid'].includes(status)) return res.status(400).json({ success: false, message: 'Enter invoice title, provider and status.' });
    const saved = await Store.create({ client, title: title.trim(), provider, status, filename: req.file.originalname.replace(/[\\/\r\n\x00]/g,'_').slice(0,180), content: req.file.buffer, createdBy: req.admin._id });
    res.status(201).json({ success: true, data: { _id: saved._id, title: saved.title }, message: 'Invoice uploaded and available to this client.' });
  });
  router.post('/:id/remind', async (req,res)=>{const file=await Store.findOne({_id:req.params.id,provider:'Service',status:'Pending'});if(!file)return res.status(409).json({success:false,message:'Only pending service invoices can receive reminders.'});res.json({success:true,message:await notifyServiceInvoice(file,Clients)});});
  router.patch('/:id/status', async (req, res) => {
    if (!['Pending','Paid'].includes(req.body?.status)) return res.status(400).json({ success: false, message: 'Choose Pending or Paid.' });
    const file = await Store.findByIdAndUpdate(req.params.id, { $set: { status: req.body.status } }, { new: true });
    if (!file) return res.status(404).json({ success: false, message: 'Invoice file not found.' });
    res.json({ success: true, message: await notifyServiceInvoice(file,Clients) });
  });
  return router;
};
module.exports = { createUploadedInvoiceRouter };
