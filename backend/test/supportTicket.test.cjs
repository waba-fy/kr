const test=require('node:test');const assert=require('node:assert/strict');const express=require('express');
const {createTicketRouter}=require('../routes/supportTicketRoutes');
test('Client tickets are scoped to the authenticated tenant and cannot set admin status',async()=>{
 let saved=null,query=null,update=null;
 const Store={async countDocuments(){return 0;},async create(value){saved=value;return value;},async findOneAndUpdate(filter,value){query=filter;update=value;return{_id:'a'.repeat(24),...value.$set};}};
 const app=express();app.use(express.json());app.use(createTicketRouter(false,Store,(req,_res,next)=>{req.client={_id:'own-client'};req.clientUser={_id:'own-user',name:'Client'};next();}));
 const server=app.listen(0,'127.0.0.1');await new Promise(resolve=>server.once('listening',resolve));const base=`http://127.0.0.1:${server.address().port}`;
 const call=(path,method,body)=>fetch(base+path,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
 try{
  assert.equal((await call('/','POST',{subject:'Help',category:'Additional service',description:'Please add a campaign',client:'other'})).status,201);assert.equal(saved.client,'own-client');assert.equal(saved.createdBy,'own-user');
  assert.equal((await call('/'+ 'a'.repeat(24),'PATCH',{status:'Closed'})).status,400);
  assert.equal((await call('/'+ 'a'.repeat(24),'PATCH',{reply:'More details',status:'Closed',client:'other'})).status,200);assert.equal(query.client,'own-client');assert.equal(update.$set.status,'Open');assert.equal(update.$push.messages.author,'client');
 }finally{await new Promise(resolve=>server.close(resolve));}
});
