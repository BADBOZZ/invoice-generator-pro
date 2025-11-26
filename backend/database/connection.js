const { Pool } = require('pg');

const config = require('../src/config/environment');

const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: config.nodeEnv === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('error', (error) => {
  // eslint-disable-next-line no-console
  console.error('Unexpected Postgres error', error);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
  pool
};
