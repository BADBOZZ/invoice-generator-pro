const express = require('express');

const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');
const userService = require('../services/userService');
const { updateProfileSchema } = require('../validation/userSchemas');

const router = express.Router();

router.get('/me', authenticate, async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.id);
    return res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.patch('/me', authenticate, validate(updateProfileSchema), async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    return res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
