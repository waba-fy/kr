const express = require('express');
const multer = require('multer');

const imageType = (buffer) => {
  if (buffer.length >= 24 && buffer.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) && buffer.toString('ascii', 12, 16) === 'IHDR') return 'image/png';
  if (buffer.length >= 4 && buffer[0] === 255 && buffer[1] === 216 && buffer[2] === 255 && buffer[buffer.length - 2] === 255 && buffer[buffer.length - 1] === 217) return 'image/jpeg';
  if (buffer.length >= 16 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') return 'image/webp';
  return null;
};
const createClientBrandingRouter = (Client = require('../models/Client')) => {
  const router = express.Router();
  const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024, files: 1, fields: 0 } }).single('logo');
  router.post('/logo', (req, res, next) => upload(req, res, (error) => {
    if (error) return res.status(400).json({ success: false, message: 'Upload one PNG, JPG or WebP image, up to 2 MB.' });
    next();
  }), async (req, res) => {
    const mime = req.file && imageType(req.file.buffer);
    if (!mime) return res.status(400).json({ success: false, message: 'Choose a valid PNG, JPG or WebP image.' });
    const logoUrl = `data:${mime};base64,${req.file.buffer.toString('base64')}`;
    // The tenant is always taken from authenticated middleware, never request input.
    const client = await Client.findOneAndUpdate({ _id: req.client._id, status: 'Active' }, { $set: { logoUrl, profileUpdatedAt: new Date(), profileUpdatedBy: req.clientUser._id } }, { new: true, runValidators: true });
    if (!client) return res.status(403).json({ success: false, message: 'Client account is inactive.' });
    res.json({ success: true, data: { logoUrl }, message: 'Logo updated.' });
  });
  router.patch('/profile', async (req, res) => {
    const fields = { name: 120, contactName: 120, contactEmail: 254, phone: 30, whatsapp: 30, address: 500 };
    const update = {};
    for (const [key, max] of Object.entries(fields)) {
      if (req.body?.[key] === undefined) continue;
      if (typeof req.body[key] !== 'string' || req.body[key].trim().length > max) return res.status(400).json({ success: false, message: `Please enter a valid ${key}.` });
      update[key] = req.body[key].trim();
    }
    if ('name' in update && !update.name) return res.status(400).json({ success: false, message: 'Client name is required.' });
    if (update.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(update.contactEmail)) return res.status(400).json({ success: false, message: 'Enter a valid contact email.' });
    for (const key of ['phone', 'whatsapp']) if (update[key] && !/^[+\d\s().-]{6,30}$/.test(update[key])) return res.status(400).json({ success: false, message: 'Enter a valid phone or WhatsApp number.' });
    update.profileUpdatedAt = new Date(); update.profileUpdatedBy = req.clientUser._id;
    const client = await Client.findOneAndUpdate({ _id: req.client._id, status: 'Active' }, { $set: update }, { new: true, runValidators: true });
    if (!client) return res.status(403).json({ success: false, message: 'Client account is inactive.' });
    res.json({ success: true, data: Object.fromEntries([...Object.keys(fields), 'logoUrl', 'profileUpdatedAt'].map((key) => [key, client[key]])), message: 'Profile updated.' });
  });
  return router;
};
module.exports = { createClientBrandingRouter, imageType };
