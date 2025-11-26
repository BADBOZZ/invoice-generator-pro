const Joi = require('joi');

const createPaymentSchema = Joi.object({
  invoiceId: Joi.string().uuid().required(),
  amount: Joi.number().positive().required(),
  currency: Joi.string().length(3).uppercase().default('USD'),
  method: Joi.string().max(50).default('manual'),
  reference: Joi.string().max(255).allow('', null),
  paidAt: Joi.date().iso()
});

module.exports = {
  createPaymentSchema
};
