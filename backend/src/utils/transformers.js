function toUserResponse(user) {
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role || 'user',
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

function toClientResponse(client) {
  if (!client) return null;

  return {
    id: client.id,
    companyName: client.companyName,
    contactName: client.contactName,
    email: client.email,
    phone: client.phone,
    currency: client.currency,
    address: client.address,
    notes: client.notes,
    createdAt: client.createdAt,
    updatedAt: client.updatedAt
  };
}

function toInvoiceResponse(invoice) {
  if (!invoice) return null;

  return {
    id: invoice.id,
    number: invoice.number,
    clientId: invoice.clientId,
    status: invoice.status,
    issueDate: invoice.issueDate,
    dueDate: invoice.dueDate,
    currency: invoice.currency,
    lineItems: invoice.lineItems || [],
    taxRate: invoice.taxRate,
    subtotal: invoice.subtotal,
    tax: invoice.tax,
    total: invoice.total,
    notes: invoice.notes,
    createdAt: invoice.createdAt,
    updatedAt: invoice.updatedAt
  };
}

function toPaymentResponse(payment) {
  if (!payment) return null;

  return {
    id: payment.id,
    invoiceId: payment.invoiceId,
    amount: payment.amount,
    currency: payment.currency,
    method: payment.method,
    reference: payment.reference,
    paidAt: payment.paidAt,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt
  };
}

module.exports = {
  toUserResponse,
  toClientResponse,
  toInvoiceResponse,
  toPaymentResponse
};
