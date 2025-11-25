const users = [];
const clients = [];
const invoices = [];
const payments = [];
const refreshTokens = new Map();

function addUser(user) {
  users.push(user);
  return user;
}

function findUserByEmail(email) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

function findUserById(id) {
  return users.find((user) => user.id === id);
}

function updateUser(id, updates) {
  const user = findUserById(id);

  if (!user) {
    return null;
  }

  Object.assign(user, updates, { updatedAt: new Date().toISOString() });
  return user;
}

function addClient(client) {
  clients.push(client);
  return client;
}

function listClients(ownerId) {
  return clients.filter((client) => client.ownerId === ownerId);
}

function findClientById(id) {
  return clients.find((client) => client.id === id);
}

function updateClient(id, updates) {
  const client = findClientById(id);
  if (!client) {
    return null;
  }

  Object.assign(client, updates, { updatedAt: new Date().toISOString() });
  return client;
}

function deleteClient(id) {
  const index = clients.findIndex((client) => client.id === id);
  if (index === -1) {
    return null;
  }

  const [removed] = clients.splice(index, 1);
  return removed;
}

function addInvoice(invoice) {
  invoices.push(invoice);
  return invoice;
}

function listInvoices(ownerId) {
  return invoices.filter((invoice) => invoice.ownerId === ownerId);
}

function findInvoiceById(id) {
  return invoices.find((invoice) => invoice.id === id);
}

function updateInvoice(id, updates) {
  const invoice = findInvoiceById(id);
  if (!invoice) {
    return null;
  }

  Object.assign(invoice, updates, { updatedAt: new Date().toISOString() });
  return invoice;
}

function deleteInvoice(id) {
  const index = invoices.findIndex((invoice) => invoice.id === id);
  if (index === -1) {
    return null;
  }

  const [removed] = invoices.splice(index, 1);
  return removed;
}

function addPayment(payment) {
  payments.push(payment);
  return payment;
}

function listPayments(ownerId) {
  return payments.filter((payment) => payment.ownerId === ownerId);
}

function findPaymentById(id) {
  return payments.find((payment) => payment.id === id);
}

function storeRefreshToken(hash, payload) {
  refreshTokens.set(hash, payload);
}

function findRefreshToken(hash) {
  return refreshTokens.get(hash);
}

function deleteRefreshToken(hash) {
  refreshTokens.delete(hash);
}

function clearUserTokens(userId) {
  for (const [hash, payload] of refreshTokens.entries()) {
    if (payload.userId === userId) {
      refreshTokens.delete(hash);
    }
  }
}

module.exports = {
  addUser,
  findUserByEmail,
  findUserById,
  updateUser,
  addClient,
  listClients,
  findClientById,
  updateClient,
  deleteClient,
  addInvoice,
  listInvoices,
  findInvoiceById,
  updateInvoice,
  deleteInvoice,
  addPayment,
  listPayments,
  findPaymentById,
  storeRefreshToken,
  findRefreshToken,
  deleteRefreshToken,
  clearUserTokens
};
