const express = require('express');

const { authenticate } = require('../middleware/auth');
const userService = require('../services/userService');

const router = express.Router();

router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.id);
    return res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.patch('/me', authenticate, async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    return res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
