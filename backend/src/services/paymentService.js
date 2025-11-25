const { v4: uuidv4 } = require('uuid');

const {
  listPayments,
  addPayment,
  findPaymentById,
  findInvoiceById,
  updateInvoice
} = require('../store/inMemoryDb');
const { toPaymentResponse } = require('../utils/transformers');
const HttpError = require('../utils/httpError');

function getPayments(userId, filters = {}) {
  let payments = listPayments(userId);

  if (filters.invoiceId) {
    payments = payments.filter((payment) => payment.invoiceId === filters.invoiceId);
  }

  return payments.map(toPaymentResponse);
}

function recordPayment(userId, payload) {
  if (!payload.invoiceId || !payload.amount) {
    throw new HttpError(400, 'Invoice and amount are required');
  }

  const invoice = findInvoiceById(payload.invoiceId);

  if (!invoice || invoice.ownerId !== userId) {
    throw new HttpError(404, 'Invoice not found');
  }

  const payment = addPayment({
    id: uuidv4(),
    ownerId: userId,
    invoiceId: payload.invoiceId,
    amount: Number(payload.amount),
    currency: payload.currency || invoice.currency || 'USD',
    method: payload.method || 'manual',
    reference: payload.reference || '',
    paidAt: payload.paidAt || new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  if (payment.amount >= invoice.total) {
    updateInvoice(invoice.id, { status: 'paid' });
  }

  return toPaymentResponse(payment);
}

function getPayment(userId, paymentId) {
  const payment = findPaymentById(paymentId);

  if (!payment || payment.ownerId !== userId) {
    throw new HttpError(404, 'Payment not found');
  }

  return toPaymentResponse(payment);
}

module.exports = {
  getPayments,
  recordPayment,
  getPayment
};
