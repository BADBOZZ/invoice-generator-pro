const redact = (data = {}) => {
  const clone = { ...data };
  if (clone.headers) {
    const headers = { ...clone.headers };
    if (headers.authorization) {
      headers.authorization = '[redacted]';
    }
    if (headers['x-api-key']) {
      headers['x-api-key'] = '[redacted]';
    }
    clone.headers = headers;
  }
  return clone;
};

const log = (level, message, meta) => {
  const timestamp = new Date().toISOString();
  // eslint-disable-next-line no-console
  console[level](`[${timestamp}] ${message}`, meta ? redact(meta) : '');
};

module.exports = {
  info: (message, meta) => log('log', message, meta),
  warn: (message, meta) => log('warn', message, meta),
  error: (message, meta) => log('error', message, meta),
};
