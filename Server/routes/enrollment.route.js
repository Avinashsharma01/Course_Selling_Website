import express from 'express';
import { enrollCourse } from '../controllers/enrollment.controller.js';

const router = express.Router();

// POST /enrollments
router.post('/', enrollCourse);

// GET /enrollments (optional debug route)
router.get('/', (req, res) => {
  res.send('Enrollments API is working ✅');
});

export default router;
