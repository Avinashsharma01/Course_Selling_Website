// utils/generateToken.js

import jwt from 'jsonwebtoken';

/**
 * @desc    Generate JWT token for user
 * @param   {string} userId - User's unique ID
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export default generateToken;
