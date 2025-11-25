const config = require('../config/environment');

function notFoundHandler(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const payload = {
    status,
    message: err.message || 'Internal Server Error'
  };

  if (config.nodeEnv !== 'production' && err.stack) {
    payload.stack = err.stack;
  }

  if (err.errors) {
    payload.errors = err.errors;
  }

  res.status(status).json(payload);
}

module.exports = {
  notFoundHandler,
  errorHandler
};
