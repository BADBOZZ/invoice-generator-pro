const { ZodError } = require('zod');

const formatZodError = (error) =>
  error.errors.map(({ path, message }) => ({
    path: path.join('.'),
    message,
  }));

const buildValidationError = (details) => {
  const validationError = new Error('Validation failed.');
  validationError.statusCode = 400;
  validationError.details = details;
  return validationError;
};

const validateBody = (schema) => (req, _res, next) => {
  try {
    req.validatedBody = schema.parse(req.body);
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return next(buildValidationError(formatZodError(error)));
    }
    return next(error);
  }
};

const validateParams = (schema) => (req, _res, next) => {
  try {
    req.validatedParams = schema.parse(req.params);
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      return next(buildValidationError(formatZodError(error)));
    }
    return next(error);
  }
};

module.exports = {
  validateBody,
  validateParams,
};
