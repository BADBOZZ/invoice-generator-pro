const express = require('express');
const { authenticate } = require('../middleware/auth');
const paymentService = require('../services/paymentService');

const router = express.Router();

router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const payments = await paymentService.getPayments(req.user.id, req.query);
    res.json({ data: payments });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const payment = await paymentService.recordPayment(req.user.id, req.body);
    res.status(201).json({ data: payment });
  } catch (error) {
    next(error);
  }
});

router.get('/:paymentId', async (req, res, next) => {
  try {
    const payment = await paymentService.getPayment(req.user.id, req.params.paymentId);
    res.json({ data: payment });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
