const express = require('express');
const Preference = require('../models/MarketingPreference');
const Lead = require('../models/ConsultationLead');
const Subscriber = require('../models/Subscriber');
const Template = require('../models/MarketingTemplate');
const EmailLog = require('../models/EmailLog');
const { authenticateAdmin } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/roleMiddleware');
const { renderMarketingTemplate } = require('../utils/marketingTemplate');
const { sendEmail } = require('../services/emailService');
const Image = require('../models/MarketingImage');
const router = express.Router();
router.use(express.urlencoded({ extended: false, limit: '2kb' }));
router.use((_req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
const page = (content) => `<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>KeyRoutes email preferences</title></head><body style="font-family:Arial,sans-serif;background:#f5f6f8;padding:40px"><main style="max-width:500px;margin:auto;background:white;padding:28px;border-radius:12px"><h1>Email preferences</h1>${content}</main></body></html>`;
router.get('/unsubscribe/:token', async (req, res) => {
  if (!/^[a-f0-9]{64}$/.test(req.params.token) || !await Preference.exists({ token: req.params.token })) return res.status(400).type('html').send(page('<p>This link is invalid.</p>'));
  res.type('html').send(page(`<p>Stop receiving KeyRoutes marketing emails. Account and service messages will still be delivered.</p><form method="post"><button style="padding:12px 18px;background:#e10600;color:white;border:0;border-radius:6px">Unsubscribe</button></form>`));
});
router.post('/unsubscribe/:token', async (req, res) => {
  if (!/^[a-f0-9]{64}$/.test(req.params.token)) return res.status(400).send('Invalid link.');
  const preference = await Preference.findOneAndUpdate({ token: req.params.token }, { $set: { unsubscribedAt: new Date() } }, { new: true });
  if (!preference) return res.status(400).send('Invalid link.');
  await Subscriber.updateOne({ email: preference.email }, { $set: { status: 'Unsubscribed', consentGiven: false, unsubscribedAt: preference.unsubscribedAt }, $setOnInsert: { source: 'Other' } }, { upsert: true });
  await Lead.updateMany({ email: preference.email }, { $set: { marketingOptOut: true, marketingUnsubscribedAt: preference.unsubscribedAt } });
  res.type('html').send(page('<p>You have been unsubscribed from marketing emails.</p><p>Your preference has been saved.</p>'));
});
router.get('/images/:token', async (req,res)=>{
  if(!/^[a-f0-9]{64}$/.test(req.params.token))return res.sendStatus(404);
  const image=await Image.findOne({token:req.params.token}).select('+content');
  if(!image)return res.sendStatus(404);
  res.set({'Content-Type':image.mime,'X-Content-Type-Options':'nosniff','Cache-Control':'public, max-age=86400'}).send(image.content);
});
router.use(authenticateAdmin);
const imageUpload=require('multer')({storage:require('multer').memoryStorage(),limits:{fileSize:2*1024*1024,files:1,fields:0}}).single('image');
router.post('/images',(req,res,next)=>imageUpload(req,res,error=>error?res.status(400).json({success:false,message:'Upload a PNG, JPG or WebP image up to 2 MB.'}):next()),async(req,res)=>{
  const mime=req.file&&require('./clientBrandingRoutes').imageType(req.file.buffer);
  if(!mime)return res.status(400).json({success:false,message:'Choose a valid PNG, JPG or WebP image.'});
  const token=require('crypto').randomBytes(32).toString('hex');
  await Image.create({token,mime,content:req.file.buffer,createdBy:req.admin._id});
  const base=String(process.env.BACKEND_PUBLIC_URL||'https://api.keyroutes.co').replace(/\/$/,'');
  res.status(201).json({success:true,data:{imageUrl:`${base}/api/marketing/images/${token}`}});
});
router.get('/analytics', async (_req, res) => {
  const match = { marketing: true, status: 'Sent' };
  const [sent, opened, clicked, recipients] = await Promise.all([
    EmailLog.countDocuments(match), EmailLog.countDocuments({ ...match, openedAt: { $ne: null } }), EmailLog.countDocuments({ ...match, clickedAt: { $ne: null } }),
    EmailLog.aggregate([{ $match: match }, { $group: { _id: '$to', sent: { $sum: 1 }, opened: { $sum: { $cond: [{ $ne: ['$openedAt', null] }, 1, 0] } }, clicked: { $sum: { $cond: [{ $ne: ['$clickedAt', null] }, 1, 0] } }, lastOpenedAt: { $max: '$lastOpenedAt' }, lastClickedAt: { $max: '$lastClickedAt' } } }, { $sort: { lastOpenedAt: -1 } }, { $limit: 500 }]),
  ]);
  res.json({ success: true, data: { sent, opened, clicked, recipients: recipients.map(row=>({ ...row, email: row._id })) } });
});
router.get('/templates', async (_req, res) => res.json({ success: true, data: await Template.find().sort({ updatedAt: -1 }).lean() }));
const validateTemplate = (body) => {
  const fields = { name: 120, subject: 200, headline: 200, body: 10000, buttonLabel: 60, buttonUrl: 1000, imageUrl: 1000 };
  const result = {};
  for (const [key, max] of Object.entries(fields)) { const value = body?.[key] ?? ''; if (typeof value !== 'string' || value.length > max) throw new Error(`Please enter a valid ${key}.`); result[key] = value.trim(); }
  if (!result.name || !result.subject || !result.headline || !result.body) throw new Error('Name, subject, headline and message are required.');
  if (/\r|\n/.test(result.subject)) throw new Error('Subject must be a single line.');
  if (Boolean(result.buttonLabel) !== Boolean(result.buttonUrl)) throw new Error('Provide both button label and URL.');
  if(result.imageUrl){let url;try{url=new URL(result.imageUrl);}catch(_error){throw new Error('Enter a valid image URL.');}if(url.protocol!=='https:')throw new Error('Image URL must use HTTPS.');}
  result.style = body.style === 'minimal' ? 'minimal' : 'classic'; renderMarketingTemplate(result); return result;
};
router.post('/templates', async (req, res) => {
  let data; try { data = validateTemplate(req.body); } catch (error) { return res.status(400).json({ success: false, message: error.message }); }
  res.status(201).json({ success: true, data: await Template.create({ ...data, createdBy: req.admin._id }) });
});
router.patch('/templates/:id', async (req, res) => {
  let data; try { data = validateTemplate(req.body); } catch (error) { return res.status(400).json({ success: false, message: error.message }); }
  const template = await Template.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  if (!template) return res.status(404).json({ success: false, message: 'Template not found.' });
  res.json({ success: true, data: template });
});
router.post('/preview', (req, res) => {
  try { res.json({ success: true, data: { html: renderMarketingTemplate(validateTemplate(req.body)).replace('</body>', '<div style="padding:20px;text-align:center;font:12px Arial;color:#777">No spam. You can unsubscribe at any time. <u>Unsubscribe from marketing emails</u></div></body>') } }); }
  catch (error) { res.status(400).json({ success: false, message: error.message }); }
});
router.get('/recipients', async (_req, res) => {
  const suppressed = await Preference.find({ unsubscribedAt: { $ne: null } }).select('email').lean();
  const blocked = await Subscriber.find({ status: { $ne: 'Active' } }).select('email').lean();
  const exclude = [...suppressed,...blocked].map(item=>item.email);
  const [subscribers,leads] = await Promise.all([
    Subscriber.find({ status: 'Active', consentGiven: true, email: { $nin: exclude } }).select('email name').limit(100).lean(),
    Lead.find({ marketingOptOut: { $ne: true }, email: { $nin: exclude } }).select('email name').limit(100).lean(),
  ]);
  res.json({ success: true, data: [...subscribers.map(item=>({...item,kind:'subscriber',key:`subscriber:${item._id}`})),...leads.map(item=>({...item,kind:'lead',key:`lead:${item._id}`}))] });
});
router.post('/templates/:id/send', async (req, res) => {
  if (!Array.isArray(req.body?.recipientKeys)) return res.status(400).json({ success: false, message: 'Select 1–25 recipients per batch.' });
  const keys = [...new Set(req.body.recipientKeys)];
  if (keys.length<1 || keys.length>25 || keys.some(key=>typeof key!=='string'||!/^(lead|subscriber):[a-f0-9]{24}$/i.test(key))) return res.status(400).json({ success: false, message: 'Select 1–25 recipients per batch.' });
  const template = await Template.findById(req.params.id);
  if (!template) return res.status(404).json({ success: false, message: 'Template not found.' });
  const [subscribers,leads] = await Promise.all([
    Subscriber.find({ _id: { $in: keys.filter(key=>key.startsWith('subscriber:')).map(key=>key.split(':')[1]) }, status: 'Active', consentGiven: true }),
    Lead.find({ _id: { $in: keys.filter(key=>key.startsWith('lead:')).map(key=>key.split(':')[1]) }, marketingOptOut: { $ne: true } }),
  ]);
  const recipients = [...subscribers,...leads], result = { sent:0,skipped:keys.length-recipients.length,failed:0 }, seen = new Set();
  for (const recipient of recipients) {
    const email = recipient.email.trim().toLowerCase();
    if (seen.has(email)) { result.skipped++; continue; } seen.add(email);
    try { await sendEmail({ to: email, subject: template.subject, html: renderMarketingTemplate(template), marketing: true }); result.sent++; }
    catch (error) { if (error.code==='MARKETING_SUPPRESSED') result.skipped++; else result.failed++; }
  }
  res.json({ success: true, data: result, message: `${result.sent} sent, ${result.skipped} skipped (opt-outs or duplicates), ${result.failed} failed.` });
});
router.get('/emails/:id/preview', requireRole('Super Admin'), async (req, res) => {
  const log = await EmailLog.findById(req.params.id).select('+html');
  if (!log?.html) return res.status(404).json({ success: false, message: 'No saved content for this older email.' });
  res.json({ success: true, data: { html: log.html } });
});
router.post('/emails/:id/resend', requireRole('Super Admin'), async (req, res) => {
  const log = await EmailLog.findById(req.params.id).select('+html +text');
  if (!log || !log.html || !log.canResend) return res.status(400).json({ success: false, message: 'This older email has no saved content. Create a new message from Marketing templates.' });
  try { await sendEmail({ to: log.to, subject: log.subject, html: log.html, text: log.text || '', marketing: log.marketing === true }); }
  catch (error) { return res.status(error.code === 'MARKETING_SUPPRESSED' ? 409 : 502).json({ success: false, message: error.code === 'MARKETING_SUPPRESSED' ? 'This recipient has opted out or is not eligible for marketing emails.' : 'Email could not be resent. Check SMTP settings.' }); }
  res.json({ success: true, message: 'Email sent again.' });
});
module.exports = router;
