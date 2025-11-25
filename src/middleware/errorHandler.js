const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || err.status || 500;
  const isServerError = status >= 500;

  logger.error('Request failed', {
    status,
    method: req.method,
    path: req.originalUrl,
    message: err.message,
    stack: isServerError ? err.stack : undefined,
  });

  const payload = {
    error: isServerError ? 'Internal Server Error' : err.error || 'Request Failed',
    message: isServerError ? 'Unexpected error. Try again later.' : err.message,
  };

  if (err.details) {
    payload.details = err.details;
  }

  res.status(status).json(payload);
};

module.exports = errorHandler;
