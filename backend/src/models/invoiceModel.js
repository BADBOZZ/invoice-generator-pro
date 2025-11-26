const db = require('../../database/connection');

const INVOICE_FIELDS = `
  id,
  user_id,
  client_id,
  number,
  status,
  issue_date,
  due_date,
  currency,
  line_items,
  tax_rate,
  subtotal,
  tax,
  total,
  notes,
  created_at,
  updated_at
`;

function mapInvoice(row) {
  if (!row) return null;

  return {
    id: row.id,
    ownerId: row.user_id,
    clientId: row.client_id,
    number: row.number,
    status: row.status,
    issueDate: row.issue_date,
    dueDate: row.due_date,
    currency: row.currency,
    lineItems: row.line_items || [],
    taxRate: Number(row.tax_rate),
    subtotal: Number(row.subtotal),
    tax: Number(row.tax),
    total: Number(row.total),
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

async function listByUser(userId, filters = {}) {
  const clauses = ['user_id = $1'];
  const values = [userId];
  let idx = 2;

  if (filters.status) {
    clauses.push(`status = $${idx++}`);
    values.push(filters.status);
  }

  if (filters.clientId) {
    clauses.push(`client_id = $${idx++}`);
    values.push(filters.clientId);
  }

  const result = await db.query(
    `SELECT ${INVOICE_FIELDS} FROM invoices WHERE ${clauses.join(' AND ')} ORDER BY issue_date DESC`,
    values
  );

  return result.rows.map(mapInvoice);
}

async function createInvoice(userId, payload) {
  const result = await db.query(
    `
    INSERT INTO invoices (
      user_id, client_id, number, status, issue_date, due_date, currency,
      line_items, tax_rate, subtotal, tax, total, notes
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9, $10, $11, $12, $13
    )
    RETURNING ${INVOICE_FIELDS}
    `,
    [
      userId,
      payload.clientId,
      payload.number,
      payload.status || 'draft',
      payload.issueDate,
      payload.dueDate,
      payload.currency || 'USD',
      JSON.stringify(payload.lineItems || []),
      payload.taxRate,
      payload.subtotal,
      payload.tax,
      payload.total,
      payload.notes || ''
    ]
  );

  return mapInvoice(result.rows[0]);
}

async function findById(id) {
  const result = await db.query(
    `SELECT ${INVOICE_FIELDS} FROM invoices WHERE id = $1 LIMIT 1`,
    [id]
  );

  return mapInvoice(result.rows[0]);
}

async function updateInvoice(id, payload) {
  const fields = [];
  const values = [];
  let idx = 1;

  const mapping = {
    clientId: 'client_id',
    number: 'number',
    status: 'status',
    issueDate: 'issue_date',
    dueDate: 'due_date',
    currency: 'currency',
    taxRate: 'tax_rate',
    subtotal: 'subtotal',
    tax: 'tax',
    total: 'total',
    notes: 'notes'
  };

  for (const [key, column] of Object.entries(mapping)) {
    if (payload[key] !== undefined) {
      fields.push(`${column} = $${idx++}`);
      values.push(payload[key]);
    }
  }

  if (payload.lineItems) {
    fields.push(`line_items = $${idx++}::jsonb`);
    values.push(JSON.stringify(payload.lineItems));
  }

  if (!fields.length) {
    return findById(id);
  }

  fields.push(`updated_at = NOW()`);
  values.push(id);

  const result = await db.query(
    `
    UPDATE invoices
    SET ${fields.join(', ')}
    WHERE id = $${idx}
    RETURNING ${INVOICE_FIELDS}
    `,
    values
  );

  return mapInvoice(result.rows[0]);
}

async function deleteInvoice(id) {
  await db.query(`DELETE FROM invoices WHERE id = $1`, [id]);
}

module.exports = {
  listByUser,
  createInvoice,
  findById,
  updateInvoice,
  deleteInvoice,
  mapInvoice
};
