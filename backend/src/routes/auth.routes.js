const express = require('express');
const authService = require('../services/authService');
const validate = require('../middleware/validate');
const {
  registerSchema,
  loginSchema,
  refreshSchema,
  logoutSchema
} = require('../validation/authSchemas');

const router = express.Router();

router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/refresh', validate(refreshSchema), async (req, res, next) => {
  try {
    const result = await authService.refreshSession(req.body.refreshToken);
    return res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/logout', validate(logoutSchema), async (req, res, next) => {
  try {
    await authService.logoutSession(req.body.refreshToken);
    return res.json({ message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
