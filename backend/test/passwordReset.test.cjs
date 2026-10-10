const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const bcrypt = require('bcryptjs');
const { createPasswordResetRouter } = require('../routes/passwordResetRoutes');

for (const scope of ['admin', 'client']) test(`${scope}: OTP recovery, expiry, limits, scope, replay and login bypass`, async () => {
  let challenge = null, emailCode = '', sends = 0, updates = 0, storedPassword = '';
  const counts = new Map();
  const account = { _id: 'account', client: 'client', isActive: true };
  const select = (value) => ({ select: async () => value });
  const Reset = {
    async findOneAndUpdate(query, update) {
      if (update.$set) {
        if (challenge && challenge.issuedAt > query.issuedAt.$lte) { const error = new Error(); error.code = 11000; throw error; }
        challenge = { _id: 'challenge', scope, email: query.email, ...update.$set }; return { ...challenge };
      }
      throw new Error('Use query wrapper');
    },
    async findOneAndDelete(query) {
      if (!challenge || challenge.digest !== query.digest || challenge.issuedAt !== query.issuedAt || challenge.attempts > 5 || challenge.expiresAt <= new Date()) return null;
      const value = challenge; challenge = null; return value;
    },
    async deleteOne() { challenge = null; },
  };
  const original = Reset.findOneAndUpdate;
  Reset.findOneAndUpdate = (query, update) => {
    if (update.$set) return original(query, update);
    if (!challenge || challenge.scope !== query.scope || challenge.email !== query.email || challenge.expiresAt <= new Date() || challenge.attempts >= 5) return select(null);
    challenge.attempts++; return select({ ...challenge });
  };
  const app = express(); app.use(express.json());
  app.use('/auth', createPasswordResetRouter(scope, {
    secret: 'test-only-key', Reset,
    Account: { async findOne({ email }) { return email === 'active@example.com' ? account : null; }, async updateOne(_query, update) { updates++; storedPassword = update.$set.password; } },
    Client: { async exists() { return true; } },
    Limit: { async findOneAndUpdate({ key }) { const count = (counts.get(key) || 0) + 1; counts.set(key, count); return { count }; } },
    mail: { async sendMail(options) { sends++; emailCode = options.text.match(/code is (\d{6})/)[1]; return { accepted: [options.to] }; } },
  }));
  app.post('/auth/login', (_req, res) => res.json({ login: true }));
  const server = app.listen(0, '127.0.0.1'); await new Promise(resolve => server.once('listening', resolve));
  const call = async (path, body) => { const response = await fetch(`http://127.0.0.1:${server.address().port}/auth/${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); return { status: response.status, body: await response.json() }; };
  try {
    assert.equal((await call('login', {})).body.login, true);
    assert.equal((await call('forgot-password', { email: 'invalid' })).status, 400);
    const unknown = await call('forgot-password', { email: 'unknown@example.com' });
    const known = await call('forgot-password', { email: 'ACTIVE@example.com' });
    assert.deepEqual(known, unknown); assert.equal(sends, 1);
    assert.notEqual(challenge.digest, emailCode); assert.equal(challenge.digest.length, 64);
    await call('forgot-password', { email: 'active@example.com' }); assert.equal(sends, 1);
    const reset = { email: 'active@example.com', otp: emailCode, password: 'NewStrong@2026' };
    assert.equal((await call('reset-password', { ...reset, password: 'weak' })).status, 400);
    assert.equal((await call('reset-password', { ...reset, otp: '000000' })).status, 400);
    assert.equal((await call('reset-password', reset)).status, 200); assert.equal(updates, 1);
    assert.equal(await bcrypt.compare(reset.password, storedPassword), true);
    assert.equal((await call('reset-password', reset)).status, 400); assert.equal(updates, 1);
    await call('forgot-password', { email: 'active@example.com' }); reset.otp = emailCode;
    challenge.expiresAt = new Date(0);
    assert.equal((await call('reset-password', reset)).status, 400);
    challenge.expiresAt = new Date(Date.now() + 600000); challenge.scope = scope === 'admin' ? 'client' : 'admin';
    assert.equal((await call('reset-password', reset)).status, 400); challenge.scope = scope;
    for (let i = 0; i < 5; i++) assert.equal((await call('reset-password', { ...reset, otp: '000000' })).status, 400);
    assert.equal((await call('reset-password', reset)).status, 400); assert.equal(updates, 1);
    for (let i = 0; i < 5; i++) await call('forgot-password', { email: 'active@example.com' });
    assert.equal((await call('forgot-password', { email: 'active@example.com' })).status, 429);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
