const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const compression = require('compression');

const buildCorsOptions = (config) => {
  const origins = config.cors.allowedOrigins || [];
  const allowAll = origins.includes('*');

  return {
    origin: (origin, callback) => {
      if (!origin || allowAll || origins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Origin not allowed by CORS policy'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    exposedHeaders: ['x-request-id'],
  };
};

const createSecurityMiddleware = (config) => {
  const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    limit: config.rateLimit.max,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (req, res) =>
      res.status(429).json({
        error: 'Too many requests',
        message: 'Please retry after the rate limit window resets.',
      }),
  });

  return [
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", 'https:'],
          imgSrc: ["'self'", 'data:'],
          connectSrc: ["'self'"],
          frameAncestors: ["'none'"],
        },
      },
      referrerPolicy: { policy: 'no-referrer' },
      permissionsPolicy: {
        camera: ['none'],
        microphone: ['none'],
        geolocation: ['none'],
      },
    }),
    cors(buildCorsOptions(config)),
    limiter,
    hpp(),
    compression(),
  ];
};

module.exports = createSecurityMiddleware;
