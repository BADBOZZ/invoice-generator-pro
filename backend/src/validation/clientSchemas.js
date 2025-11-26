const Joi = require('joi');

const baseSchema = Joi.object({
  companyName: Joi.string().max(255),
  contactName: Joi.string().max(255).allow('', null),
  email: Joi.string().email().allow('', null),
  phone: Joi.string().max(50).allow('', null),
  currency: Joi.string().length(3).uppercase().default('USD'),
  address: Joi.string().max(500).allow('', null),
  notes: Joi.string().max(1000).allow('', null)
});

const createClientSchema = baseSchema.keys({
  companyName: Joi.string().max(255).required()
});

const updateClientSchema = baseSchema.min(1);

module.exports = {
  createClientSchema,
  updateClientSchema
};
