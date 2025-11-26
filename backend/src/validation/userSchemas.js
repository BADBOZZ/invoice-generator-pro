const Joi = require('joi');

const updateProfileSchema = Joi.object({
  firstName: Joi.string().max(100),
  lastName: Joi.string().max(100),
  companyName: Joi.string().max(255),
  timezone: Joi.string().max(100)
}).min(1);

module.exports = {
  updateProfileSchema
};
