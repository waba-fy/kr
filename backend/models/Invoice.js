const mongoose = require('mongoose');
const crypto = require('crypto');
const schema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true, index: true },
  number: { type: String, required: true, unique: true, default: () => `KR-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${crypto.randomBytes(4).toString('hex').toUpperCase()}` },
  status: { type: String, enum: ['Draft', 'Pending', 'Paid', 'Cancelled'], default: 'Draft' },
  currency: { type: String, enum: ['INR','USD','EUR','GBP','AED'], default: 'INR' },
  issueDate: { type: Date, required: true }, dueDate: { type: Date, required: true },
  items: [{ description: String, quantity: Number, unitMinor: Number, totalMinor: Number, discountMinor: Number, sacCode: String, unit: String }],
  taxMode: { type: String, enum: ['Split GST','IGST','No tax'], default: 'Split GST' },
  cgstMinor: Number, sgstMinor: Number, amountInWords: String,
  sellerPan: String, buyerName: String, buyerAddress: String, buyerTaxId: String, buyerPan: String,
  bankAccountName: String, bankName: String, bankBranch: String, bankAccountNumber: String, bankIfsc: String,
  invoicePeriod: String, adjustmentMinor: Number, signatoryName: String, signatureUrl: String,
  subtotalMinor: Number, taxRate: Number, taxMinor: Number, totalMinor: Number,
  sellerName: { type: String, default: 'Sixedge Innovations' }, sellerAddress: { type: String, default: '' }, sellerTaxId: { type: String, default: '' },
  notes: { type: String, default: '' }, paymentInstructions: { type: String, default: '' },
  billedTo: { name: String, contactName: String, contactEmail: String, phone: String, address: String },
  issuedAt: Date, paidAt: Date, notificationSentAt: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
}, { timestamps: true });
module.exports = mongoose.models.Invoice || mongoose.model('Invoice', schema);
