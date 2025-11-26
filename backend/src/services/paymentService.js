const paymentModel = require('../models/paymentModel');
const invoiceModel = require('../models/invoiceModel');
const { toPaymentResponse } = require('../utils/transformers');
const HttpError = require('../utils/httpError');

async function getPayments(userId, filters = {}) {
  const payments = await paymentModel.listByUser(userId, filters);
  return payments.map(toPaymentResponse);
}

async function recordPayment(userId, payload) {
  if (!payload.invoiceId || !payload.amount) {
    throw new HttpError(400, 'Invoice and amount are required');
  }

  const invoice = await invoiceModel.findById(payload.invoiceId);

  if (!invoice || invoice.ownerId !== userId) {
    throw new HttpError(404, 'Invoice not found');
  }

  const payment = await paymentModel.createPayment(userId, {
    invoiceId: payload.invoiceId,
    amount: Number(payload.amount),
    currency: payload.currency || invoice.currency || 'USD',
    method: payload.method || 'manual',
    reference: payload.reference || '',
    paidAt: payload.paidAt || new Date().toISOString()
  });

  if (payment.amount >= invoice.total) {
    await invoiceModel.updateInvoice(invoice.id, { status: 'paid' });
  }

  return toPaymentResponse(payment);
}

async function getPayment(userId, paymentId) {
  const payment = await paymentModel.findById(paymentId);

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
