const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const config = require('../config/environment');
const {
  addUser,
  findUserByEmail,
  findUserById,
  storeRefreshToken,
  findRefreshToken,
  deleteRefreshToken
} = require('../store/inMemoryDb');
const { generateTokens, verifyRefreshToken, hashToken } = require('../utils/token');
const { toUserResponse } = require('../utils/transformers');
const HttpError = require('../utils/httpError');

async function registerUser({ email, password, firstName, lastName }) {
  if (!email || !password) {
    throw new HttpError(400, 'Email and password are required');
  }

  const existing = findUserByEmail(email);

  if (existing) {
    throw new HttpError(409, 'Email already in use');
  }

  const passwordHash = await bcrypt.hash(password, config.bcryptRounds);

  const user = addUser({
    id: crypto.randomUUID ? crypto.randomUUID() : uuidv4(),
    email,
    passwordHash,
    firstName: firstName || '',
    lastName: lastName || '',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  return issueTokens(user);
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    throw new HttpError(400, 'Email and password are required');
  }

  const user = findUserByEmail(email);

  if (!user) {
    throw new HttpError(401, 'Invalid credentials');
  }

  const matches = await bcrypt.compare(password, user.passwordHash);

  if (!matches) {
    throw new HttpError(401, 'Invalid credentials');
  }

  return issueTokens(user);
}

function issueTokens(user) {
  const { accessToken, refreshToken, tokenId, refreshExpiresAt } = generateTokens(user);

  storeRefreshToken(hashToken(refreshToken), {
    userId: user.id,
    tokenId,
    expiresAt: refreshExpiresAt
  });

  return {
    user: toUserResponse(user),
    tokens: {
      accessToken,
      refreshToken,
      expiresIn: config.jwt.accessTtl,
      refreshExpiresAt
    }
  };
}

function refreshSession(refreshToken) {
  if (!refreshToken) {
    throw new HttpError(400, 'Refresh token is required');
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const hash = hashToken(refreshToken);
    const stored = findRefreshToken(hash);

    if (!stored || stored.userId !== payload.sub || stored.tokenId !== payload.tokenId) {
      throw new HttpError(401, 'Invalid refresh token');
    }

    const user = findUserById(payload.sub);

    if (!user) {
      deleteRefreshToken(hash);
      throw new HttpError(401, 'User no longer exists');
    }

    deleteRefreshToken(hash);

    return issueTokens(user);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError(401, 'Invalid refresh token');
  }
}

function logoutSession(refreshToken) {
  if (refreshToken) {
    deleteRefreshToken(hashToken(refreshToken));
  }
}

module.exports = {
  registerUser,
  loginUser,
  refreshSession,
  logoutSession
};
