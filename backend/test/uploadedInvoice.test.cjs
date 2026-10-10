const test=require('node:test');const assert=require('node:assert/strict');const express=require('express');
const {createUploadedInvoiceRouter}=require('../routes/uploadedInvoiceRoutes');
test('Uploaded invoices reject invalid PDFs and restrict downloads to their client',async()=>{
 let query=null;
 const Store={findOne(filter){query=filter;return{select:async()=>null};}};
 const app=express();app.use((req,_res,next)=>{req.client={_id:'own-client'};next();});app.use(createUploadedInvoiceRouter(false,Store));
 const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));
 try{assert.equal((await fetch(`http://127.0.0.1:${server.address().port}/${'a'.repeat(24)}/download`)).status,404);assert.equal(query.client,'own-client');assert.equal(query._id,'a'.repeat(24));}finally{await new Promise(resolve=>server.close(resolve));}
});
