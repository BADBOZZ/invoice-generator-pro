const express = require('express');
const { authenticate } = require('../middleware/auth');
const validate = require('../middleware/validate');
const invoiceService = require('../services/invoiceService');
const {
  createInvoiceSchema,
  updateInvoiceSchema,
  statusSchema
} = require('../validation/invoiceSchemas');

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

router.post('/', validate(createInvoiceSchema), async (req, res, next) => {
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

router.put('/:invoiceId', validate(updateInvoiceSchema), async (req, res, next) => {
  try {
    const invoice = await invoiceService.updateInvoice(req.user.id, req.params.invoiceId, req.body);
    res.json({ data: invoice });
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/:invoiceId/status',
  validate(statusSchema),
  async (req, res, next) => {
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
  }
);

router.delete('/:invoiceId', async (req, res, next) => {
  try {
    await invoiceService.removeInvoice(req.user.id, req.params.invoiceId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
