const test=require('node:test');const assert=require('node:assert/strict');const express=require('express');
test('Unsubscribe suppresses marketing/resends; service mail remains available and links are untracked',async()=>{
 const Preference=require('../models/MarketingPreference'),Subscriber=require('../models/Subscriber'),EmailLog=require('../models/EmailLog'),mail=require('../config/mail');
 require('../models/ConsultationLead').updateMany=async()=>({});
 let optedOut=false,status='Active',sent=0,lastMail=null,updates=0;
 Preference.findOne=async()=>({unsubscribedAt:optedOut?new Date():null});
 Preference.findOneAndUpdate=(_query,update)=>{if(update.$set){optedOut=true;return Promise.resolve({email:'test@example.com',unsubscribedAt:new Date()});}return{select:async()=>({token:'a'.repeat(64)})};};
 Preference.exists=async()=>true;
 Subscriber.findOne=async()=>({status,consentGiven:true});
 Subscriber.updateOne=async(_query,update)=>{status=update.$set.status;updates++;};
 EmailLog.create=async()=>({});EmailLog.findById=()=>({select:async()=>({to:'test@example.com',subject:'Saved',html:'<p>Saved</p>',marketing:true,canResend:true})});
 mail.getMailConfig=async()=>({fromName:'KeyRoutes',fromEmail:'hello@example.com'});mail.sendMail=async options=>{sent++;lastMail=options;return{messageId:'test',accepted:[options.to]};};
 const {sendEmail}=require('../services/emailService');
 await sendEmail({to:'test@example.com',subject:'Marketing',html:'<html><body><p>Message</p></body></html>',marketing:true});
 assert.equal(sent,1);assert.match(lastMail.html,/Unsubscribe from marketing emails/);assert.match(lastMail.headers['List-Unsubscribe'],/\/api\/marketing\/unsubscribe\/a/);assert.doesNotMatch(lastMail.html,/tracking\/click[^>]+unsubscribe/);
 const auth=require('../middleware/authMiddleware');auth.authenticateAdmin=(_req,_res,next)=>{_req.admin={role:'Super Admin'};next();};
 const app=express();app.use(express.json());app.use(require('../routes/marketingRoutes'));const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));const base=`http://127.0.0.1:${server.address().port}`;
 try{
  assert.equal((await fetch(`${base}/unsubscribe/${'a'.repeat(64)}`)).status,200);assert.equal(updates,0);
  assert.equal((await fetch(`${base}/unsubscribe/${'a'.repeat(64)}`,{method:'POST'})).status,200);assert.equal(status,'Unsubscribed');
  await assert.rejects(()=>sendEmail({to:'test@example.com',subject:'Marketing',html:'<p>Blocked</p>',marketing:true}),error=>error.code==='MARKETING_SUPPRESSED');assert.equal(sent,1);
  status='Active';await assert.rejects(()=>sendEmail({to:'test@example.com',subject:'Still blocked',html:'<p>Blocked</p>',marketing:true}));assert.equal(sent,1);
  assert.equal((await fetch(`${base}/emails/${'b'.repeat(24)}/resend`,{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'})).status,409);assert.equal(sent,1);
  await sendEmail({to:'test@example.com',subject:'Invoice',html:'<p>Your invoice</p>'});assert.equal(sent,2);
 }finally{await new Promise(resolve=>server.close(resolve));}
});
