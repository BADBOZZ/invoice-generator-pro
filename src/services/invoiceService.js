const { randomUUID } = require('crypto');
const config = require('../config/env');

const invoices = new Map();

const calculateTotals = (items) => {
  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const tax = +(subtotal * config.taxRate).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  return {
    subtotal: +subtotal.toFixed(2),
    tax,
    total,
  };
};

const createInvoice = (payload) => {
  const id = randomUUID();
  const items = payload.items.map((item) => ({
    ...item,
    lineTotal: +(item.quantity * item.unitPrice).toFixed(2),
  }));

  const totals = calculateTotals(items);

  const invoice = {
    id,
    clientName: payload.clientName,
    clientEmail: payload.clientEmail,
    dueDate: payload.dueDate,
    currency: payload.currency,
    items,
    notes: payload.notes || '',
    subtotal: totals.subtotal,
    tax: totals.tax,
    total: totals.total,
    status: 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  invoices.set(id, invoice);
  return invoice;
};

const listInvoices = () => Array.from(invoices.values());

const getInvoiceById = (id) => invoices.get(id);

module.exports = {
  createInvoice,
  listInvoices,
  getInvoiceById,
};
