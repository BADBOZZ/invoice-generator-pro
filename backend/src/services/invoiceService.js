const { v4: uuidv4 } = require('uuid');

const {
  listInvoices,
  addInvoice,
  findInvoiceById,
  updateInvoice,
  deleteInvoice,
  findClientById
} = require('../store/inMemoryDb');
const { toInvoiceResponse } = require('../utils/transformers');
const HttpError = require('../utils/httpError');

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

function listUserInvoices(userId, filters = {}) {
  let invoices = listInvoices(userId);

  if (filters.status) {
    invoices = invoices.filter((invoice) => invoice.status === filters.status);
  }

  if (filters.clientId) {
    invoices = invoices.filter((invoice) => invoice.clientId === filters.clientId);
  }

  return invoices.map(toInvoiceResponse);
}

function createInvoiceRecord(userId, payload) {
  if (!payload.clientId || !Array.isArray(payload.lineItems) || !payload.lineItems.length) {
    throw new HttpError(400, 'Client and at least one line item are required');
  }

  const client = findClientById(payload.clientId);

  if (!client || client.ownerId !== userId) {
    throw new HttpError(404, 'Client not found');
  }

  const lineItems = payload.lineItems.map((item) => ({
    id: item.id || uuidv4(),
    description: item.description,
    quantity: Number(item.quantity) || 0,
    unitPrice: Number(item.unitPrice) || 0
  }));

  const totals = calculateTotals(lineItems, payload.taxRate ?? 0);

  const invoice = addInvoice({
    id: uuidv4(),
    ownerId: userId,
    clientId: payload.clientId,
    number: payload.number || `INV-${Date.now()}`,
    status: payload.status || 'draft',
    issueDate: payload.issueDate || new Date().toISOString(),
    dueDate: payload.dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    currency: payload.currency || 'USD',
    lineItems,
    taxRate: payload.taxRate || 0,
    subtotal: totals.subtotal,
    tax: totals.tax,
    total: totals.total,
    notes: payload.notes || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  return toInvoiceResponse(invoice);
}

function getInvoiceRecord(userId, invoiceId) {
  const invoice = findInvoiceById(invoiceId);

  if (!invoice || invoice.ownerId !== userId) {
    throw new HttpError(404, 'Invoice not found');
  }

  return toInvoiceResponse(invoice);
}

function updateInvoiceRecord(userId, invoiceId, payload) {
  const invoice = findInvoiceById(invoiceId);

  if (!invoice || invoice.ownerId !== userId) {
    throw new HttpError(404, 'Invoice not found');
  }

  let lineItems = invoice.lineItems;

  if (Array.isArray(payload.lineItems) && payload.lineItems.length) {
    lineItems = payload.lineItems.map((item) => ({
      id: item.id || uuidv4(),
      description: item.description,
      quantity: Number(item.quantity) || 0,
      unitPrice: Number(item.unitPrice) || 0
    }));
  }

  const totals = calculateTotals(lineItems, payload.taxRate ?? invoice.taxRate);

  const updated = updateInvoice(invoice.id, {
    clientId: payload.clientId ?? invoice.clientId,
    lineItems,
    taxRate: payload.taxRate ?? invoice.taxRate,
    subtotal: totals.subtotal,
    tax: totals.tax,
    total: totals.total,
    status: payload.status ?? invoice.status,
    issueDate: payload.issueDate ?? invoice.issueDate,
    dueDate: payload.dueDate ?? invoice.dueDate,
    currency: payload.currency ?? invoice.currency,
    notes: payload.notes ?? invoice.notes
  });

  return toInvoiceResponse(updated);
}

function updateInvoiceStatus(userId, invoiceId, status) {
  if (!VALID_STATUSES.includes(status)) {
    throw new HttpError(400, 'Invalid status');
  }

  const invoice = findInvoiceById(invoiceId);

  if (!invoice || invoice.ownerId !== userId) {
    throw new HttpError(404, 'Invoice not found');
  }

  const updated = updateInvoice(invoice.id, { status });
  return toInvoiceResponse(updated);
}

function removeInvoice(userId, invoiceId) {
  const invoice = findInvoiceById(invoiceId);

  if (!invoice || invoice.ownerId !== userId) {
    throw new HttpError(404, 'Invoice not found');
  }

  deleteInvoice(invoice.id);
}

module.exports = {
  listUserInvoices,
  createInvoice: createInvoiceRecord,
  getInvoice: getInvoiceRecord,
  updateInvoice: updateInvoiceRecord,
  updateInvoiceStatus,
  removeInvoice
};
