const crypto = require('crypto');

const hash = (value) =>
  crypto.createHash('sha256').update(value, 'utf8').digest('hex');

const resolveExpectedHash = () => {
  if (process.env.INTERNAL_API_KEY_HASH) {
    return process.env.INTERNAL_API_KEY_HASH.trim();
  }

  if (process.env.INTERNAL_API_KEY) {
    return hash(process.env.INTERNAL_API_KEY.trim());
  }

  throw new Error(
    'INTERNAL_API_KEY or INTERNAL_API_KEY_HASH must be defined for API protection.',
  );
};

const expectedHash = resolveExpectedHash();

const apiKeyAuth = (req, res, next) => {
  const providedKey = req.header('x-api-key');

  if (!providedKey) {
    const error = new Error('API key is missing.');
    error.statusCode = 401;
    return next(error);
  }

  const providedHash = hash(providedKey.trim());

  if (providedHash !== expectedHash) {
    const error = new Error('API key is invalid.');
    error.statusCode = 403;
    return next(error);
  }

  return next();
};

module.exports = { apiKeyAuth };
