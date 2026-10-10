const express = require('express');
const { authenticateClient } = require('../middleware/clientAuthMiddleware');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const Ticket = require('../models/SupportTicket');
const statuses = ['Open', 'In progress', 'Resolved', 'Closed'];
const categories = ['General support', 'Additional service', 'Technical issue', 'Billing'];
const validText = (text, max) => typeof text === 'string' && text.trim().length > 0 && text.trim().length <= max;
const createTicketRouter = (admin, Model = Ticket, auth = admin ? authenticateAdmin : authenticateClient) => {
  const router = express.Router(); router.use(auth);
  const scope = req => admin ? {} : { client: req.client._id };
  router.get('/', async (req, res) => {
    const query = Model.find(scope(req)).sort({ updatedAt: -1 }).limit(100);
    if (admin) query.populate('client', 'name domain contactName contactEmail phone');
    res.json({ success: true, data: await query.lean() });
  });
  if (!admin) router.post('/', async (req, res) => {
    const { subject, description, category } = req.body || {};
    if (!validText(subject, 200) || !validText(description, 5000) || !categories.includes(category)) return res.status(400).json({ success: false, message: 'Enter a subject, category and description (up to 5,000 characters).' });
    if (await Model.countDocuments({ client: req.client._id, createdAt: { $gt: new Date(Date.now() - 3600000) } }) >= 10) return res.status(429).json({ success: false, message: 'Too many tickets this hour. Reply to an existing ticket or try again later.' });
    const ticket = await Model.create({ client: req.client._id, createdBy: req.clientUser._id, subject: subject.trim(), description: description.trim(), category });
    res.status(201).json({ success: true, data: ticket });
  });
  router.patch('/:id', async (req, res) => {
    if (!/^[a-f0-9]{24}$/i.test(req.params.id)) return res.status(404).json({ success: false, message: 'Ticket not found.' });
    const { reply, status } = req.body || {};
    if ((reply !== undefined && !validText(reply, 5000)) || (admin && status !== undefined && !statuses.includes(status)) || (!reply && (!admin || !status))) return res.status(400).json({ success: false, message: 'Enter a valid reply or status.' });
    const update = {};
    if (reply) update.$push = { messages: { body: reply.trim(), author: admin ? 'admin' : 'client', name: admin ? req.admin.name : req.clientUser.name, createdAt: new Date() } };
    if (admin && status) update.$set = { status };
    if (!admin && reply) update.$set = { status: 'Open' };
    const ticket = await Model.findOneAndUpdate({ _id: req.params.id, ...scope(req), 'messages.199': { $exists: false } }, update, { new: true, runValidators: true });
    if (!ticket) return res.status(404).json({ success: false, message: 'Ticket not found or reply limit reached.' });
    res.json({ success: true, data: ticket });
  });
  return router;
};
module.exports = { createTicketRouter };
