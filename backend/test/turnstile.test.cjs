const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createTurnstileVerification } = require('../middleware/turnstile');
const response = () => ({ code: 200, status(code) { this.code = code; return this; }, json(body) { this.body = body; return this; } });
test('Turnstile rejects missing tokens, failed verification, wrong hostname/action and outages', async () => {
  for (const [token, result, expected] of [
    ['', {success:true}, 400],
    ['token', {success:false}, 400],
    ['token', {success:true,hostname:'attacker.example',action:'public_form'}, 400],
    ['token', {success:true,hostname:'keyroutes.co',action:'other'}, 400],
    ['token', null, 503],
    ['token', {success:true,hostname:'keyroutes.co',action:'public_form'}, 200],
  ]) {
    const middleware = createTurnstileVerification({enabled:true,secret:'test-secret',hostnames:['keyroutes.co'],fetchImpl:async () => {if (!result) throw new Error('unavailable'); return {ok:true,json:async()=>result};}});
    const res = response(); let next = false;
    await middleware({headers:{},body:{turnstileToken:token}},res,()=>{next=true;});
    assert.equal(res.code,expected); assert.equal(next,expected===200);
  }
});
test('Turnstile configuration fails closed when enabled and accepts multipart header tokens', async () => {
  const res=response();let next=false;
  await createTurnstileVerification({enabled:true,secret:'',hostnames:[]})({headers:{},body:{}},res,()=>{next=true;});
  assert.equal(res.code,503); assert.equal(next,false);
  await createTurnstileVerification({enabled:true,secret:'test',hostnames:['localhost'],fetchImpl:async()=>({ok:true,json:async()=>({success:true,hostname:'localhost',action:'public_form'})})})({headers:{'x-turnstile-token':'token'}},response(),()=>{next=true;});
  assert.equal(next,true);
});
