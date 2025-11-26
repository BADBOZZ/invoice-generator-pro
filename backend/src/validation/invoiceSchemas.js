const Joi = require('joi');

const lineItemSchema = Joi.object({
  id: Joi.string().uuid().optional(),
  description: Joi.string().max(500).required(),
  quantity: Joi.number().positive().required(),
  unitPrice: Joi.number().precision(2).min(0).required()
});

const baseInvoiceSchema = Joi.object({
  clientId: Joi.string().uuid(),
  number: Joi.string().max(50),
  status: Joi.string().valid('draft', 'sent', 'paid', 'void'),
  issueDate: Joi.date().iso(),
  dueDate: Joi.date().iso(),
  currency: Joi.string().length(3).uppercase(),
  taxRate: Joi.number().min(0).max(1),
  notes: Joi.string().max(1000).allow('', null),
  lineItems: Joi.array().items(lineItemSchema),
  tax: Joi.number().min(0),
  subtotal: Joi.number().min(0),
  total: Joi.number().min(0)
});

const createInvoiceSchema = baseInvoiceSchema.keys({
  clientId: Joi.string().uuid().required(),
  lineItems: Joi.array().items(lineItemSchema).min(1).required()
});

const updateInvoiceSchema = baseInvoiceSchema.min(1);

const statusSchema = Joi.object({
  status: Joi.string().valid('draft', 'sent', 'paid', 'void').required()
});

module.exports = {
  createInvoiceSchema,
  updateInvoiceSchema,
  statusSchema
};
