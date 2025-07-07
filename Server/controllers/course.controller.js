import Course from '../models/course.model.js';
import mongoose from 'mongoose';

// Admin: Add course
const addCourse = async (req, res) => {
  try {
    // Add the admin user ID as the creator of the course
    const courseData = {
      ...req.body,
      createdBy: req.userId  // This comes from the auth middleware
    };

    const newCourse = new Course(courseData);
    const saved = await newCourse.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add course', error: error.message });
  }
};

// Admin: Update course
const updateCourse = async (req, res) => {
  try {
    // First find the course to check ownership
    const course = await Course.findById(req.params.id);

    // Check if course exists
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the admin is the owner of the course
    if (course.createdBy.toString() !== req.userId && !req.user.isSuperAdmin) {
      return res.status(403).json({
        message: 'Access denied. You can only update courses you created.'
      });
    }

    const updated = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update course', error: error.message });
  }
};

// Admin: Delete course
const deleteCourse = async (req, res) => {
  try {
    // First find the course to check ownership
    const course = await Course.findById(req.params.id);

    // Check if course exists
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the admin is the owner of the course
    if (course.createdBy.toString() !== req.userId && !req.user.isSuperAdmin) {
      return res.status(403).json({
        message: 'Access denied. You can only delete courses you created.'
      });
    }

    const deleted = await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete course', error: error.message });
  }
};

// User: Get all available courses with filtering and pagination
const getAllCourses = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
      minPrice,
      maxPrice,
      category,
      level,
      search,
      createdBy
    } = req.query;

    // Build filter
    const filter = {};

    // Price filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
      if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
    }

    // Category filter
    if (category) filter.category = category;

    // Level filter
    if (level) filter.level = level;

    // Creator filter
    if (createdBy) {
      filter.createdBy = createdBy;
    }

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort
    const sort = {};
    sort[sortBy] = order === 'asc' ? 1 : -1;

    // Execute query with pagination and populate creator info
    const courses = await Course.find(filter)
      .populate('createdBy', 'name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Get total count
    const count = await Course.countDocuments(filter);

    res.status(200).json({
      courses,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalCourses: count
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User: Get course by ID
const getCourseById = async (req, res) => {
  try {
    const found = await Course.findById(req.params.id)
      .populate('createdBy', 'name email');

    if (!found) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(found);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User: Search courses
const searchCourses = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const courses = await Course.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(20);

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get courses by category
const getCoursesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const courses = await Course.find({ category }).limit(20);

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin: Get courses created by the logged-in admin
const getAdminCourses = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build sort
    const sort = {};
    sort[sortBy] = order === 'asc' ? 1 : -1;

    // Find courses created by this admin
    const courses = await Course.find({ createdBy: req.userId })
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get count of admin's courses
    const count = await Course.countDocuments({ createdBy: req.userId });

    // Get enrollment stats for admin's courses
    const enrollmentStats = await Course.aggregate([
      { $match: { createdBy: new mongoose.Types.ObjectId(req.userId) } },
      {
        $group: {
          _id: null,
          totalCourses: { $sum: 1 },
          totalEnrollments: { $sum: '$enrollmentCount' },
          averageEnrollments: { $avg: '$enrollmentCount' }
        }
      }
    ]);

    const stats = enrollmentStats.length > 0 ? enrollmentStats[0] : {
      totalCourses: 0,
      totalEnrollments: 0,
      averageEnrollments: 0
    };

    res.status(200).json({
      courses,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      totalCourses: count,
      stats: {
        totalEnrollments: stats.totalEnrollments,
        averageEnrollmentsPerCourse: Math.round(stats.averageEnrollments * 100) / 100
      }
    });
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
  searchCourses,
  getCoursesByCategory,
  getAdminCourses
};
