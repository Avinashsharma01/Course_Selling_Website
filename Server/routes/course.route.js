import express from 'express';
import { getAllCourses, getCourseById } from '../controllers/course.controller.js';
import course from '../models/course.model.js';  

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);



export default router;
