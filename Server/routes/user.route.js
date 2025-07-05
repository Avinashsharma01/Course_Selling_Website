// routes/user.route.js

import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserByAdmin,
  deleteUserByAdmin
} from '../controllers/user.controller.js';

import authMiddleware from '../middleware/auth.js';
import adminMiddleware from '../middleware/admin.js'; // ✅ added admin middleware

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

/**
 * @route   PUT /api/user/admin/:id
 * @desc    Update any user by admin
 * @access  Private (Admin only)
 */
router.put('/admin/:id', authMiddleware, adminMiddleware, updateUserByAdmin);

/**
 * @route   DELETE /api/user/admin/:id
 * @desc    Delete any user by admin
 * @access  Private (Admin only)
 */
router.delete('/admin/:id', authMiddleware, adminMiddleware, deleteUserByAdmin);

export default router;
