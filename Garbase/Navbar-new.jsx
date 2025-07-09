import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaChevronDown, FaSearch, FaUserCircle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useCourses } from "../../hooks/useCourses";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { courseCategories, fetchCourseCategories } = useCourses();
    const navigate = useNavigate();
    const location = useLocation();

    const [showExplore, setShowExplore] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    // Fetch categories for the dropdown
    useEffect(() => {
        fetchCourseCategories();
    }, [fetchCourseCategories]);

    // Close dropdowns on route change
    useEffect(() => {
        setShowExplore(false);
        setShowUserMenu(false);
    }, [location.pathname]);

    return (
        <nav className="fixed  top-0 left-0 w-full bg-blue-700 shadow-lg border-b border-blue-800 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex flex-row items-center justify-between">
                {/* Left: Logo & Explore */}
                <div className="flex flex-row items-center gap-6 relative">
                    <Link
                        to="/"
                        className="text-2xl font-extrabold text-white tracking-wide drop-shadow"
                    >
                        CourseSelling
                    </Link>

                    {/* Explore Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowExplore((prev) => !prev)}
                            className="flex items-center gap-1 text-sm font-medium px-3 py-1 border border-blue-400 rounded bg-blue-600 text-white hover:bg-blue-800 hover:border-blue-300 transition"
                        >
                            Explore <FaChevronDown size={12} />
                        </button>

                        {showExplore && (
                            <div className="absolute top-10 left-0 bg-white border border-blue-200 rounded shadow-md w-48 z-50">
                                {courseCategories &&
                                courseCategories.length > 0 ? (
                                    courseCategories.map((category, i) => (
                                        <Link
                                            key={i}
                                            to={`/courses?category=${encodeURIComponent(
                                                category
                                            )}`}
                                            className="block px-4 py-2 hover:bg-blue-50 text-sm text-blue-700 font-semibold"
                                        >
                                            {category}
                                        </Link>
                                    ))
                                ) : (
                                    <div className="px-4 py-2 text-sm text-gray-600">
                                        Loading categories...
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Center: Search Bar */}
                <div className="flex-1 mx-5 hidden md:block">
                    <div className="flex items-center bg-white rounded-md border border-blue-300">
                        <input
                            type="text"
                            placeholder="Search for courses..."
                            className="w-full px-3 py-1 rounded-l-md focus:outline-none"
                        />
                        <button className="bg-blue-500 text-white rounded-r-md px-3 py-1.5 hover:bg-blue-600 transition">
                            <FaSearch />
                        </button>
                    </div>
                </div>

                {/* Right: Navigation Links & User */}
                <div className="flex items-center gap-5">
                    <Link
                        to="/courses"
                        className="text-white hover:text-blue-200 transition hidden md:inline-block font-medium"
                    >
                        All Courses
                    </Link>
                    <Link
                        to="/contact"
                        className="text-white hover:text-blue-200 transition hidden md:inline-block font-medium"
                    >
                        Contact
                    </Link>

                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu((prev) => !prev)}
                                className="flex items-center gap-2 text-white hover:text-blue-200 transition"
                            >
                                {user.profilePicture ? (
                                    <img
                                        src={user.profilePicture}
                                        alt="Profile"
                                        className="w-8 h-8 rounded-full object-cover border-2 border-blue-300"
                                    />
                                ) : (
                                    <FaUserCircle size={24} />
                                )}
                                <span className="hidden md:inline-block font-medium">
                                    {user.name
                                        ? user.name.split(" ")[0]
                                        : "Account"}
                                </span>
                                <FaChevronDown size={12} />
                            </button>

                            {showUserMenu && (
                                <div className="absolute top-10 right-0 bg-white border border-blue-200 rounded shadow-lg w-48 z-50">
                                    <div className="px-4 py-2 border-b border-blue-100">
                                        <p className="font-semibold text-blue-800">
                                            {user.name}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {user.email}
                                        </p>
                                    </div>

                                    <Link
                                        to="/dashboard"
                                        className="block px-4 py-2 hover:bg-blue-50 text-gray-700"
                                    >
                                        Dashboard
                                    </Link>

                                    {user.isAdmin && (
                                        <Link
                                            to="/dashboard/admin"
                                            className="block px-4 py-2 hover:bg-blue-50 text-purple-700"
                                        >
                                            Admin Panel
                                        </Link>
                                    )}

                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 hover:bg-blue-50 text-gray-700"
                                    >
                                        My Profile
                                    </Link>

                                    <button
                                        onClick={() => {
                                            logout();
                                            navigate("/");
                                        }}
                                        className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 border-t border-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                to="/auth/login"
                                className="text-white hover:text-blue-200 transition font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                to="/auth/register"
                                className="bg-white text-blue-700 hover:bg-blue-100 px-3 py-1 rounded-md transition font-medium"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
