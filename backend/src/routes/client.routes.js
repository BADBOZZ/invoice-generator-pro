const express = require('express');
const { v4: uuidv4 } = require('uuid');

const { authenticate } = require('../middleware/auth');
const {
  addClient,
  listClients,
  findClientById,
  updateClient,
  deleteClient
} = require('../store/inMemoryDb');
const { toClientResponse } = require('../utils/transformers');

const router = express.Router();

router.use(authenticate);

router.get('/', (req, res) => {
  const clients = listClients(req.user.id).map(toClientResponse);
  res.json({ data: clients });
});

router.post('/', (req, res) => {
  const { companyName, contactName, email, phone, currency, address, notes } = req.body;

  if (!companyName) {
    return res.status(400).json({ message: 'Company name is required' });
  }

  const client = addClient({
    id: uuidv4(),
    ownerId: req.user.id,
    companyName,
    contactName: contactName || '',
    email: email || '',
    phone: phone || '',
    currency: currency || 'USD',
    address: address || '',
    notes: notes || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  res.status(201).json({ data: toClientResponse(client) });
});

router.get('/:clientId', (req, res) => {
  const client = findClientById(req.params.clientId);

  if (!client || client.ownerId !== req.user.id) {
    return res.status(404).json({ message: 'Client not found' });
  }

  res.json({ data: toClientResponse(client) });
});

router.put('/:clientId', (req, res) => {
  const client = findClientById(req.params.clientId);

  if (!client || client.ownerId !== req.user.id) {
    return res.status(404).json({ message: 'Client not found' });
  }

  const updated = updateClient(client.id, {
    companyName: req.body.companyName ?? client.companyName,
    contactName: req.body.contactName ?? client.contactName,
    email: req.body.email ?? client.email,
    phone: req.body.phone ?? client.phone,
    currency: req.body.currency ?? client.currency,
    address: req.body.address ?? client.address,
    notes: req.body.notes ?? client.notes
  });

  res.json({ data: toClientResponse(updated) });
});

router.delete('/:clientId', (req, res) => {
  const client = findClientById(req.params.clientId);

  if (!client || client.ownerId !== req.user.id) {
    return res.status(404).json({ message: 'Client not found' });
  }

  deleteClient(client.id);
  res.status(204).send();
});

module.exports = router;
