const { v4: uuidv4 } = require('uuid');

const invoiceModel = require('../models/invoiceModel');
const clientModel = require('../models/clientModel');
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

async function listUserInvoices(userId, filters = {}) {
  const invoices = await invoiceModel.listByUser(userId, filters);
  return invoices.map(toInvoiceResponse);
}

async function createInvoiceRecord(userId, payload) {
  if (!payload.clientId || !Array.isArray(payload.lineItems) || !payload.lineItems.length) {
    throw new HttpError(400, 'Client and at least one line item are required');
  }

  const client = await clientModel.findById(payload.clientId);

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

  const invoice = await invoiceModel.createInvoice(userId, {
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
    notes: payload.notes || ''
  });

  return toInvoiceResponse(invoice);
}

async function getInvoiceRecord(userId, invoiceId) {
  const invoice = await invoiceModel.findById(invoiceId);

  if (!invoice || invoice.ownerId !== userId) {
    throw new HttpError(404, 'Invoice not found');
  }

  return toInvoiceResponse(invoice);
}

async function updateInvoiceRecord(userId, invoiceId, payload) {
  const invoice = await invoiceModel.findById(invoiceId);

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

  const updated = await invoiceModel.updateInvoice(invoice.id, {
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
    notes: payload.notes ?? invoice.notes,
    number: payload.number ?? invoice.number
  });

  return toInvoiceResponse(updated);
}

async function updateInvoiceStatus(userId, invoiceId, status) {
  if (!VALID_STATUSES.includes(status)) {
    throw new HttpError(400, 'Invalid status');
  }

  const invoice = await invoiceModel.findById(invoiceId);

  if (!invoice || invoice.ownerId !== userId) {
    throw new HttpError(404, 'Invoice not found');
  }

  const updated = await invoiceModel.updateInvoice(invoice.id, { status });
  return toInvoiceResponse(updated);
}

async function removeInvoice(userId, invoiceId) {
  const invoice = await invoiceModel.findById(invoiceId);

  if (!invoice || invoice.ownerId !== userId) {
    throw new HttpError(404, 'Invoice not found');
  }

  await invoiceModel.deleteInvoice(invoice.id);
}

module.exports = {
  listUserInvoices,
  createInvoice: createInvoiceRecord,
  getInvoice: getInvoiceRecord,
  updateInvoice: updateInvoiceRecord,
  updateInvoiceStatus,
  removeInvoice
};
