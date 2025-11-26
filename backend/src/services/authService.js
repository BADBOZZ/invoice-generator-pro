const bcrypt = require('bcrypt');
const crypto = require('crypto');

const config = require('../config/environment');
const userModel = require('../models/userModel');
const refreshTokenModel = require('../models/refreshTokenModel');
const { generateTokens, verifyRefreshToken, hashToken } = require('../utils/token');
const { toUserResponse } = require('../utils/transformers');
const HttpError = require('../utils/httpError');

async function registerUser({ email, password, firstName, lastName }) {
  if (!email || !password) {
    throw new HttpError(400, 'Email and password are required');
  }

  const existing = await userModel.findByEmail(email);

  if (existing) {
    throw new HttpError(409, 'Email already in use');
  }

  const passwordHash = await bcrypt.hash(password, config.bcryptRounds);

  const user = await userModel.createUser({
    email,
    passwordHash,
    firstName,
    lastName
  });

  return issueTokens(user);
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    throw new HttpError(400, 'Email and password are required');
  }

  const user = await userModel.findByEmail(email);

  if (!user) {
    throw new HttpError(401, 'Invalid credentials');
  }

  const matches = await bcrypt.compare(password, user.passwordHash);

  if (!matches) {
    throw new HttpError(401, 'Invalid credentials');
  }

  return issueTokens(user);
}

async function issueTokens(user) {
  const { accessToken, refreshToken, tokenId, refreshExpiresAt } = generateTokens(user);

  await refreshTokenModel.saveRefreshToken({
    userId: user.id,
    tokenHash: hashToken(refreshToken),
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

async function refreshSession(refreshToken) {
  if (!refreshToken) {
    throw new HttpError(400, 'Refresh token is required');
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const hash = hashToken(refreshToken);
    const stored = await refreshTokenModel.findByHash(hash);

    if (!stored || stored.userId !== payload.sub || stored.tokenId !== payload.tokenId) {
      throw new HttpError(401, 'Invalid refresh token');
    }

    const user = await userModel.findById(payload.sub);

    if (!user) {
      await refreshTokenModel.deleteByHash(hash);
      throw new HttpError(401, 'User no longer exists');
    }

    await refreshTokenModel.deleteByHash(hash);

    return issueTokens(user);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    throw new HttpError(401, 'Invalid refresh token');
  }
}

async function logoutSession(refreshToken) {
  if (refreshToken) {
    await refreshTokenModel.deleteByHash(hashToken(refreshToken));
  }
}

module.exports = {
  registerUser,
  loginUser,
  refreshSession,
  logoutSession
};
