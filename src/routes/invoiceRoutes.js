const crypto = require('crypto');
const express = require('express');

const { validateBody, validateParams } = require('../middleware/validation');
const {
  invoiceCreateSchema,
  invoiceIdSchema,
} = require('../validators/invoiceSchemas');

const router = express.Router();
const invoices = new Map();

const toCurrency = (value) => Number.parseFloat(value.toFixed(2));

const calculateTotals = (items) =>
  items.reduce((acc, item) => {
    const base = item.unitPrice * item.quantity;
    const taxMultiplier = item.taxRate ? 1 + item.taxRate / 100 : 1;
    return acc + base * taxMultiplier;
  }, 0);

router.post('/', validateBody(invoiceCreateSchema), (req, res) => {
  const invoice = {
    id: crypto.randomUUID(),
    ...req.validatedBody,
    status: 'draft',
    totalAmount: toCurrency(calculateTotals(req.validatedBody.items)),
    createdAt: new Date().toISOString(),
  };

  invoices.set(invoice.id, invoice);

  return res.status(201).json({ invoice });
});

router.get('/:id', validateParams(invoiceIdSchema), (req, res, next) => {
  const { id } = req.validatedParams;
  const invoice = invoices.get(id);

  if (!invoice) {
    const error = new Error('Invoice not found.');
    error.statusCode = 404;
    return next(error);
  }

  return res.status(200).json({ invoice });
});

module.exports = router;
