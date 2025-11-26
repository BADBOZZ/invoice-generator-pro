const config = require('../config/environment');
const HttpError = require('../utils/httpError');

function notFoundHandler(req, _res, next) {
  next(new HttpError(404, `Not Found - ${req.originalUrl}`));
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err instanceof HttpError ? err.status || 400 : err.status || 500;
  const payload = {
    status,
    message: err.message || 'Internal Server Error',
    path: req.originalUrl
  };

  if (config.nodeEnv !== 'production' && err.stack) {
    payload.stack = err.stack;
  }

  if (err.errors) {
    payload.errors = err.errors;
  }

  if (config.nodeEnv !== 'test' && status >= 500) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(status).json(payload);
}

module.exports = {
  notFoundHandler,
  errorHandler
};
