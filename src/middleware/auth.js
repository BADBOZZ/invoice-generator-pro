const config = require('../config/env');

const authGuard = (req, res, next) => {
  const apiKeyHeader = req.get('x-api-key');

  if (!apiKeyHeader || apiKeyHeader !== config.apiKey) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Valid API key missing or incorrect.',
    });
  }

  return next();
};

module.exports = authGuard;
