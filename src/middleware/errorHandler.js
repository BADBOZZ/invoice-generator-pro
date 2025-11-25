const maskMessage = 'Internal server error.';

const errorHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const isServerError = statusCode >= 500;

  if (isServerError) {
    // eslint-disable-next-line no-console
    console.error('Unhandled error', {
      requestId: req.id,
      message: err.message,
      stack: err.stack,
    });
  }

  const payload = {
    error: isServerError ? maskMessage : err.message,
    requestId: req.id,
  };

  if (!isServerError && err.details) {
    payload.details = err.details;
  }

  if (process.env.NODE_ENV !== 'production' && isServerError) {
    payload.debug = err.message;
  }

  return res.status(statusCode).json(payload);
};

const notFoundHandler = (_req, _res, next) => {
  const error = new Error('Route not found.');
  error.statusCode = 404;
  next(error);
};

module.exports = {
  errorHandler,
  notFoundHandler,
};
