const express = require('express');
const bcrypt = require('bcrypt');
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

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const passwordHash = await bcrypt.hash(password, config.bcryptRounds);

    const user = addUser({
      id: uuidv4(),
      email,
      passwordHash,
      firstName: firstName || '',
      lastName: lastName || '',
      role: 'user',
      createdAt: new Date().toISOString()
    });

    const { accessToken, refreshToken, tokenId, refreshExpiresAt } = generateTokens(user);
    storeRefreshToken(hashToken(refreshToken), {
      userId: user.id,
      tokenId,
      expiresAt: refreshExpiresAt
    });

    return res.status(201).json({
      user: toUserResponse(user),
      tokens: {
        accessToken,
        refreshToken,
        expiresIn: config.jwt.accessTtl,
        refreshExpiresAt
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { accessToken, refreshToken, tokenId, refreshExpiresAt } = generateTokens(user);

    storeRefreshToken(hashToken(refreshToken), {
      userId: user.id,
      tokenId,
      expiresAt: refreshExpiresAt
    });

    return res.json({
      user: toUserResponse(user),
      tokens: {
        accessToken,
        refreshToken,
        expiresIn: config.jwt.accessTtl,
        refreshExpiresAt
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const hash = hashToken(refreshToken);
    const storedToken = findRefreshToken(hash);

    if (!storedToken || storedToken.userId !== payload.sub || storedToken.tokenId !== payload.tokenId) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const user = findUserById(payload.sub);

    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    deleteRefreshToken(hash);

    const { accessToken, refreshToken: newRefreshToken, tokenId, refreshExpiresAt } = generateTokens(user);

    storeRefreshToken(hashToken(newRefreshToken), {
      userId: user.id,
      tokenId,
      expiresAt: refreshExpiresAt
    });

    return res.json({
      tokens: {
        accessToken,
        refreshToken: newRefreshToken,
        expiresIn: config.jwt.accessTtl,
        refreshExpiresAt
      }
    });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
});

router.post('/logout', (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    deleteRefreshToken(hashToken(refreshToken));
  }

  return res.json({ message: 'Logged out successfully' });
});

module.exports = router;
