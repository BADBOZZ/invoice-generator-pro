const db = require('../../database/connection');

const PAYMENT_FIELDS = `
  id,
  user_id,
  invoice_id,
  amount,
  currency,
  method,
  reference,
  paid_at,
  created_at,
  updated_at
`;

function mapPayment(row) {
  if (!row) return null;

  return {
    id: row.id,
    ownerId: row.user_id,
    invoiceId: row.invoice_id,
    amount: Number(row.amount),
    currency: row.currency,
    method: row.method,
    reference: row.reference,
    paidAt: row.paid_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

async function listByUser(userId, filters = {}) {
  const clauses = ['user_id = $1'];
  const values = [userId];
  let idx = 2;

  if (filters.invoiceId) {
    clauses.push(`invoice_id = $${idx++}`);
    values.push(filters.invoiceId);
  }

  const result = await db.query(
    `SELECT ${PAYMENT_FIELDS} FROM payments WHERE ${clauses.join(' AND ')} ORDER BY paid_at DESC`,
    values
  );

  return result.rows.map(mapPayment);
}

async function createPayment(userId, payload) {
  const result = await db.query(
    `
    INSERT INTO payments (
      user_id, invoice_id, amount, currency, method, reference, paid_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING ${PAYMENT_FIELDS}
    `,
    [
      userId,
      payload.invoiceId,
      payload.amount,
      payload.currency || 'USD',
      payload.method || 'manual',
      payload.reference || '',
      payload.paidAt || new Date().toISOString()
    ]
  );

  return mapPayment(result.rows[0]);
}

async function findById(id) {
  const result = await db.query(
    `SELECT ${PAYMENT_FIELDS} FROM payments WHERE id = $1 LIMIT 1`,
    [id]
  );

  return mapPayment(result.rows[0]);
}

module.exports = {
  listByUser,
  createPayment,
  findById,
  mapPayment
};
