// routes/user.route.js

import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
} from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

/**
 * @route   POST /api/user/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/user/login
 * @desc    Login user and return token
 * @access  Public
 */
router.post('/login', loginUser);

/**
 * @route   GET /api/user/profile
 * @desc    Get logged-in user profile
 * @access  Private
 */
router.get('/profile', authMiddleware, getUserProfile);

export default router;
