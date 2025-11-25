const morgan = require('morgan');
const config = require('../config/environment');

const format = config.nodeEnv === 'production' ? 'combined' : 'dev';

module.exports = morgan(format);
