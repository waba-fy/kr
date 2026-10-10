const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true, index: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'ClientUser', required: true },
  subject: { type: String, required: true, maxlength: 200 },
  category: { type: String, enum: ['General support', 'Additional service', 'Technical issue', 'Billing'], default: 'General support' },
  description: { type: String, required: true, maxlength: 5000 },
  status: { type: String, enum: ['Open', 'In progress', 'Resolved', 'Closed'], default: 'Open', index: true },
  messages: [{ body: { type: String, required: true, maxlength: 5000 }, author: { type: String, enum: ['client', 'admin'], required: true }, name: String, createdAt: { type: Date, default: Date.now } }],
}, { timestamps: true });
module.exports = mongoose.models.SupportTicket || mongoose.model('SupportTicket', schema);
