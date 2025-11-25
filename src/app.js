const express = require('express');
const morgan = require('morgan');
const { errors } = require('celebrate');
const config = require('./config/env');
const createSecurityMiddleware = require('./middleware/security');
const inputSanitizer = require('./middleware/inputSanitizer');
const errorHandler = require('./middleware/errorHandler');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();

createSecurityMiddleware(config).forEach((middleware) => app.use(middleware));

app.use(express.json({ limit: '15kb' }));
app.use(express.urlencoded({ extended: false, limit: '15kb' }));
app.use(inputSanitizer());

if (config.env !== 'test') {
  app.use(
    morgan('combined', {
      skip: (req, res) => res.statusCode < 400,
    })
  );
}

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/invoices', invoiceRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Route not found',
  });
});

app.use(errors());
app.use(errorHandler);

module.exports = app;
