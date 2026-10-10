const mongoose = require('mongoose');
const schema = new mongoose.Schema({ email: { type: String, required: true, unique: true, lowercase: true, trim: true }, token: { type: String, required: true, unique: true, select: false }, unsubscribedAt: { type: Date, default: null } }, { timestamps: true });
module.exports = mongoose.models.MarketingPreference || mongoose.model('MarketingPreference', schema);
