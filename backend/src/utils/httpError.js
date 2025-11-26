class HttpError extends Error {
  constructor(status = 500, message = 'Internal Server Error', errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

module.exports = HttpError;
