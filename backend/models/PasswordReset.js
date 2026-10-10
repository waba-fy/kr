const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  scope: { type: String, enum: ['admin', 'client'], required: true },
  email: { type: String, required: true },
  digest: { type: String, required: true, select: false },
  attempts: { type: Number, default: 0 },
  issuedAt: { type: Date, required: true },
  expiresAt: { type: Date, required: true },
});
schema.index({ scope: 1, email: 1 }, { unique: true });
schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.models.PasswordReset || mongoose.model('PasswordReset', schema);
