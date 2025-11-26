const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');

const config = require('./config/environment');
const requestLogger = require('./middleware/requestLogger');
const { metricsMiddleware, metricsHandler } = require('./middleware/metrics');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const apiRoutes = require('./routes');
const logger = require('./utils/logger');

const openApiPath = path.join(__dirname, '..', 'openapi.yaml');
let openApiDocument = {};

try {
  const rawSpec = fs.readFileSync(openApiPath, 'utf8');
  openApiDocument = YAML.parse(rawSpec);
} catch (error) {
  logger.warn('Failed to load OpenAPI spec', { error: error.message });
  openApiDocument = {
    openapi: '3.0.0',
    info: {
      title: 'Invoice Generator API',
      version: '1.0.0'
    }
  };
}

const app = express();

const corsOrigins =
  config.cors.origin === '*'
    ? '*'
    : config.cors.origin.split(',').map((origin) => origin.trim());

const corsOptions =
  corsOrigins === '*'
    ? { origin: true, credentials: true }
    : { origin: corsOrigins, credentials: true };

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(requestLogger);
app.use(metricsMiddleware);

app.get('/metrics', metricsHandler);
app.get('/api/v1/metrics', metricsHandler);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use('/api/v1', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const server = http.createServer(app);

server.listen(config.port, () => {
  logger.info(`API server listening on port ${config.port}`, { env: config.nodeEnv });
});

module.exports = server;
