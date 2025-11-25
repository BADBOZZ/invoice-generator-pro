const {
  listClients,
  addClient,
  findClientById,
  updateClient,
  deleteClient
} = require('../store/inMemoryDb');
const { toClientResponse } = require('../utils/transformers');
const HttpError = require('../utils/httpError');
const { v4: uuidv4 } = require('uuid');

function getClients(userId) {
  return listClients(userId).map(toClientResponse);
}

function createClient(userId, payload) {
  if (!payload.companyName) {
    throw new HttpError(400, 'Company name is required');
  }

  const client = addClient({
    id: uuidv4(),
    ownerId: userId,
    companyName: payload.companyName,
    contactName: payload.contactName || '',
    email: payload.email || '',
    phone: payload.phone || '',
    currency: payload.currency || 'USD',
    address: payload.address || '',
    notes: payload.notes || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  return toClientResponse(client);
}

function getClient(userId, clientId) {
  const client = findClientById(clientId);

  if (!client || client.ownerId !== userId) {
    throw new HttpError(404, 'Client not found');
  }

  return toClientResponse(client);
}

function updateClientRecord(userId, clientId, payload) {
  const client = findClientById(clientId);

  if (!client || client.ownerId !== userId) {
    throw new HttpError(404, 'Client not found');
  }

  const updated = updateClient(client.id, {
    companyName: payload.companyName ?? client.companyName,
    contactName: payload.contactName ?? client.contactName,
    email: payload.email ?? client.email,
    phone: payload.phone ?? client.phone,
    currency: payload.currency ?? client.currency,
    address: payload.address ?? client.address,
    notes: payload.notes ?? client.notes
  });

  return toClientResponse(updated);
}

function removeClient(userId, clientId) {
  const client = findClientById(clientId);

  if (!client || client.ownerId !== userId) {
    throw new HttpError(404, 'Client not found');
  }

  deleteClient(client.id);
}

module.exports = {
  getClients,
  createClient,
  getClient,
  updateClient: updateClientRecord,
  removeClient
};
