import Enrollment from '../models/enrollment.model.js';

const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.userId; // Should be set by auth middleware

    const alreadyEnrolled = await Enrollment.findOne({ userId, courseId });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const newEnrollment = await Enrollment.create({ userId, courseId });
    res.status(201).json({ message: 'Enrolled successfully', enrollment: newEnrollment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { enrollInCourse };
