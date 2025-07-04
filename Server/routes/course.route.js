import express from 'express';
import {
  getAllCourses,
  getCourseById,
  enrollInCourse,
} from '../controllers/course.controller.js';
import { protect } from '../middleware/userAuth.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/:id/enroll', protect, enrollInCourse);

export default router;
