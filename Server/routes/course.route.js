import authMiddleware from '../middleware/auth.js';
import adminMiddleware from '../middleware/admin.js';
import {
  addCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/course.controller.js';

router.post('/admin', authMiddleware, adminMiddleware, addCourse);
router.put('/admin/:id', authMiddleware, adminMiddleware, updateCourse);
router.delete('/admin/:id', authMiddleware, adminMiddleware, deleteCourse);
