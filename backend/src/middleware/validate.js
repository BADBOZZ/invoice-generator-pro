const HttpError = require('../utils/httpError');

const options = {
  abortEarly: false,
  stripUnknown: true,
  convert: true
};

function formatErrors(details = []) {
  return details.map((detail) => ({
    path: detail.path.join('.'),
    message: detail.message
  }));
}

const validate =
  (schema, property = 'body') =>
  (req, _res, next) => {
    const { error, value } = schema.validate(req[property], options);

    if (error) {
      throw new HttpError(400, 'Validation failed', formatErrors(error.details));
    }

    req[property] = value;
    next();
  };

module.exports = validate;
