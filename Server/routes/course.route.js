import express from 'express';
import authMiddleware from '../middleware/auth.js';
import adminMiddleware from '../middleware/admin.js';
import { courseValidation } from '../middleware/validateInput.js';

import {
  addCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  searchCourses,
  getCoursesByCategory,
  getAdminCourses
} from '../controllers/course.controller.js';

const router = express.Router();

// Admin routes (Protected)
router.post('/admin', authMiddleware, adminMiddleware, courseValidation, addCourse);
router.put('/admin/:id', authMiddleware, adminMiddleware, courseValidation, updateCourse);
router.delete('/admin/:id', authMiddleware, adminMiddleware, deleteCourse);
router.get('/admin/my-courses', authMiddleware, adminMiddleware, getAdminCourses);

// Public user routes
router.get('/', getAllCourses);
router.get('/search', searchCourses);
router.get('/category/:category', getCoursesByCategory);
router.get('/:id', getCourseById);

export default router;
