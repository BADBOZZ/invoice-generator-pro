const express = require('express');
const { v4: uuidv4 } = require('uuid');

const { authenticate } = require('../middleware/auth');
const {
  addPayment,
  listPayments,
  findPaymentById,
  findInvoiceById,
  updateInvoice
} = require('../store/inMemoryDb');
const { toPaymentResponse } = require('../utils/transformers');

const router = express.Router();

router.use(authenticate);

router.get('/', (req, res) => {
  const { invoiceId } = req.query;

  let payments = listPayments(req.user.id);

  if (invoiceId) {
    payments = payments.filter((payment) => payment.invoiceId === invoiceId);
  }

  res.json({ data: payments.map(toPaymentResponse) });
});

router.post('/', (req, res) => {
  const { invoiceId, amount, method = 'manual', reference, currency = 'USD', paidAt } = req.body;

  if (!invoiceId || !amount) {
    return res.status(400).json({ message: 'Invoice and amount are required' });
  }

  const invoice = findInvoiceById(invoiceId);

  if (!invoice || invoice.ownerId !== req.user.id) {
    return res.status(404).json({ message: 'Invoice not found' });
  }

  const payment = addPayment({
    id: uuidv4(),
    ownerId: req.user.id,
    invoiceId,
    amount: Number(amount),
    currency,
    method,
    reference: reference || '',
    paidAt: paidAt || new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  if (payment.amount >= invoice.total) {
    updateInvoice(invoice.id, { status: 'paid' });
  }

  res.status(201).json({ data: toPaymentResponse(payment) });
});

router.get('/:paymentId', (req, res) => {
  const payment = findPaymentById(req.params.paymentId);

  if (!payment || payment.ownerId !== req.user.id) {
    return res.status(404).json({ message: 'Payment not found' });
  }

  res.json({ data: toPaymentResponse(payment) });
});

module.exports = router;
