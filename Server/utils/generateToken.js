// utils/generateToken.js

import jwt from 'jsonwebtoken';

/**
 * @desc    Generate JWT token for user or admin
 * @param   {string} userId - User's or Admin's unique ID
 * @param   {string} userType - Type of user ('user' or 'admin')
 * @returns {string} JWT token
 */
const generateToken = (userId, userType = 'user') => {
  return jwt.sign(
    {
      id: userId,
      userType: userType
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
};

export default generateToken;
