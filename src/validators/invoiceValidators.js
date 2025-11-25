const { celebrate, Joi, Segments } = require('celebrate');

const moneySchema = Joi.number().precision(2).positive().max(1_000_000);

const createInvoiceValidator = celebrate({
  [Segments.BODY]: Joi.object({
    clientName: Joi.string().min(2).max(120).required(),
    clientEmail: Joi.string().email().required(),
    dueDate: Joi.date().iso().greater('now').required(),
    currency: Joi.string().uppercase().valid('USD', 'EUR', 'GBP', 'NGN', 'KES').default('USD'),
    items: Joi.array()
      .items(
        Joi.object({
          description: Joi.string().max(180).required(),
          quantity: Joi.number().integer().min(1).max(10_000).required(),
          unitPrice: moneySchema.required(),
        })
      )
      .min(1)
      .required(),
    notes: Joi.string().max(600).allow('').optional(),
  }),
});

const invoiceIdValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().guid({ version: 'uuidv4' }).required(),
  }),
});

module.exports = {
  createInvoiceValidator,
  invoiceIdValidator,
};
