// enrollmentService.js
import api from '../axios';

// Enroll in a course
const enrollInCourse = async (courseId) => {
    return await api.post('/enrollments', { courseId });
};

// Get user's enrolled courses
const getEnrolledCourses = async () => {
    return await api.get('/enrollments/my-courses');
};

export default {
    enrollInCourse,
    getEnrolledCourses
};
