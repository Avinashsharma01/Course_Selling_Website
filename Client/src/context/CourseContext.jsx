import React, { useState, useEffect } from "react";
import courseService from "../api/services/courseService";
import enrollmentService from "../api/services/enrollmentService";
import { CourseContext } from "./CourseContextCreator";
import { useAuth } from "../hooks/useAuth";

export const CourseProvider = ({ children }) => {
    // Add cache flags
    const [featuredCoursesFetched, setFeaturedCoursesFetched] = useState(false);
    const [categoriesFetched, setCategoriesFetched] = useState(false);
    const [allCoursesFetched, setAllCoursesFetched] = useState(false);

    // State for all courses
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [coursesLoading, setCoursesLoading] = useState(true);
    const [coursesError, setCoursesError] = useState(null);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCourses, setTotalCourses] = useState(0);

    // State for current course
    const [currentCourse, setCurrentCourse] = useState(null);
    const [currentCourseLoading, setCurrentCourseLoading] = useState(false);

    // State for admin courses
    const [adminCourses, setAdminCourses] = useState([]);
    const [adminCoursesLoading, setAdminCoursesLoading] = useState(false);
    const [adminStats, setAdminStats] = useState(null);

    // State for enrolled courses
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [enrolledCoursesLoading, setEnrolledCoursesLoading] = useState(false);

    // State for search
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Featured courses
    const [featuredCourses, setFeaturedCourses] = useState([]);
    const [featuredCoursesLoading, setFeaturedCoursesLoading] = useState(false);

    // Categories
    const [courseCategories, setCourseCategories] = useState([]);
    const [categoriesLoading, setCategoriesLoading] = useState(false);

    // Filters
    const [filters, setFilters] = useState({
        minPrice: "",
        maxPrice: "",
        category: "",
        level: "",
        sortBy: "createdAt",
        order: "desc",
    });

    const { user, isAdmin } = useAuth();

    // Fetch all courses on mount and when filters/pagination change
    useEffect(() => {
        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, filters]);

    // Extract unique categories when courses change
    useEffect(() => {
        if (courses.length > 0) {
            const uniqueCategories = [
                ...new Set(courses.map((course) => course.category)),
            ];
            setCategories(uniqueCategories);
        }
    }, [courses]);

    // Fetch admin courses when user changes and is admin
    useEffect(() => {
        if (user && isAdmin) {
            fetchAdminCourses();
        }
    }, [user, isAdmin]);

    // Fetch enrolled courses when user changes
    useEffect(() => {
        if (user && !isAdmin) {
            fetchEnrolledCourses();
        }
    }, [user, isAdmin]);

    // Fetch all courses with optional filters and pagination
    const fetchCourses = async () => {
        setCoursesLoading(true);
        setCoursesError(null);

        try {
            const params = {
                page: currentPage,
                limit: 10,
                ...filters,
            };

            const response = await courseService.getAllCourses(params);

            setCourses(response.courses);
            setTotalPages(response.totalPages);
            setTotalCourses(response.totalCourses);
        } catch (error) {
            setCoursesError(error);
            console.error("Error fetching courses:", error);
        } finally {
            setCoursesLoading(false);
        }
    };

    // Fetch single course by ID
    const fetchCourseById = async (courseId) => {
        setCurrentCourseLoading(true);

        try {
            const response = await courseService.getCourseById(courseId);
            setCurrentCourse(response);
            return response;
        } catch (error) {
            console.error("Error fetching course details:", error);
            throw error;
        } finally {
            setCurrentCourseLoading(false);
        }
    };

    // Search courses
    const searchCourses = async (query) => {
        if (!query.trim()) return;

        setSearchQuery(query);
        setCoursesLoading(true);

        try {
            const response = await courseService.searchCourses(query);
            setSearchResults(response);
            return response;
        } catch (error) {
            console.error("Error searching courses:", error);
            throw error;
        } finally {
            setCoursesLoading(false);
        }
    };

    // Fetch courses by category
    const fetchCoursesByCategory = async (category) => {
        setCoursesLoading(true);

        try {
            const response = await courseService.getCoursesByCategory(category);
            setCourses(response);
            return response;
        } catch (error) {
            console.error("Error fetching courses by category:", error);
            throw error;
        } finally {
            setCoursesLoading(false);
        }
    };

    // Fetch admin courses (if admin)
    const fetchAdminCourses = async () => {
        setAdminCoursesLoading(true);

        try {
            const response = await courseService.getAdminCourses();
            setAdminCourses(response.courses);
            setAdminStats(response.stats);
            return response;
        } catch (error) {
            console.error("Error fetching admin courses:", error);
            throw error;
        } finally {
            setAdminCoursesLoading(false);
        }
    };

    // Add new course (admin only)
    const addCourse = async (courseData) => {
        try {
            const response = await courseService.addCourse(courseData);

            // Refresh admin courses list
            await fetchAdminCourses();

            return response;
        } catch (error) {
            console.error("Error adding course:", error);
            throw error;
        }
    };

    // Update course (admin only)
    const updateCourse = async (courseId, courseData) => {
        try {
            const response = await courseService.updateCourse(
                courseId,
                courseData
            );

            // Update current course if it matches
            if (currentCourse && currentCourse._id === courseId) {
                setCurrentCourse({ ...currentCourse, ...response });
            }

            // Refresh admin courses list
            if (isAdmin) {
                await fetchAdminCourses();
            }

            return response;
        } catch (error) {
            console.error("Error updating course:", error);
            throw error;
        }
    };

    // Delete course (admin only)
    const deleteCourse = async (courseId) => {
        try {
            const response = await courseService.deleteCourse(courseId);

            // Refresh admin courses list
            if (isAdmin) {
                await fetchAdminCourses();
            }

            return response;
        } catch (error) {
            console.error("Error deleting course:", error);
            throw error;
        }
    };

    // Enroll in course
    const enrollInCourse = async (courseId) => {
        // Check if already enrolled first
        if (enrolledCourses && enrolledCourses.length > 0) {
            // Check if already enrolled in this course
            const isAlreadyEnrolled = enrolledCourses.some((enrollment) => {
                if (enrollment.course) {
                    return (
                        enrollment.course._id === courseId ||
                        enrollment.course.id === courseId ||
                        enrollment.courseId === courseId
                    );
                }
                return (
                    enrollment._id === courseId || enrollment.id === courseId
                );
            });

            if (isAlreadyEnrolled) {
                console.log(
                    "Already enrolled in this course - skipping API call"
                );
                return { message: "Already enrolled in this course" };
            }
        }

        try {
            const response = await enrollmentService.enrollInCourse(courseId);

            // Refresh enrolled courses
            await fetchEnrolledCourses();

            return response;
        } catch (error) {
            console.error("Error enrolling in course:", error);
            // Add more detailed error data
            if (error.response && error.response.data) {
                console.error("Server error response:", error.response.data);
                error.details = error.response.data;
            }
            throw error;
        }
    };

    // Fetch enrolled courses
    const fetchEnrolledCourses = async () => {
        setEnrolledCoursesLoading(true);

        try {
            const response = await enrollmentService.getEnrolledCourses();
            console.log(
                "[CourseContext] Raw enrolled courses response:",
                response
            );

            // Store the full enrollment data with course details
            setEnrolledCourses(response);

            return response;
        } catch (error) {
            console.error("Error fetching enrolled courses:", error);
            throw error;
        } finally {
            setEnrolledCoursesLoading(false);
        }
    };

    // Fetch all courses (no pagination)
    const fetchAllCourses = async () => {
        // If courses are already loaded, don't fetch again
        if (allCoursesFetched && courses.length > 0) {
            return courses;
        }

        setCoursesLoading(true);
        setCoursesError(null);

        try {
            const response = await courseService.getAllCourses({ limit: 100 });
            setCourses(response.courses);
            setAllCoursesFetched(true);
            return response.courses;
        } catch (error) {
            setCoursesError(error);
            console.error("Error fetching all courses:", error);
            throw error;
        } finally {
            setCoursesLoading(false);
        }
    };

    // Fetch featured courses
    const fetchFeaturedCourses = async () => {
        // If featured courses are already loaded, don't fetch again
        if (featuredCoursesFetched && featuredCourses.length > 0) {
            return featuredCourses;
        }

        setFeaturedCoursesLoading(true);

        try {
            // Get featured courses (could be a specific endpoint or filter)
            const response = await courseService.getFeaturedCourses();
            setFeaturedCourses(response);
            setFeaturedCoursesFetched(true);
            return response;
        } catch (error) {
            console.error("Error fetching featured courses:", error);
            throw error;
        } finally {
            setFeaturedCoursesLoading(false);
        }
    };

    // Fetch course categories
    const fetchCourseCategories = async () => {
        // If categories are already loaded, don't fetch again
        if (categoriesFetched && courseCategories.length > 0) {
            return courseCategories;
        }

        setCategoriesLoading(true);

        try {
            const response = await courseService.getCategories();
            setCourseCategories(response);
            setCategoriesFetched(true);
            return response;
        } catch (error) {
            console.error("Error fetching course categories:", error);
            throw error;
        } finally {
            setCategoriesLoading(false);
        }
    };

    // Set filters
    const updateFilters = (newFilters) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
        setCurrentPage(1); // Reset to first page when filters change
    };

    // Clear filters
    const clearFilters = () => {
        setFilters({
            minPrice: "",
            maxPrice: "",
            category: "",
            level: "",
            sortBy: "createdAt",
            order: "desc",
        });
    };

    // Change page
    const changePage = (page) => {
        setCurrentPage(page);
    };

    // Reset cache to force a refresh
    const resetCache = () => {
        setAllCoursesFetched(false);
        setFeaturedCoursesFetched(false);
        setCategoriesFetched(false);
    };

    return (
        <CourseContext.Provider
            value={{
                // Courses state
                courses,
                coursesLoading,
                coursesError,
                currentPage,
                totalPages,
                totalCourses,
                categories,

                // Current course
                currentCourse,
                currentCourseLoading,

                // Admin courses
                adminCourses,
                adminCoursesLoading,
                adminStats,

                // Featured courses
                featuredCourses,
                featuredCoursesLoading,

                // Categories
                courseCategories,
                categoriesLoading,

                // Enrolled courses
                enrolledCourses,
                enrolledCoursesLoading,

                // Search
                searchQuery,
                searchResults,

                // Filters
                filters,

                // Methods
                fetchCourses,
                fetchCourseById,
                searchCourses,
                fetchCoursesByCategory,
                addCourse,
                updateCourse,
                deleteCourse,
                enrollInCourse,
                fetchEnrolledCourses,
                updateFilters,
                clearFilters,
                changePage,
                fetchAllCourses,
                fetchFeaturedCourses,
                fetchCourseCategories,
                resetCache,
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};
