// routes/admin.route.js

import express from 'express';
import {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
    updateAdminProfile,
    getAllAdmins,
    createAdmin,
    deleteAdmin
} from '../controllers/admin.controller.js';

import authMiddleware from '../middleware/auth.js';
import adminMiddleware from '../middleware/admin.js';
import superAdminMiddleware from '../middleware/superAdmin.js';
import { registerValidation, loginValidation } from '../middleware/validateInput.js';

const router = express.Router();

/**
 * @route   POST /api/admin/register
 * @desc    Register a new admin (public registration can be disabled in production)
 * @access  Public
 */
router.post('/register', registerValidation, registerAdmin);

/**
 * @route   POST /api/admin/login
 * @desc    Login admin and return token
 * @access  Public
 */
router.post('/login', loginValidation, loginAdmin);

/**
 * @route   GET /api/admin/profile
 * @desc    Get logged-in admin profile
 * @access  Private (Admin only)
 */
router.get('/profile', authMiddleware, adminMiddleware, getAdminProfile);

/**
 * @route   PUT /api/admin/profile
 * @desc    Update admin profile
 * @access  Private (Admin only)
 */
router.put('/profile', authMiddleware, adminMiddleware, updateAdminProfile);

/**
 * @route   GET /api/admin/all
 * @desc    Get all admins (super admin only)
 * @access  Private (Super Admin only)
 */
router.get('/all', authMiddleware, adminMiddleware, getAllAdmins);

/**
 * @route   POST /api/admin/create
 * @desc    Create new admin (super admin only)
 * @access  Private (Super Admin only)
 */
router.post('/create', authMiddleware, adminMiddleware, createAdmin);

/**
 * @route   DELETE /api/admin/:id
 * @desc    Delete admin (super admin only)
 * @access  Private (Super Admin only)
 */
router.delete('/:id', authMiddleware, adminMiddleware, deleteAdmin);

export default router;
