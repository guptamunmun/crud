const jwt = require('jsonwebtoken');

const config = require('../config/config');
const jwtSecret = config.jwtSecret;

// Authentication middleware
const authenticateUser = (req, res, next) => {
  // Get the JWT token from the request header
  const token = req.headers.authorization;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, jwtSecret);

    // Attach the user ID to the request object
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Authorization middleware
const authorizeUser = (req, res, next) => {
  // Check if the user has admin privileges
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
};

module.exports = {
  authenticateUser,
  authorizeUser
};
