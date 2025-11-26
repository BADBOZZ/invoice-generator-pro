const db = require('../../database/connection');

const USER_FIELDS = `
  id,
  email,
  first_name,
  last_name,
  role,
  company_name,
  timezone,
  password_hash,
  created_at,
  updated_at
`;

function mapUser(row) {
  if (!row) return null;

  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    role: row.role || 'user',
    companyName: row.company_name,
    timezone: row.timezone,
    passwordHash: row.password_hash,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

async function createUser({ email, passwordHash, firstName, lastName, role = 'user' }) {
  const result = await db.query(
    `
    INSERT INTO users (email, password_hash, first_name, last_name, role)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING ${USER_FIELDS}
    `,
    [email, passwordHash, firstName || '', lastName || '', role]
  );

  return mapUser(result.rows[0]);
}

async function findByEmail(email) {
  const result = await db.query(
    `SELECT ${USER_FIELDS} FROM users WHERE email = $1 LIMIT 1`,
    [email.toLowerCase()]
  );

  return mapUser(result.rows[0]);
}

async function findById(id) {
  const result = await db.query(
    `SELECT ${USER_FIELDS} FROM users WHERE id = $1 LIMIT 1`,
    [id]
  );

  return mapUser(result.rows[0]);
}

async function updateUser(id, updates) {
  const fields = [];
  const values = [];
  let idx = 1;

  for (const [key, value] of Object.entries(updates)) {
    if (value === undefined) continue;

    switch (key) {
      case 'firstName':
        fields.push(`first_name = $${idx++}`);
        values.push(value);
        break;
      case 'lastName':
        fields.push(`last_name = $${idx++}`);
        values.push(value);
        break;
      case 'companyName':
        fields.push(`company_name = $${idx++}`);
        values.push(value);
        break;
      case 'timezone':
        fields.push(`timezone = $${idx++}`);
        values.push(value);
        break;
      default:
        break;
    }
  }

  if (!fields.length) {
    return findById(id);
  }

  fields.push(`updated_at = NOW()`);
  values.push(id);

  const result = await db.query(
    `
    UPDATE users
    SET ${fields.join(', ')}
    WHERE id = $${idx}
    RETURNING ${USER_FIELDS}
    `,
    values
  );

  return mapUser(result.rows[0]);
}

module.exports = {
  createUser,
  findByEmail,
  findById,
  updateUser
};
