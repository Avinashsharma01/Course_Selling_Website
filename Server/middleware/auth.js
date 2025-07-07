// middleware/auth.js

import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
import AdminModel from '../models/admin.model.js';

/**
 * @desc    Middleware to protect routes
 * @access  Private
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userType = decoded.userType; // 'user' or 'admin'
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default authMiddleware;
