const dotenv = require('dotenv');

if (!process.env.SKIP_DOTENV) {
  dotenv.config();
}

const parseNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const env = process.env.NODE_ENV || 'development';

const config = {
  env,
  port: parseNumber(process.env.PORT, 4000),
  apiKey: process.env.INVOICE_API_KEY || 'local-dev-key',
  rateLimit: {
    windowMs: parseNumber(process.env.RATE_LIMIT_WINDOW_MS, 60_000),
    max: parseNumber(process.env.RATE_LIMIT_MAX, 60),
  },
  cors: {
    allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  },
  taxRate: parseNumber(process.env.DEFAULT_TAX_RATE, 0),
};

module.exports = config;
