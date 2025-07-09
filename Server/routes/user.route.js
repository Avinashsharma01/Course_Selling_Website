// routes/user.route.js

import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser
} from '../controllers/user.controller.js';

import authMiddleware from '../middleware/auth.js';
import adminMiddleware from '../middleware/admin.js';
import { registerValidation, loginValidation } from '../middleware/validateInput.js';

const router = express.Router();

/**
 * @route   POST /api/user/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerValidation, registerUser);

/**
 * @route   POST /api/user/login
 * @desc    Login user and return token
 * @access  Public
 */
router.post('/login', loginValidation, loginUser);

/**
 * @route   GET /api/user/profile
 * @desc    Get logged-in user profile
 * @access  Private
 */
router.get('/profile', authMiddleware, getUserProfile);

/**
 * @route   PUT /api/user/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', authMiddleware, updateUserProfile);

/**
 * @route   GET /api/user/all
 * @desc    Get all users (admin only)
 * @access  Private (Admin only)
 */
router.get('/all', authMiddleware, adminMiddleware, getAllUsers);

/**
 * @route   DELETE /api/user/:id
 * @desc    Delete a user (admin only)
 * @access  Private (Admin only)
 */
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

export default router;
