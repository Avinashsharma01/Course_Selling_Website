import Course from '../models/course.model.js';

// Admin: Add course
const addCourse = async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    const saved = await newCourse.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add course', error: error.message });
  }
};

// Admin: Update course
const updateCourse = async (req, res) => {
  try {
    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update course', error: error.message });
  }
};

// Admin: Delete course
const deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course', error: error.message });
  }
};

// User: Get all available courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ published: true });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User: Get course by ID
const getCourseById = async (req, res) => {
  try {
    const found = await Course.findById(req.params.id);
    if (!found) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(found);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export {
  addCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
};
