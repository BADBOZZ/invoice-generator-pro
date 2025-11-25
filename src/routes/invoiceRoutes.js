const express = require('express');
const authGuard = require('../middleware/auth');
const { createInvoiceValidator, invoiceIdValidator } = require('../validators/invoiceValidators');
const invoiceController = require('../controllers/invoiceController');

const router = express.Router();

router.use(authGuard);

router.get('/', invoiceController.listInvoices);
router.get('/:id', invoiceIdValidator, invoiceController.getInvoice);
router.post('/', createInvoiceValidator, invoiceController.createInvoice);

module.exports = router;
