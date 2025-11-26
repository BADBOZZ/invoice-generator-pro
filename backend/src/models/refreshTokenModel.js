const db = require('../../database/connection');

async function saveRefreshToken({ userId, tokenHash, tokenId, expiresAt }) {
  await db.query(
    `
    INSERT INTO refresh_tokens (user_id, token_hash, token_id, expires_at)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (token_hash) DO UPDATE
    SET user_id = EXCLUDED.user_id,
        token_id = EXCLUDED.token_id,
        expires_at = EXCLUDED.expires_at,
        created_at = NOW()
    `,
    [userId, tokenHash, tokenId, expiresAt]
  );
}

async function findByHash(tokenHash) {
  const result = await db.query(
    `
    SELECT id, user_id, token_hash, token_id, expires_at
    FROM refresh_tokens
    WHERE token_hash = $1
    LIMIT 1
    `,
    [tokenHash]
  );

  return result.rows[0] || null;
}

async function deleteByHash(tokenHash) {
  await db.query(`DELETE FROM refresh_tokens WHERE token_hash = $1`, [tokenHash]);
}

async function deleteByUser(userId) {
  await db.query(`DELETE FROM refresh_tokens WHERE user_id = $1`, [userId]);
}

module.exports = {
  saveRefreshToken,
  findByHash,
  deleteByHash,
  deleteByUser
};
