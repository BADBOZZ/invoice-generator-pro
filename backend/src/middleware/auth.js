const { verifyAccessToken } = require('../utils/token');
const userModel = require('../models/userModel');

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyAccessToken(token);
    const user = await userModel.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ message: 'Invalid token subject' });
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role || 'user'
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function authorize(allowedRoles = []) {
  return (req, res, next) => {
    if (!allowedRoles.length) {
      return next();
    }

    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    return next();
  };
}

module.exports = {
  authenticate,
  authorize
};
