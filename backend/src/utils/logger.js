const { createLogger, format, transports } = require('winston');

const config = require('../config/environment');

const consoleFormat =
  config.nodeEnv === 'production'
    ? format.json()
    : format.combine(
        format.colorize(),
        format.printf(({ level, message, timestamp, ...meta }) => {
          const extra = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
          return `${timestamp} [${level}]: ${message}${extra}`;
        })
      );

const logger = createLogger({
  level: config.logLevel,
  format: format.combine(format.timestamp(), format.errors({ stack: true }), format.splat(), format.json()),
  transports: [
    new transports.Console({
      format: consoleFormat
    })
  ]
});

module.exports = logger;
