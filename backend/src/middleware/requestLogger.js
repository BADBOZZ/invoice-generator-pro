const morgan = require('morgan');

const config = require('../config/environment');
const logger = require('../utils/logger');

const stream = {
  write: (message) => logger.info(message.trim())
};

const skip = () => config.nodeEnv === 'test';

module.exports = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip }
);
