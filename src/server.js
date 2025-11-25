require('dotenv').config();

const compression = require('compression');
const cors = require('cors');
const express = require('express');
const hpp = require('hpp');
const morgan = require('morgan');

const {
  buildCorsOptions,
  buildHelmetMiddleware,
  buildRateLimiter,
  jsonBodyLimit,
  trustProxy,
} = require('./config/security');
const { requestContext } = require('./middleware/requestContext');
const { apiKeyAuth } = require('./middleware/apiKeyAuth');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const invoiceRoutes = require('./routes/invoiceRoutes');
const healthRoutes = require('./routes/healthRoutes');

const app = express();

if (trustProxy) {
  app.set('trust proxy', 1);
}

morgan.token('id', (req) => req.id);

app.use(requestContext);
app.use(buildHelmetMiddleware());
app.use(cors(buildCorsOptions()));
app.use(hpp());
app.use(express.json({ limit: jsonBodyLimit }));
app.use(express.urlencoded({ extended: false, limit: jsonBodyLimit }));
app.use(compression());
app.use('/api', buildRateLimiter());
app.use(
  morgan(
    ":id :remote-addr :method :url :status :response-time ms - :res[content-length]",
  ),
);

app.use(healthRoutes);
app.use('/api/v1/invoices', apiKeyAuth, invoiceRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const port = Number(process.env.PORT) || 4000;

const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Secure API listening on port ${port}`);
});

module.exports = server;
