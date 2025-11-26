const db = require('../../database/connection');

const CLIENT_FIELDS = `
  id,
  user_id,
  company_name,
  contact_name,
  email,
  phone,
  currency,
  address,
  notes,
  created_at,
  updated_at
`;

function mapClient(row) {
  if (!row) return null;

  return {
    id: row.id,
    ownerId: row.user_id,
    companyName: row.company_name,
    contactName: row.contact_name,
    email: row.email,
    phone: row.phone,
    currency: row.currency,
    address: row.address,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

async function listByUser(userId) {
  const result = await db.query(
    `SELECT ${CLIENT_FIELDS} FROM clients WHERE user_id = $1 ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows.map(mapClient);
}

async function createClient(userId, payload) {
  const result = await db.query(
    `
    INSERT INTO clients (
      user_id, company_name, contact_name, email, phone, currency, address, notes
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING ${CLIENT_FIELDS}
    `,
    [
      userId,
      payload.companyName,
      payload.contactName || '',
      payload.email || '',
      payload.phone || '',
      payload.currency || 'USD',
      payload.address || '',
      payload.notes || ''
    ]
  );

  return mapClient(result.rows[0]);
}

async function findById(id) {
  const result = await db.query(
    `SELECT ${CLIENT_FIELDS} FROM clients WHERE id = $1 LIMIT 1`,
    [id]
  );

  return mapClient(result.rows[0]);
}

async function updateClient(id, payload) {
  const fields = [];
  const values = [];
  let idx = 1;

  const mapping = {
    companyName: 'company_name',
    contactName: 'contact_name',
    email: 'email',
    phone: 'phone',
    currency: 'currency',
    address: 'address',
    notes: 'notes'
  };

  for (const [key, column] of Object.entries(mapping)) {
    if (payload[key] !== undefined) {
      fields.push(`${column} = $${idx++}`);
      values.push(payload[key]);
    }
  }

  if (!fields.length) {
    return findById(id);
  }

  fields.push(`updated_at = NOW()`);
  values.push(id);

  const result = await db.query(
    `
    UPDATE clients
    SET ${fields.join(', ')}
    WHERE id = $${idx}
    RETURNING ${CLIENT_FIELDS}
    `,
    values
  );

  return mapClient(result.rows[0]);
}

async function deleteClient(id) {
  await db.query(`DELETE FROM clients WHERE id = $1`, [id]);
}

module.exports = {
  listByUser,
  createClient,
  findById,
  updateClient,
  deleteClient,
  mapClient
};
