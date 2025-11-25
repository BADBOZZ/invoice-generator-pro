const express = require('express');
const { authenticate } = require('../middleware/auth');
const invoiceService = require('../services/invoiceService');

const router = express.Router();

router.use(authenticate);

router.get('/', (req, res, next) => {
  try {
    const invoices = invoiceService.listUserInvoices(req.user.id, req.query);
    res.json({ data: invoices });
  } catch (error) {
    next(error);
  }
});

router.post('/', (req, res, next) => {
  try {
    const invoice = invoiceService.createInvoice(req.user.id, req.body);
    res.status(201).json({ data: invoice });
  } catch (error) {
    next(error);
  }
});

router.get('/:invoiceId', (req, res, next) => {
  try {
    const invoice = invoiceService.getInvoice(req.user.id, req.params.invoiceId);
    res.json({ data: invoice });
  } catch (error) {
    next(error);
  }
});

router.put('/:invoiceId', (req, res, next) => {
  try {
    const invoice = invoiceService.updateInvoice(req.user.id, req.params.invoiceId, req.body);
    res.json({ data: invoice });
  } catch (error) {
    next(error);
  }
});

router.patch('/:invoiceId/status', (req, res, next) => {
  try {
    const invoice = invoiceService.updateInvoiceStatus(req.user.id, req.params.invoiceId, req.body.status);
    res.json({ data: invoice });
  } catch (error) {
    next(error);
  }
});

router.delete('/:invoiceId', (req, res, next) => {
  try {
    invoiceService.removeInvoice(req.user.id, req.params.invoiceId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
