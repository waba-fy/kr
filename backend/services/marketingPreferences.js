const crypto = require('crypto');
const Preference = require('../models/MarketingPreference');
const Lead = require('../models/ConsultationLead');
const Subscriber = require('../models/Subscriber');
const canSendMarketing = async (email) => {
  const normalized = String(email).trim().toLowerCase();
  const [preference, subscriber] = await Promise.all([Preference.findOne({ email: normalized }), Subscriber.findOne({ email: normalized })]);
  if (preference?.unsubscribedAt || (subscriber && ['Unsubscribed','Blocked','Pending'].includes(subscriber.status))) return false;
  if (subscriber?.status === 'Active' && subscriber.consentGiven === true) return true;
  return Boolean(await Lead.exists({ email: normalized, marketingOptOut: { $ne: true } }));
};
const unsubscribeUrl = async (email) => {
  const normalized = String(email).trim().toLowerCase();
  let preference;
  try { preference = await Preference.findOneAndUpdate({ email: normalized }, { $setOnInsert: { token: crypto.randomBytes(32).toString('hex') } }, { upsert: true, new: true }).select('+token'); }
  catch (error) { if (error.code !== 11000) throw error; preference = await Preference.findOne({ email: normalized }).select('+token'); }
  return `${String(process.env.BACKEND_PUBLIC_URL || 'https://api.keyroutes.co').replace(/\/$/, '')}/api/marketing/unsubscribe/${preference.token}`;
};
module.exports = { canSendMarketing, unsubscribeUrl };
