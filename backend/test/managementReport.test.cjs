const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');

test('Management reports preview without saving and persist the generated snapshot with a default name', async () => {
  const authPath = require.resolve('../middleware/authMiddleware');
  require(authPath);
  const originalAuth = require.cache[authPath].exports;
  require.cache[authPath].exports = { authenticateAdmin(req, _res, next) { req.admin = { _id: 'admin', role: 'Super Admin' }; next(); } };
  const saved = [], audited = [];
  const originals = [];
  const replace = (model, key, value) => { originals.push([model,key,model[key]]); model[key] = value; };
  for (const name of ['ConsultationLead','Subscriber','CareerApplication','SupportReport']) replace(require('../models/'+name), 'aggregate', async () => [{_id:'New',count:2}]);
  for (const name of ['EmailLog','ContentEntry','Job']) replace(require('../models/'+name),'countDocuments',async()=>3);
  replace(require('../models/GeneratedReport'),'create',async row=>{ const value={_id:'report',...row}; saved.push(value); return value; });
  replace(require('../models/ActivityLog'),'create',async row=>{ audited.push(row); return row; });
  const app = express(); app.use(express.json()); app.use('/api/admin',require('../routes/adminRoutes'));
  const server = app.listen(0,'127.0.0.1'); await new Promise(resolve=>server.once('listening',resolve));
  const call = async body => { const response=await fetch(`http://127.0.0.1:${server.address().port}/api/admin/reports/generate`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}); return { status:response.status, body:await response.json() }; };
  try {
    const range={from:'2026-09-01',to:'2026-09-30'};
    const preview=await call(range); assert.equal(preview.status,200); assert.equal(preview.body.saved,null); assert.equal(saved.length,0); assert.equal(preview.body.data.totals.leads,2);
    const stored=await call({...range,save:true,name:'   '}); assert.equal(stored.status,201); assert.equal(saved.length,1); assert.equal(stored.body.saved.name,'Management Report 2026-09-01 to 2026-09-30'); assert.equal(saved[0].createdBy,'admin'); assert.deepEqual(stored.body.saved.snapshot,stored.body.data); assert.equal(audited.at(-1).action,'generate-and-save');
    assert.equal((await call({...range,save:true,name:'x'.repeat(201)})).status,400);
    assert.equal((await call({from:'2026-10-02',to:'2026-10-01',save:true})).status,400); assert.equal(saved.length,1);
  } finally { await new Promise(resolve=>server.close(resolve)); originals.forEach(([model,key,value])=>{model[key]=value;}); require.cache[authPath].exports=originalAuth; }
});
