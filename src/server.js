const http = require('http');
const app = require('./app');
const config = require('./config/env');
const logger = require('./utils/logger');

const server = http.createServer(app);

server.listen(config.port, () => {
  logger.info(`Secure invoice API listening on port ${config.port}`);
});

server.on('error', (error) => {
  logger.error('Server error', { message: error.message, stack: error.stack });
  process.exit(1);
});

module.exports = server;
