const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const config = require('./config/environment');
const requestLogger = require('./middleware/requestLogger');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const apiRoutes = require('./routes');

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

app.use('/api/v1', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const server = http.createServer(app);

server.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on port ${config.port} (${config.nodeEnv})`);
});

module.exports = server;
