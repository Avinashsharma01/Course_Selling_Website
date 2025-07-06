import express from 'express';
import authMiddleware from '../middleware/auth.js';
import adminMiddleware from '../middleware/admin.js';

import {
  addCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
} from '../controllers/course.controller.js';

const router = express.Router();

// Admin routes (Protected)
router.post('/admin', authMiddleware, adminMiddleware, addCourse);
router.put('/admin/:id', authMiddleware, adminMiddleware, updateCourse);
router.delete('/admin/:id', authMiddleware, adminMiddleware, deleteCourse);

// Public user routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

export default router;
