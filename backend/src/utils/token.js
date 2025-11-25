const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const ms = require('ms');
const { v4: uuidv4 } = require('uuid');

const config = require('../config/environment');

function generateTokens(user) {
  const tokenId = uuidv4();

  const accessToken = jwt.sign(
    {
      sub: user.id,
      email: user.email,
      role: user.role || 'user'
    },
    config.jwt.accessSecret,
    { expiresIn: config.jwt.accessTtl }
  );

  const refreshToken = jwt.sign(
    {
      sub: user.id,
      tokenId
    },
    config.jwt.refreshSecret,
    { expiresIn: config.jwt.refreshTtl }
  );

  const refreshExpiresAt = new Date(Date.now() + ms(config.jwt.refreshTtl));

  return {
    accessToken,
    refreshToken,
    tokenId,
    refreshExpiresAt
  };
}

function verifyAccessToken(token) {
  return jwt.verify(token, config.jwt.accessSecret);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, config.jwt.refreshSecret);
}

function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

module.exports = {
  generateTokens,
  verifyAccessToken,
  verifyRefreshToken,
  hashToken
};
