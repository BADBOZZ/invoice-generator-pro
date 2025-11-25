const { randomUUID } = require('crypto');

const requestContext = (req, res, next) => {
  const id = randomUUID();
  req.id = id;
  res.setHeader('X-Request-Id', id);
  next();
};

module.exports = { requestContext };
