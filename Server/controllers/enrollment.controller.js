import Enrollment from '../models/enrollment.model.js';
import Course from '../models/course.model.js';

export const enrollCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({ message: 'Both userId and courseId are required' });
  }

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const newEnrollment = new Enrollment({ userId, courseId });
    await newEnrollment.save();

    res.status(201).json({ message: 'Enrollment successful', enrollment: newEnrollment });
  } catch (err) {
    console.error('Enrollment Error:', err.message);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
