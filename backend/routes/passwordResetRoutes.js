const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { validatePasswordStrength } = require('../utils/password');

const createPasswordResetRouter = (scope, dependencies = {}) => {
  const Account = dependencies.Account || require(scope === 'admin' ? '../models/Admin' : '../models/ClientUser');
  const Reset = dependencies.Reset || require('../models/PasswordReset');
  const Limit = dependencies.Limit || require('../models/PasswordResetLimit');
  const Client = dependencies.Client || require('../models/Client');
  const mail = dependencies.mail || require('../config/mail');
  const secret = () => dependencies.secret || process.env.JWT_SECRET;
  const digest = (email, otp) => crypto.createHmac('sha256', secret()).update(`${scope}:${email}:${otp}`).digest('hex');
  const router = express.Router();
  const generic = 'If an active account exists for this email, a verification code has been sent. Check your inbox and spam folder.';
  const eligible = async (account) => account?.isActive && (scope === 'admin' || Boolean(await Client.exists({ _id: account.client, status: 'Active' })));
  router.use(async (req, res, next) => {
    if (!['/forgot-password', '/reset-password'].includes(req.path)) return next();
    res.set('Cache-Control', 'no-store');
    if (!secret()) return res.status(503).json({ success: false, message: 'Password recovery is temporarily unavailable.' });
    const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false, message: 'Enter a valid email address.' });
    req.resetEmail = email;
    const hour = Math.floor(Date.now() / 3600000);
    const limits = [[`ip:${req.ip || req.socket.remoteAddress}`, 40], [`email:${email}`, 20]];
    if (req.path === '/forgot-password') limits.push([`send:${email}`, 5]);
    for (const [value, max] of limits) {
      const key = crypto.createHash('sha256').update(`${scope}:${hour}:${value}`).digest('hex');
      let limit;
      try { limit = await Limit.findOneAndUpdate({ key }, { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date((hour + 2) * 3600000) } }, { upsert: true, new: true }); }
      catch (error) { if (error.code !== 11000) throw error; limit = await Limit.findOneAndUpdate({ key }, { $inc: { count: 1 } }, { new: true }); }
      if (limit.count > max) { res.set('Retry-After', '3600'); return res.status(429).json({ success: false, message: 'Too many recovery attempts. Please try again later.' }); }
    }
    next();
  });
  router.post('/forgot-password', async (req, res) => {
    const email = req.resetEmail;
    const account = await Account.findOne({ email });
    if (!await eligible(account)) return res.json({ success: true, message: generic });
    const otp = crypto.randomInt(100000, 1000000).toString();
    const issuedAt = new Date();
    let challenge;
    try {
      challenge = await Reset.findOneAndUpdate({ scope, email, issuedAt: { $lte: new Date(Date.now() - 60000) } }, { $set: { digest: digest(email, otp), attempts: 0, issuedAt, expiresAt: new Date(Date.now() + 600000) } }, { new: true, upsert: true });
    } catch (error) {
      if (error.code === 11000) return res.json({ success: true, message: generic });
      throw error;
    }
    try {
      const result = await mail.sendMail({ to: email, subject: 'KeyRoutes password reset code', text: `Your KeyRoutes ${scope} password reset code is ${otp}. It expires in 10 minutes. If you did not request this, ignore this email. Never share this code.`, html: `<p>Your KeyRoutes ${scope} password reset code:</p><p style="font-size:28px;font-weight:bold;letter-spacing:6px">${otp}</p><p>Expires in 10 minutes. If you did not request this, ignore this email. Never share this code.</p>` });
      if (result.rejected?.includes(email)) throw new Error('Recipient rejected');
    } catch (_error) {
      await Reset.deleteOne({ _id: challenge._id, issuedAt });
      // Keep the public response identical for existing and unknown accounts.
      console.error(`Password recovery email delivery failed (${scope}).`);
    }
    res.json({ success: true, message: generic });
  });
  router.post('/reset-password', async (req, res) => {
    const email = req.resetEmail;
    const otp = typeof req.body?.otp === 'string' ? req.body.otp.trim() : '';
    const password = req.body?.password;
    const strength = validatePasswordStrength(password);
    if (typeof password !== 'string' || Buffer.byteLength(password, 'utf8') > 72 || !strength.isValid) return res.status(400).json({ success: false, message: !strength.isValid ? strength.message : 'Password must be no more than 72 bytes.' });
    const invalid = () => res.status(400).json({ success: false, message: 'Invalid or expired code. Request a new code and try again.' });
    if (!/^\d{6}$/.test(otp)) return invalid();
    const challenge = await Reset.findOneAndUpdate({ scope, email, expiresAt: { $gt: new Date() }, attempts: { $lt: 5 } }, { $inc: { attempts: 1 } }, { new: true }).select('+digest');
    if (!challenge || !crypto.timingSafeEqual(Buffer.from(challenge.digest, 'hex'), Buffer.from(digest(email, otp), 'hex'))) return invalid();
    const account = await Account.findOne({ email });
    if (!await eligible(account)) return invalid();
    // Atomic consumption prevents concurrent requests from reusing the same code.
    const consumed = await Reset.findOneAndDelete({ _id: challenge._id, digest: challenge.digest, issuedAt: challenge.issuedAt, expiresAt: { $gt: new Date() }, attempts: { $lte: 5 } });
    if (!consumed) return invalid();
    const hashed = await bcrypt.hash(password, 12);
    await Account.updateOne({ _id: account._id, isActive: true }, { $set: { password: hashed, passwordChangedAt: new Date() } });
    res.json({ success: true, message: 'Password updated. Sign in with your new password.' });
  });
  return router;
};
module.exports = { createPasswordResetRouter };
