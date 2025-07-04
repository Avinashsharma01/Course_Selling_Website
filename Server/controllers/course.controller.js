import Course from '../models/course.model.js';

// GET all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
};

// GET course by ID
export const getCourseById = async (req, res) => {
  try {
    const courseItem = await Course.findById(req.params.id);

    if (!courseItem) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(courseItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course' });
  }
};
