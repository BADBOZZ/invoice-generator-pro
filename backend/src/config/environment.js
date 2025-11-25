const Joi = require('joi');
const dotenv = require('dotenv');

dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'test', 'production')
    .default('development'),
  PORT: Joi.number().default(4000),
  DATABASE_URL: Joi.string()
    .uri({ scheme: ['postgres', 'postgresql'] })
    .default('postgresql://postgres:postgres@localhost:5432/invoice_generator'),
  JWT_ACCESS_SECRET: Joi.string().default('change-me-access'),
  JWT_REFRESH_SECRET: Joi.string().default('change-me-refresh'),
  ACCESS_TOKEN_TTL: Joi.string().default('15m'),
  REFRESH_TOKEN_TTL: Joi.string().default('7d'),
  BCRYPT_SALT_ROUNDS: Joi.number().default(12),
  CORS_ORIGIN: Joi.string().default('*'),
  RATE_LIMIT_WINDOW_MS: Joi.number().default(15 * 60 * 1000),
  RATE_LIMIT_MAX: Joi.number().default(100),
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly')
    .default('info')
})
  .unknown(true);

const { value, error } = envSchema.prefs({ abortEarly: false }).validate(process.env);

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

module.exports = {
  nodeEnv: value.NODE_ENV,
  port: value.PORT,
  databaseUrl: value.DATABASE_URL,
  jwt: {
    accessSecret: value.JWT_ACCESS_SECRET,
    refreshSecret: value.JWT_REFRESH_SECRET,
    accessTtl: value.ACCESS_TOKEN_TTL,
    refreshTtl: value.REFRESH_TOKEN_TTL
  },
  bcryptRounds: value.BCRYPT_SALT_ROUNDS,
  cors: {
    origin: value.CORS_ORIGIN
  },
  rateLimit: {
    windowMs: value.RATE_LIMIT_WINDOW_MS,
    max: value.RATE_LIMIT_MAX
  },
  logLevel: value.LOG_LEVEL
};
