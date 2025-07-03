import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';
import { getUserProfile } from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/user/register
// @desc    Register a new user
router.post('/register', registerUser);

// @route   POST /api/user/login
// @desc    Login user
router.post('/login', loginUser);
// @route   GET /api/user/profile
// @desc    Get user profile    
router.get('/profile', authMiddleware, getUserProfile);


export default router;
