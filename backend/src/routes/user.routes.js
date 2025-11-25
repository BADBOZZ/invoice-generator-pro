const express = require('express');

const { authenticate } = require('../middleware/auth');
const { findUserById, updateUser } = require('../store/inMemoryDb');
const { toUserResponse } = require('../utils/transformers');

const router = express.Router();

router.get('/me', authenticate, (req, res) => {
  const user = findUserById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({ user: toUserResponse(user) });
});

router.patch('/me', authenticate, (req, res) => {
  const allowedFields = ['firstName', 'lastName', 'companyName', 'timezone'];
  const updates = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  if (!Object.keys(updates).length) {
    return res.status(400).json({ message: 'No valid fields provided' });
  }

  const updatedUser = updateUser(req.user.id, updates);

  return res.json({ user: toUserResponse(updatedUser) });
});

module.exports = router;
