const express = require('express');
const { v4: uuidv4 } = require('uuid');

const { authenticate } = require('../middleware/auth');
const {
  addInvoice,
  listInvoices,
  findInvoiceById,
  updateInvoice,
  deleteInvoice,
  findClientById
} = require('../store/inMemoryDb');
const { toInvoiceResponse } = require('../utils/transformers');

const router = express.Router();

const VALID_STATUSES = ['draft', 'sent', 'paid', 'void'];

function calculateTotals(lineItems = [], taxRate = 0) {
  const subtotal = lineItems.reduce((total, item) => {
    const qty = Number(item.quantity) || 0;
    const price = Number(item.unitPrice) || 0;
    return total + qty * price;
  }, 0);

  const tax = subtotal * (Number(taxRate) || 0);
  const total = subtotal + tax;

  return { subtotal, tax, total };
}

router.use(authenticate);

router.get('/', (req, res) => {
  const { status, clientId } = req.query;

  let invoices = listInvoices(req.user.id);

  if (status) {
    invoices = invoices.filter((invoice) => invoice.status === status);
  }

  if (clientId) {
    invoices = invoices.filter((invoice) => invoice.clientId === clientId);
  }

  res.json({ data: invoices.map(toInvoiceResponse) });
});

router.post('/', (req, res) => {
  const { clientId, lineItems = [], currency = 'USD', taxRate = 0, issueDate, dueDate, notes } = req.body;

  if (!clientId || !lineItems.length) {
    return res.status(400).json({ message: 'Client and at least one line item are required' });
  }

  const client = findClientById(clientId);

  if (!client || client.ownerId !== req.user.id) {
    return res.status(404).json({ message: 'Client not found' });
  }

  const mappedItems = lineItems.map((item) => ({
    id: uuidv4(),
    description: item.description,
    quantity: Number(item.quantity) || 0,
    unitPrice: Number(item.unitPrice) || 0
  }));

  const totals = calculateTotals(mappedItems, taxRate);

  const invoice = addInvoice({
    id: uuidv4(),
    ownerId: req.user.id,
    clientId,
    number: `INV-${Date.now()}`,
    status: 'draft',
    issueDate: issueDate || new Date().toISOString(),
    dueDate: dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    currency,
    lineItems: mappedItems,
    taxRate,
    subtotal: totals.subtotal,
    tax: totals.tax,
    total: totals.total,
    notes: notes || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  res.status(201).json({ data: toInvoiceResponse(invoice) });
});

router.get('/:invoiceId', (req, res) => {
  const invoice = findInvoiceById(req.params.invoiceId);

  if (!invoice || invoice.ownerId !== req.user.id) {
    return res.status(404).json({ message: 'Invoice not found' });
  }

  res.json({ data: toInvoiceResponse(invoice) });
});

router.put('/:invoiceId', (req, res) => {
  const invoice = findInvoiceById(req.params.invoiceId);

  if (!invoice || invoice.ownerId !== req.user.id) {
    return res.status(404).json({ message: 'Invoice not found' });
  }

  let lineItems = invoice.lineItems;

  if (Array.isArray(req.body.lineItems) && req.body.lineItems.length) {
    lineItems = req.body.lineItems.map((item) => ({
      id: item.id || uuidv4(),
      description: item.description,
      quantity: Number(item.quantity) || 0,
      unitPrice: Number(item.unitPrice) || 0
    }));
  }

  const updatedTotals = calculateTotals(lineItems, req.body.taxRate ?? invoice.taxRate);

  const updated = updateInvoice(invoice.id, {
    clientId: req.body.clientId ?? invoice.clientId,
    lineItems,
    taxRate: req.body.taxRate ?? invoice.taxRate,
    subtotal: updatedTotals.subtotal,
    tax: updatedTotals.tax,
    total: updatedTotals.total,
    status: req.body.status ?? invoice.status,
    issueDate: req.body.issueDate ?? invoice.issueDate,
    dueDate: req.body.dueDate ?? invoice.dueDate,
    currency: req.body.currency ?? invoice.currency,
    notes: req.body.notes ?? invoice.notes
  });

  res.json({ data: toInvoiceResponse(updated) });
});

router.patch('/:invoiceId/status', (req, res) => {
  const invoice = findInvoiceById(req.params.invoiceId);

  if (!invoice || invoice.ownerId !== req.user.id) {
    return res.status(404).json({ message: 'Invoice not found' });
  }

  const { status } = req.body;

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const updated = updateInvoice(invoice.id, { status });
  res.json({ data: toInvoiceResponse(updated) });
});

router.delete('/:invoiceId', (req, res) => {
  const invoice = findInvoiceById(req.params.invoiceId);

  if (!invoice || invoice.ownerId !== req.user.id) {
    return res.status(404).json({ message: 'Invoice not found' });
  }

  deleteInvoice(invoice.id);
  res.status(204).send();
});

module.exports = router;
