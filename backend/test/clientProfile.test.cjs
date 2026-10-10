const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const { createClientBrandingRouter } = require('../routes/clientBrandingRoutes');

test('Client profile and logo are validated and scoped to the authenticated client', async () => {
  const updates = [];
  const app = express(); app.use(express.json());
  app.use((req, res, next) => { if (req.headers.authorization !== 'Bearer test') return res.sendStatus(401); req.client = { _id: 'own-client' }; req.clientUser = { _id: 'own-user' }; next(); });
  app.use('/branding', createClientBrandingRouter({ async findOneAndUpdate(query, update) { updates.push({ query, update }); return { ...update.$set }; } }));
  const server = app.listen(0, '127.0.0.1'); await new Promise(resolve => server.once('listening', resolve));
  const base = `http://127.0.0.1:${server.address().port}/branding`;
  const patch = (body, authorized = true) => fetch(`${base}/profile`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...(authorized ? { Authorization: 'Bearer test' } : {}) }, body: JSON.stringify(body) });
  const upload = (buffer, type) => { const body = new FormData(); body.append('logo', new Blob([buffer], { type }), 'logo.png'); return fetch(`${base}/logo`, { method: 'POST', headers: { Authorization: 'Bearer test' }, body }); };
  try {
    assert.equal((await patch({ name: 'New name' }, false)).status, 401);
    assert.equal((await patch({ name: '', contactEmail: 'invalid' })).status, 400);
    assert.equal((await patch({ contactEmail: 'invalid' })).status, 400);
    assert.equal((await patch({ phone: 'javascript:alert(1)' })).status, 400);
    const response = await patch({ name: ' Updated Company ', contactName: ' Contact ', contactEmail: 'contact@example.com', phone: '+91 9876543210', whatsapp: '9876543210', address: 'Office', client: 'other-client', status: 'Inactive', domain: 'attacker.com', logoUrl: 'javascript:alert(1)' });
    assert.equal(response.status, 200);
    assert.equal(updates[0].query._id, 'own-client');
    assert.equal(updates[0].update.$set.name, 'Updated Company');
    for (const key of ['client', 'status', 'domain', 'logoUrl']) assert.equal(updates[0].update.$set[key], undefined);
    assert.equal(updates[0].update.$set.profileUpdatedBy, 'own-user');
    assert.equal((await upload('<svg><script>alert(1)</script></svg>', 'image/png')).status, 400);
    assert.equal((await upload(Buffer.alloc(2 * 1024 * 1024 + 1), 'image/png')).status, 400);
    const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a8ZkAAAAASUVORK5CYII=', 'base64');
    const logo = await upload(png, 'image/png'); assert.equal(logo.status, 200);
    assert.equal((await logo.json()).data.logoUrl, `data:image/png;base64,${png.toString('base64')}`);
    assert.equal(updates.at(-1).query._id, 'own-client');
  } finally { await new Promise(resolve => server.close(resolve)); }
});
