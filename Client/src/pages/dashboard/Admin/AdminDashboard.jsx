/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    FaUsers,
    FaBook,
    FaUserShield,
    FaPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaChartBar,
} from "react-icons/fa";
import { MdSpaceDashboard, MdCategory } from "react-icons/md";
import { useAuth } from "../../../hooks/useAuth";
import { useCourses } from "../../../hooks/useCourses";
import { useToast } from "../../../hooks/useToast";
import Loader from "../../../components/common/Loader";
import courseService from "../../../api/services/courseService";
import authService from "../../../api/services/authService";

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <div
        className={`flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition ${
            active
                ? "bg-blue-100 text-blue-800"
                : "text-gray-700 hover:bg-blue-50"
        }`}
        onClick={onClick}
    >
        <Icon className={active ? "text-blue-600" : "text-gray-600"} />
        <span className="font-medium">{label}</span>
    </div>
);

const ITEMS_PER_PAGE = 6;

const AdminDashboard = () => {
    const { user } = useAuth();
    const {
        adminCourses,
        adminCoursesLoading,
        adminStats,
        fetchAdminCourses,
        resetCache,
    } = useCourses();
    const { showToast } = useToast();
    const location = useLocation();

    const [searchQuery, setSearchQuery] = useState("");
    const [tab, setTab] = useState("courses");
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [isLoadingAdmins, setIsLoadingAdmins] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);
    // Local state for courses and stats as fallback when context is not available
    const [localCourses, setLocalCourses] = useState([]);
    const [localStats, setLocalStats] = useState({});
    const [localCoursesLoading, setLocalCoursesLoading] = useState(false);

    // Use memoized error handlers to avoid dependency issues
    const handleLoadError = useCallback(
        (message = "Failed to load data") => {
            showToast(message, "error");
        },
        [showToast]
    );

    // Use a ref to track if we've shown an error toast already
    const errorToastShown = React.useRef(false);

    // Fetch admin courses once on mount
    useEffect(() => {
        // Define flag to track if this effect is still relevant (to avoid state updates after unmount)
        let isMounted = true;

        // Add debug message to understand what's happening
        console.log("AdminDashboard mounted, preparing to load courses");

        const loadAdminCourses = async () => {
            try {
                // Check if we have a refresh request from the location state
                if (location.state?.refreshData) {
                    console.log(
                        "Refreshing course data due to navigation state"
                    );
                    if (typeof resetCache === "function") {
                        resetCache(); // Reset cache to force a fresh data fetch
                    }
                }

                // Always fetch on first load or if refreshData is true
                if (isMounted) {
                    // Check if fetchAdminCourses is a function, otherwise use direct API call
                    if (typeof fetchAdminCourses === "function") {
                        console.log("Using context fetchAdminCourses function");
                        await fetchAdminCourses();
                        console.log(
                            "Courses fetched successfully through context"
                        );
                    } else {
                        // Fallback to direct API call if context function is not available
                        console.log(
                            "Context function not available, using direct API call"
                        );
                        setLocalCoursesLoading(true);

                        try {
                            console.log(
                                "Making direct API call to getAdminCourses"
                            );
                            const response =
                                await courseService.getAdminCourses();

                            console.log("API Response:", response);

                            // Handle different response structures
                            // The response could be the data directly or have a data property
                            const responseData = response?.data || response;

                            console.log(
                                "Processed response data:",
                                responseData
                            );

                            // Safely extract courses
                            const coursesData = responseData?.courses || [];
                            console.log("Extracted courses:", coursesData);
                            setLocalCourses(coursesData);

                            // Safely extract stats
                            if (responseData?.stats) {
                                console.log(
                                    "Extracted stats:",
                                    responseData.stats
                                );
                                setLocalStats(responseData.stats);
                            }
                            console.log(
                                "Courses fetched successfully through direct API"
                            );
                        } finally {
                            if (isMounted) {
                                setLocalCoursesLoading(false);
                            }
                        }
                    }

                    // Reset the error toast flag when fetch is successful
                    errorToastShown.current = false;
                }
            } catch (error) {
                console.error("Error loading courses:", error);
                console.error("Error details:", {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    response: error.response,
                });

                // Only show error toast once to avoid duplicates
                if (!errorToastShown.current && isMounted) {
                    handleLoadError("Failed to load your courses");
                    errorToastShown.current = true;
                }

                // Ensure loading state is reset even on error
                if (isMounted && !adminCoursesLoading) {
                    setLocalCoursesLoading(false);
                }
            }
        };

        loadAdminCourses();

        // Cleanup function
        return () => {
            isMounted = false;
        };
    }, [
        // Only dependencies that should trigger a refresh
        fetchAdminCourses,
        handleLoadError,
        location.state?.refreshData,
        resetCache,
        adminCoursesLoading,
        setLocalCoursesLoading,
    ]);

    // Fetch admins list if super admin
    useEffect(() => {
        const fetchAdmins = async () => {
            if (user?.isSuperAdmin) {
                setIsLoadingAdmins(true);
                try {
                    const adminsList = await authService.getAllAdmins();
                    setAdmins(adminsList);
                } catch (error) {
                    // Use handleLoadError instead of directly calling showToast
                    handleLoadError("Failed to load admin users");
                } finally {
                    setIsLoadingAdmins(false);
                }
            }
        };

        fetchAdmins();
    }, [user, handleLoadError]);

    // Use either adminCourses from context or local state courses
    const coursesToUse =
        Array.isArray(adminCourses) && adminCourses.length > 0
            ? adminCourses
            : localCourses;

    // Filter courses based on search query
    const filteredCourses = coursesToUse.filter(
        (course) =>
            course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            course.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter admins based on search query
    const filteredAdmins = admins.filter(
        (admin) =>
            admin.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admin.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admin.position?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Paginated lists
    const paginatedCourses = filteredCourses.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const paginatedAdmins = filteredAdmins.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(
        (tab === "courses" ? filteredCourses.length : filteredAdmins.length) /
            ITEMS_PER_PAGE
    );

    // Auto-reset confirmation state after 10 seconds
    useEffect(() => {
        if (confirmDelete) {
            const timer = setTimeout(() => {
                setConfirmDelete(null);
            }, 10000); // 10 seconds

            return () => clearTimeout(timer);
        }
    }, [confirmDelete]);

    // Handle course deletion - memoized to avoid infinite loops with showToast
    const handleDeleteCourse = useCallback(
        async (courseId) => {
            // First click - show confirmation
            if (confirmDelete !== courseId) {
                setConfirmDelete(courseId);
                showToast(
                    "Click delete again to confirm deletion (expires in 10 seconds)",
                    "warning"
                );
                return;
            }

            // Second click - actually delete
            setIsLoading(true);
            try {
                console.log("Attempting to delete course:", courseId);
                await courseService.deleteCourse(courseId);
                console.log("Course deleted successfully on server");

                // Refresh course data after deletion
                if (typeof fetchAdminCourses === "function") {
                    // Use context function if available
                    console.log("Using context function to refresh courses");
                    await fetchAdminCourses();
                    console.log("Course list refreshed through context");
                } else {
                    // Direct API call fallback
                    console.log("Using direct API call to refresh courses");
                    setLocalCoursesLoading(true);
                    try {
                        const response = await courseService.getAdminCourses();
                        console.log("Refresh API Response:", response);

                        // Handle different response structures
                        const responseData = response?.data || response;
                        console.log("Processed refresh data:", responseData);

                        // Safely extract courses
                        const coursesData = responseData?.courses || [];
                        console.log(
                            "Extracted refreshed courses:",
                            coursesData
                        );
                        setLocalCourses(coursesData);

                        // Safely extract stats
                        if (responseData?.stats) {
                            console.log(
                                "Extracted refreshed stats:",
                                responseData.stats
                            );
                            setLocalStats(responseData.stats);
                        }
                    } finally {
                        setLocalCoursesLoading(false);
                    }
                }

                showToast("Course deleted successfully", "success");
            } catch (error) {
                console.error("Error deleting course:", error);
                console.error("Error details:", {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    response: error.response,
                });
                showToast("Failed to delete course", "error");
            } finally {
                setIsLoading(false);
                setConfirmDelete(null);
            }
        },
        [
            confirmDelete,
            fetchAdminCourses,
            showToast,
            setIsLoading,
            setConfirmDelete,
            setLocalCourses,
            setLocalStats,
            setLocalCoursesLoading,
        ]
    );

    // Format currency
    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r p-6">
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-purple-700 mb-2">
                        🎓 Learnify
                    </h2>
                    <div className="text-gray-500 text-sm">Admin Dashboard</div>
                </div>

                {user && user.isSuperAdmin && (
                    <div className="px-4 py-2 bg-purple-100 text-purple-800 rounded-md mb-6 text-sm font-medium flex items-center">
                        <FaUserShield className="mr-2" /> Super Admin
                    </div>
                )}

                <div className="space-y-1">
                    <SidebarItem
                        icon={MdSpaceDashboard}
                        label="Dashboard"
                        active={tab === "dashboard"}
                        onClick={() => setTab("dashboard")}
                    />
                    <SidebarItem
                        icon={FaBook}
                        label="My Courses"
                        active={tab === "courses"}
                        onClick={() => {
                            setTab("courses");
                            setPage(1);
                        }}
                    />
                    {user && user.isSuperAdmin && (
                        <SidebarItem
                            icon={FaUsers}
                            label="Admins"
                            active={tab === "admins"}
                            onClick={() => {
                                setTab("admins");
                                setPage(1);
                            }}
                        />
                    )}
                    <SidebarItem
                        icon={MdCategory}
                        label="Categories"
                        active={tab === "categories"}
                        onClick={() => setTab("categories")}
                    />
                    <SidebarItem
                        icon={FaChartBar}
                        label="Analytics"
                        active={tab === "analytics"}
                        onClick={() => setTab("analytics")}
                    />
                </div>

                <div className="mt-8">
                    <Link
                        to="/courses/admin/create"
                        className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition"
                    >
                        <FaPlus size={14} />
                        <span>Create New Course</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
                {!user ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">
                                {tab === "dashboard" && "Admin Dashboard"}
                                {tab === "courses" && "My Courses"}
                                {tab === "admins" && "Admin Management"}
                                {tab === "categories" && "Course Categories"}
                                {tab === "analytics" && "Analytics Dashboard"}
                            </h1>

                            {(tab === "courses" || tab === "admins") && (
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder={`Search ${
                                            tab === "courses"
                                                ? "courses"
                                                : "admins"
                                        }...`}
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Dashboard View */}
                        {tab === "dashboard" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-gray-500 text-sm font-medium">
                                            Total Courses
                                        </h3>
                                        <FaBook
                                            className="text-blue-500"
                                            size={20}
                                        />
                                    </div>
                                    <p className="text-3xl font-bold text-gray-800">
                                        {coursesToUse.length}
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-gray-500 text-sm font-medium">
                                            Total Enrollments
                                        </h3>
                                        <FaUsers
                                            className="text-green-500"
                                            size={20}
                                        />
                                    </div>
                                    <p className="text-3xl font-bold text-gray-800">
                                        {adminStats?.totalEnrollments ||
                                            localStats?.totalEnrollments ||
                                            0}
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-gray-500 text-sm font-medium">
                                            Avg. Enrollments
                                        </h3>
                                        <FaChartBar
                                            className="text-purple-500"
                                            size={20}
                                        />
                                    </div>
                                    <p className="text-3xl font-bold text-gray-800">
                                        {(
                                            adminStats?.averageEnrollmentsPerCourse ||
                                            localStats?.averageEnrollmentsPerCourse ||
                                            0
                                        ).toFixed(1)}
                                    </p>
                                </div>

                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-gray-500 text-sm font-medium">
                                            Admin Status
                                        </h3>
                                        <FaUserShield
                                            className={
                                                user.isSuperAdmin
                                                    ? "text-purple-500"
                                                    : "text-blue-500"
                                            }
                                            size={20}
                                        />
                                    </div>
                                    <p className="text-lg font-bold text-gray-800">
                                        {user.isSuperAdmin
                                            ? "Super Admin"
                                            : "Admin"}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Courses View */}
                        {tab === "courses" && (
                            <>
                                {adminCoursesLoading || localCoursesLoading ? (
                                    <div className="flex justify-center items-center h-64">
                                        <Loader />
                                    </div>
                                ) : filteredCourses.length === 0 ? (
                                    <div className="bg-white p-8 rounded-xl text-center">
                                        <h3 className="text-xl font-semibold text-gray-700 mb-4">
                                            You haven't created any courses yet
                                        </h3>
                                        <p className="text-gray-500 mb-6">
                                            Start creating courses to share your
                                            knowledge with the world!
                                        </p>
                                        <Link
                                            to="/courses/admin/create"
                                            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            <FaPlus size={14} /> Create Your
                                            First Course
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Course
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Category
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Price
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Enrollments
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {paginatedCourses.map(
                                                    (course) => (
                                                        <tr
                                                            key={course._id}
                                                            className="hover:bg-gray-50"
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="h-10 w-10 flex-shrink-0">
                                                                        <img
                                                                            className="h-10 w-10 rounded-full object-cover"
                                                                            src={
                                                                                course.thumbnail ||
                                                                                "https://via.placeholder.com/40"
                                                                            }
                                                                            alt={
                                                                                course.title
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <div className="text-sm font-medium text-gray-900">
                                                                            {
                                                                                course.title
                                                                            }
                                                                        </div>
                                                                        <div className="text-sm text-gray-500">
                                                                            {
                                                                                course.instructor
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                    {
                                                                        course.category
                                                                    }
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">
                                                                    {formatPrice(
                                                                        course.price
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {
                                                                    course.enrollmentCount
                                                                }
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <div className="flex gap-3">
                                                                    <Link
                                                                        to={`/courses/admin/edit/${course._id}`}
                                                                        className="text-indigo-600 hover:text-indigo-900"
                                                                    >
                                                                        <FaEdit />
                                                                    </Link>
                                                                    <button
                                                                        onClick={() =>
                                                                            handleDeleteCourse(
                                                                                course._id
                                                                            )
                                                                        }
                                                                        className={`${
                                                                            confirmDelete ===
                                                                            course._id
                                                                                ? "text-red-600 bg-red-100 px-3 py-1 rounded-md border border-red-300 font-medium"
                                                                                : "text-gray-500 hover:text-red-600"
                                                                        } transition-all duration-200 flex items-center gap-1`}
                                                                        disabled={
                                                                            isLoading
                                                                        }
                                                                        title={
                                                                            confirmDelete ===
                                                                            course._id
                                                                                ? "Click again to confirm deletion"
                                                                                : "Delete course"
                                                                        }
                                                                    >
                                                                        <FaTrash />
                                                                        {confirmDelete ===
                                                                            course._id && (
                                                                            <span className="text-xs">
                                                                                Confirm?
                                                                            </span>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Admins View (Super Admin only) */}
                        {tab === "admins" && user.isSuperAdmin && (
                            <>
                                {isLoadingAdmins ? (
                                    <div className="flex justify-center items-center h-64">
                                        <Loader />
                                    </div>
                                ) : admins.length === 0 ? (
                                    <div className="bg-white p-8 rounded-xl text-center">
                                        <h3 className="text-xl font-semibold text-gray-700 mb-4">
                                            No admins found
                                        </h3>
                                        <Link
                                            to="/admin/create"
                                            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
                                        >
                                            <FaPlus size={14} /> Add New Admin
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Name
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Email
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Position
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Role
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {paginatedAdmins.map(
                                                    (admin) => (
                                                        <tr
                                                            key={admin._id}
                                                            className="hover:bg-gray-50"
                                                        >
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="flex items-center">
                                                                    <div className="ml-4">
                                                                        <div className="text-sm font-medium text-gray-900">
                                                                            {
                                                                                admin.name
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">
                                                                    {
                                                                        admin.email
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <div className="text-sm text-gray-900">
                                                                    {
                                                                        admin.position
                                                                    }
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span
                                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                ${
                                    admin.isSuperAdmin
                                        ? "bg-purple-100 text-purple-800"
                                        : "bg-blue-100 text-blue-800"
                                }`}
                                                                >
                                                                    {admin.isSuperAdmin
                                                                        ? "Super Admin"
                                                                        : "Admin"}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                <div className="flex gap-3">
                                                                    <Link
                                                                        to={`/admin/edit/${admin._id}`}
                                                                        className="text-indigo-600 hover:text-indigo-900"
                                                                    >
                                                                        <FaEdit />
                                                                    </Link>
                                                                    {!admin.isSuperAdmin && (
                                                                        <button className="text-gray-500 hover:text-red-800">
                                                                            <FaTrash />
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Pagination */}
                        {((tab === "courses" &&
                            filteredCourses.length > ITEMS_PER_PAGE) ||
                            (tab === "admins" &&
                                filteredAdmins.length > ITEMS_PER_PAGE)) && (
                            <div className="flex justify-between items-center mt-6">
                                <button
                                    onClick={() =>
                                        setPage(Math.max(1, page - 1))
                                    }
                                    disabled={page === 1}
                                    className={`px-4 py-2 border rounded-md ${
                                        page === 1
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    Previous
                                </button>

                                <span className="text-sm text-gray-700">
                                    Page {page} of {totalPages}
                                </span>

                                <button
                                    onClick={() =>
                                        setPage(Math.min(totalPages, page + 1))
                                    }
                                    disabled={page === totalPages}
                                    className={`px-4 py-2 border rounded-md ${
                                        page === totalPages
                                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                            : "bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
