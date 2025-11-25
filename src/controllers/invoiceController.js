const invoiceService = require('../services/invoiceService');

const createInvoice = (req, res, next) => {
  try {
    const invoice = invoiceService.createInvoice(req.body);
    res.status(201).json({ data: invoice });
  } catch (error) {
    next(error);
  }
};

const listInvoices = (req, res, next) => {
  try {
    const invoices = invoiceService.listInvoices();
    res.json({ data: invoices });
  } catch (error) {
    next(error);
  }
};

const getInvoice = (req, res, next) => {
  try {
    const invoice = invoiceService.getInvoiceById(req.params.id);
    if (!invoice) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'Invoice not found.',
      });
    }
    return res.json({ data: invoice });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createInvoice,
  listInvoices,
  getInvoice,
};
