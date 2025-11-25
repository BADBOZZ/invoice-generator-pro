const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const parseNumber = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const sanitizeOrigins = () => {
  if (!process.env.ALLOWED_ORIGINS) {
    return [];
  }

  return process.env.ALLOWED_ORIGINS.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
};

const buildCorsOptions = () => {
  const allowList = sanitizeOrigins();
  const allowAll = allowList.length === 0;

  return {
    origin(origin, callback) {
      if (!origin || allowAll || allowList.includes(origin)) {
        return callback(null, origin || true);
      }

      const error = new Error('Origin not allowed by CORS policy');
      error.statusCode = 403;
      return callback(error);
    },
    credentials: true,
    optionsSuccessStatus: 204,
  };
};

const buildHelmetMiddleware = () =>
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'"],
        imgSrc: ["'self'", 'data:'],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: { policy: 'same-origin' },
    referrerPolicy: { policy: 'no-referrer' },
    hsts: {
      maxAge: 60 * 60 * 24 * 365,
      includeSubDomains: true,
      preload: true,
    },
  });

const buildRateLimiter = () =>
  rateLimit({
    windowMs: parseNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
    max: parseNumber(process.env.RATE_LIMIT_MAX, 100),
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Too many requests, please slow down.',
    },
  });

const jsonBodyLimit = process.env.JSON_BODY_LIMIT || '10kb';
const trustProxy = process.env.TRUST_PROXY === 'true';

module.exports = {
  buildCorsOptions,
  buildHelmetMiddleware,
  buildRateLimiter,
  jsonBodyLimit,
  trustProxy,
};
