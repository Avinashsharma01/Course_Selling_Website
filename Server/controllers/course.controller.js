import { Course } from '../models/course.model.js';
import { Enrollment } from '../models/enrollment.model.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching courses' });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching course' });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const already = await Enrollment.findOne({
      userId: req.user._id,
      courseId: req.params.id,
    });
    if (already) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    const enrollment = new Enrollment({
      userId: req.user._id,
      courseId: req.params.id,
    });

    await enrollment.save();
    res.status(201).json({ message: 'Enrolled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error enrolling in course' });
  }
};
