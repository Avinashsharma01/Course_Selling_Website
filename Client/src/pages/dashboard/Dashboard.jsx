/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaBook, FaUser, FaLink } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import { useCourses } from "../../hooks/useCourses";
import { useToast } from "../../hooks/useToast";
import Loader from "../../components/common/Loader";

const SidebarItem = ({ icon: Icon, label, to }) => (
    <Link
        to={to}
        className="flex items-center gap-3 text-gray-700 hover:bg-blue-100 px-4 py-2 rounded-md cursor-pointer transition"
    >
        <Icon className="text-blue-600" />
        <span className="font-medium">{label}</span>
    </Link>
);

const Dashboard = () => {
    const { user } = useAuth();
    const { enrolledCourses, enrolledCoursesLoading, fetchEnrolledCourses } =
        useCourses();
    const { showToast } = useToast();

    // Use a ref to prevent multiple API calls
    const fetchedRef = useRef(false);

    useEffect(() => {
        // Only fetch once when the component mounts and user is available
        if (fetchedRef.current || !user) {
            return;
        }

        let isMounted = true;
        fetchedRef.current = true;

        const loadEnrolledCourses = async () => {
            try {
                console.log(
                    "[Dashboard] Loading enrolled courses once on mount"
                );
                if (isMounted && fetchEnrolledCourses) {
                    const result = await fetchEnrolledCourses();
                    console.log("[Dashboard] Enrolled courses data:", result);
                }
            } catch (error) {
                if (isMounted) {
                    showToast("Failed to load your enrolled courses", "error");
                    console.error(
                        "[Dashboard] Error loading enrolled courses:",
                        error
                    );
                }
            }
        };

        loadEnrolledCourses();

        // Cleanup function
        return () => {
            console.log(
                "[Dashboard] Cleanup - preventing state updates after unmount"
            );
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array - only run once on mount

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r p-6">
                <div className="mb-10">
                    <h2 className="text-xl font-bold text-blue-700 mb-2">
                        🎓 CourseSelling
                    </h2>
                    <div className="text-gray-500 text-sm">
                        Student Dashboard
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <p className="text-xs font-semibold text-gray-500 mb-2">
                            GENERAL
                        </p>
                        <SidebarItem icon={FaHome} label="Home" to="/" />
                        <SidebarItem
                            icon={FaUser}
                            label="My Profile"
                            to="/dashboard"
                        />
                        <SidebarItem
                            icon={FaBook}
                            label="Courses"
                            to="/courses"
                        />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500 mb-2">
                            CLASS
                        </p>
                        <SidebarItem
                            icon={MdSpaceDashboard}
                            label="Live Class"
                            to="#"
                        />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500 mb-2">
                            LINKS
                        </p>
                        <SidebarItem icon={FaLink} label="Resources" to="#" />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10 overflow-y-auto">
                {user ? (
                    <motion.h1
                        className="text-3xl font-extrabold text-blue-800 mb-4"
                        animate={{
                            rotateX: [0, 8, -8, 0],
                            rotateY: [0, -5, 5, 0],
                            scale: [1, 1.02, 1, 1.02, 1],
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 6,
                            ease: "easeInOut",
                        }}
                    >
                        👋 Welcome back, {user.name || "Student"}!
                    </motion.h1>
                ) : (
                    <Loader />
                )}

                <p className="text-gray-600 mb-10">
                    Let’s complete your profile and setup so you can start
                    learning smoothly.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Complete Setup Box */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                Complete Setup
                            </h2>
                            <button
                                className="text-sm text-blue-600 hover:underline"
                                onClick={() =>
                                    alert(
                                        "Edit Profile clicked — Connect this to a modal or route"
                                    )
                                }
                            >
                                ✏️ Edit Profile
                            </button>
                        </div>
                        <ul className="space-y-4 text-sm">
                            {/* Name */}
                            {user ? (
                                <>
                                    {/* Name */}
                                    <li className="flex items-start justify-between">
                                        <div>
                                            <span className="font-medium text-gray-800">
                                                ✅ Name
                                            </span>
                                            <p className="text-gray-600 text-xs">
                                                {user.name ? (
                                                    <>
                                                        Provided:{" "}
                                                        <strong>
                                                            {user.name}
                                                        </strong>
                                                    </>
                                                ) : (
                                                    <>Not Provided</>
                                                )}
                                            </p>
                                        </div>
                                        <span
                                            className={
                                                user.name
                                                    ? "text-green-500"
                                                    : "text-gray-400"
                                            }
                                        >
                                            {user.name ? "✔️" : "Pending"}
                                        </span>
                                    </li>

                                    {/* Email */}
                                    <li className="flex items-start justify-between">
                                        <div>
                                            <span className="font-medium text-gray-800">
                                                📧 Email
                                            </span>
                                            <p className="text-gray-600 text-xs">
                                                {user.email ? (
                                                    <>
                                                        Email:{" "}
                                                        <strong>
                                                            {user.email}
                                                        </strong>
                                                    </>
                                                ) : (
                                                    "Not Provided"
                                                )}
                                            </p>
                                        </div>
                                        <span
                                            className={
                                                user.email
                                                    ? "text-green-500"
                                                    : "text-yellow-500"
                                            }
                                        >
                                            {user.email ? "✔️" : "Verify"}
                                        </span>
                                    </li>

                                    {/* Profile Photo - Note: Check if the backend returns profile image URLs */}
                                    <li className="flex items-start justify-between">
                                        <div>
                                            <span className="font-medium text-gray-800">
                                                🖼️ Profile Photo
                                            </span>
                                            <p className="text-gray-600 text-xs">
                                                {user.profilePicture ? (
                                                    <span className="flex items-center gap-2">
                                                        <img
                                                            src={
                                                                user.profilePicture
                                                            }
                                                            alt="Profile"
                                                            className="w-6 h-6 rounded-full object-cover"
                                                        />
                                                        Uploaded
                                                    </span>
                                                ) : (
                                                    "No photo uploaded yet."
                                                )}
                                            </p>
                                        </div>
                                        <span
                                            className={
                                                user.profilePicture
                                                    ? "text-green-500"
                                                    : "text-gray-400"
                                            }
                                        >
                                            {user.profilePicture
                                                ? "✔️"
                                                : "Pending"}
                                        </span>
                                    </li>

                                    {/* Learning Interests - This depends on the backend API */}
                                    <li className="flex items-start justify-between">
                                        <div>
                                            <span className="font-medium text-gray-800">
                                                🎯 Learning Interests
                                            </span>
                                            <p className="text-gray-600 text-xs">
                                                {user.interests &&
                                                user.interests.length > 0
                                                    ? user.interests.join(", ")
                                                    : "Not Provided"}
                                            </p>
                                        </div>
                                        <span
                                            className={
                                                user.interests &&
                                                user.interests.length > 0
                                                    ? "text-green-500"
                                                    : "text-gray-400"
                                            }
                                        >
                                            {user.interests &&
                                            user.interests.length > 0
                                                ? "✔️"
                                                : "Pending"}
                                        </span>
                                    </li>
                                </>
                            ) : (
                                <Loader />
                            )}
                        </ul>
                    </div>

                    {/* Enrolled Courses */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            📚 Enrolled Courses
                        </h2>
                        {enrolledCoursesLoading ? (
                            <Loader />
                        ) : enrolledCourses && enrolledCourses.length > 0 ? (
                            <ol
                                type="1"
                                className="list-disc list-inside text-sm text-gray-700 space-y-2"
                            >
                                {enrolledCourses.map((enrollment) => {
                                    // Check if the enrollment has a nested course object
                                    const course =
                                        enrollment.course || enrollment;
                                    console.log(
                                        "Enrolled course data:",
                                        course
                                    );

                                    return (
                                        <li key={enrollment._id || course._id}>
                                            <Link
                                                to={`/courses/${course._id}`}
                                                className="hover:text-blue-600 flex items-center"
                                            >
                                                <strong>{course.title}</strong>{" "}
                                                — by {course.instructor}
                                                <button
                                                    className="ml-3 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full hover:bg-green-600"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        window.location.href = `/courses/${course._id}`;
                                                    }}
                                                >
                                                    Access Course
                                                </button>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ol>
                        ) : (
                            <p className="text-sm text-gray-600">
                                You haven't enrolled in any courses yet.
                            </p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
