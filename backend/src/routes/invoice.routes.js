const express = require('express');
const { authenticate } = require('../middleware/auth');
const invoiceService = require('../services/invoiceService');

const router = express.Router();

router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const invoices = await invoiceService.listUserInvoices(req.user.id, req.query);
    res.json({ data: invoices });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const invoice = await invoiceService.createInvoice(req.user.id, req.body);
    res.status(201).json({ data: invoice });
  } catch (error) {
    next(error);
  }
});

router.get('/:invoiceId', async (req, res, next) => {
  try {
    const invoice = await invoiceService.getInvoice(req.user.id, req.params.invoiceId);
    res.json({ data: invoice });
  } catch (error) {
    next(error);
  }
});

router.put('/:invoiceId', async (req, res, next) => {
  try {
    const invoice = await invoiceService.updateInvoice(req.user.id, req.params.invoiceId, req.body);
    res.json({ data: invoice });
  } catch (error) {
    next(error);
  }
});

router.patch('/:invoiceId/status', async (req, res, next) => {
  try {
    const invoice = await invoiceService.updateInvoiceStatus(
      req.user.id,
      req.params.invoiceId,
      req.body.status
    );
    res.json({ data: invoice });
  } catch (error) {
    next(error);
  }
});

router.delete('/:invoiceId', async (req, res, next) => {
  try {
    await invoiceService.removeInvoice(req.user.id, req.params.invoiceId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
