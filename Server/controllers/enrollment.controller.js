import Enrollment from '../models/enrollment.model.js';
import Course from '../models/course.model.js';
import mongoose from 'mongoose';

// Enroll in a course
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.userId; // Should be set by auth middleware

    // Validate the course exists
    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const alreadyEnrolled = await Enrollment.findOne({ userId, courseId });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    const newEnrollment = await Enrollment.create({ userId, courseId });

    // Update enrollment count
    await Course.findByIdAndUpdate(courseId, { $inc: { enrollmentCount: 1 } });

    res.status(201).json({ message: 'Enrolled successfully', enrollment: newEnrollment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all enrolled courses for a user
const getUserEnrollments = async (req, res) => {
  try {
    const userId = req.userId;

    const enrollments = await Enrollment.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) }
      },
      {
        $lookup: {
          from: 'courses',
          localField: 'courseId',
          foreignField: '_id',
          as: 'courseDetails'
        }
      },
      { $unwind: '$courseDetails' },
      {
        $project: {
          _id: 1,
          enrolledAt: 1,
          course: '$courseDetails'
        }
      },
      { $sort: { enrolledAt: -1 } }
    ]);

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { enrollInCourse, getUserEnrollments };
