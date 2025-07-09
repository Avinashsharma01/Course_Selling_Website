import express from 'express';
import { enrollInCourse, getUserEnrollments } from '../controllers/enrollment.controller.js';
import authMiddleware from '../middleware/auth.js';
import { enrollmentValidation } from '../middleware/validateInput.js';

const router = express.Router();

// USER: enroll in course
router.post('/', authMiddleware, enrollmentValidation, enrollInCourse);

// GET: user's enrolled courses
router.get('/my-courses', authMiddleware, getUserEnrollments);

export default router;
