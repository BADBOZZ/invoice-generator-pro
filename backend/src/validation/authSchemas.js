const Joi = require('joi');

const email = Joi.string().trim().lowercase().email();
const password = Joi.string().min(8).max(128);

const registerSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  firstName: Joi.string().max(100).allow('', null),
  lastName: Joi.string().max(100).allow('', null)
});

const loginSchema = Joi.object({
  email: email.required(),
  password: password.required()
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required()
});

const logoutSchema = Joi.object({
  refreshToken: Joi.string().required()
});

module.exports = {
  registerSchema,
  loginSchema,
  refreshSchema,
  logoutSchema
};
