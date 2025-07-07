import express from 'express';
import { enrollInCourse } from '../controllers/enrollment.controller.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// USER: enroll in course
router.post('/', authMiddleware, enrollInCourse);

export default router;
