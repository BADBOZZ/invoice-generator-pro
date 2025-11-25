const express = require('express');
const { v4: uuidv4 } = require('uuid');

const { authenticate } = require('../middleware/auth');
const clientService = require('../services/clientService');

const router = express.Router();

router.use(authenticate);

router.get('/', (req, res, next) => {
  try {
    const clients = clientService.getClients(req.user.id);
    res.json({ data: clients });
  } catch (error) {
    next(error);
  }
});

router.post('/', (req, res, next) => {
  try {
    const client = clientService.createClient(req.user.id, req.body);
    res.status(201).json({ data: client });
  } catch (error) {
    next(error);
  }
});

router.get('/:clientId', (req, res, next) => {
  try {
    const client = clientService.getClient(req.user.id, req.params.clientId);
    res.json({ data: client });
  } catch (error) {
    next(error);
  }
});

router.put('/:clientId', (req, res, next) => {
  try {
    const client = clientService.updateClient(req.user.id, req.params.clientId, req.body);
    res.json({ data: client });
  } catch (error) {
    next(error);
  }
});

router.delete('/:clientId', (req, res, next) => {
  try {
    clientService.removeClient(req.user.id, req.params.clientId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
