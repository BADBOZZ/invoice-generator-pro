const clientModel = require('../models/clientModel');
const { toClientResponse } = require('../utils/transformers');
const HttpError = require('../utils/httpError');

async function getClients(userId) {
  const clients = await clientModel.listByUser(userId);
  return clients.map(toClientResponse);
}

async function createClient(userId, payload) {
  if (!payload.companyName) {
    throw new HttpError(400, 'Company name is required');
  }

  const client = await clientModel.createClient(userId, payload);
  return toClientResponse(client);
}

async function getClient(userId, clientId) {
  const client = await clientModel.findById(clientId);

  if (!client || client.ownerId !== userId) {
    throw new HttpError(404, 'Client not found');
  }

  return toClientResponse(client);
}

async function updateClientRecord(userId, clientId, payload) {
  const client = await clientModel.findById(clientId);

  if (!client || client.ownerId !== userId) {
    throw new HttpError(404, 'Client not found');
  }

  const updated = await clientModel.updateClient(client.id, payload);

  return toClientResponse(updated);
}

async function removeClient(userId, clientId) {
  const client = await clientModel.findById(clientId);

  if (!client || client.ownerId !== userId) {
    throw new HttpError(404, 'Client not found');
  }

  await clientModel.deleteClient(client.id);
}

module.exports = {
  getClients,
  createClient,
  getClient,
  updateClient: updateClientRecord,
  removeClient
};
