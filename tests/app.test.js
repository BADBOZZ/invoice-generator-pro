process.env.SKIP_DOTENV = 'true';
process.env.NODE_ENV = 'test';
process.env.INVOICE_API_KEY = 'test-key';

const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../src/app');

test('health endpoint responds with ok status', async () => {
  const response = await request(app).get('/health');
  assert.equal(response.status, 200);
  assert.equal(response.body.status, 'ok');
});

test('invoice routes reject requests without API key', async () => {
  const response = await request(app).get('/api/invoices');
  assert.equal(response.status, 401);
  assert.match(response.body.message, /api key/i);
});

test('creating an invoice succeeds with valid payload and API key', async () => {
  const payload = {
    clientName: 'Jane Doe',
    clientEmail: 'jane@example.com',
    dueDate: new Date(Date.now() + 86_400_000).toISOString(),
    currency: 'USD',
    notes: '<script>alert(1)</script> deliver ASAP',
    items: [
      { description: 'Design work', quantity: 2, unitPrice: 150.5 },
      { description: 'Hosting', quantity: 1, unitPrice: 30 },
    ],
  };

  const response = await request(app).post('/api/invoices').set('x-api-key', 'test-key').send(payload);

  assert.equal(response.status, 201);
  assert.ok(response.body.data.id);
  assert.equal(response.body.data.notes, 'deliver ASAP');
  assert.equal(response.body.data.items.length, 2);
  assert.equal(response.body.data.currency, 'USD');
});

test('invalid payloads return validation errors', async () => {
  const payload = {
    clientName: 'A',
    clientEmail: 'invalid-email',
    dueDate: '2020-01-01',
    currency: 'USD',
    items: [],
  };

  const response = await request(app).post('/api/invoices').set('x-api-key', 'test-key').send(payload);
  assert.equal(response.status, 400);
});
