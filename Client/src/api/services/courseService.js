// courseService.js
import api from '../axios';

// Get all courses with optional filters, pagination, sorting
const getAllCourses = async (params = {}) => {
    return await api.get('/courses', { params });
};

// Get a single course by ID
const getCourseById = async (courseId) => {
    return await api.get(`/courses/${courseId}`);
};

// Search courses
const searchCourses = async (query) => {
    return await api.get('/courses/search', { params: { query } });
};

// Get courses by category
const getCoursesByCategory = async (category) => {
    return await api.get(`/courses/category/${category}`);
};

// Admin: Get my courses
const getAdminCourses = async (params = {}) => {
    return await api.get('/courses/admin/my-courses', { params });
};

// Admin: Add a new course
const addCourse = async (courseData) => {
    return await api.post('/courses/admin', courseData);
};

// Admin: Update a course
const updateCourse = async (courseId, courseData) => {
    return await api.put(`/courses/admin/${courseId}`, courseData);
};

// Admin: Delete a course
const deleteCourse = async (courseId) => {
    return await api.delete(`/courses/admin/${courseId}`);
};

// Get featured courses
const getFeaturedCourses = async () => {
    return await api.get('/courses/featured');
};

// Get course categories
const getCategories = async () => {
    return await api.get('/courses/categories');
};

export default {
    getAllCourses,
    getCourseById,
    searchCourses,
    getCoursesByCategory,
    getAdminCourses,
    addCourse,
    updateCourse,
    deleteCourse,
    getFeaturedCourses,
    getCategories
};
