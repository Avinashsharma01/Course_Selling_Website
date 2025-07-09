/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    FaChevronDown,
    FaSearch,
    FaUserCircle,
    FaBars,
    FaTimes,
    FaGraduationCap,
    FaBook,
    FaUser,
    FaSignOutAlt,
    FaShieldAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import { useCourses } from "../../hooks/useCourses";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { courseCategories, fetchCourseCategories } = useCourses();
    const navigate = useNavigate();
    const location = useLocation();
    const menuRef = useRef(null);
    const searchInputRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const [showExplore, setShowExplore] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    // Detect scroll for navbar styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fetch categories for the dropdown
    useEffect(() => {
        fetchCourseCategories();
    }, [fetchCourseCategories]);

    // Close dropdowns on route change
    useEffect(() => {
        setShowExplore(false);
        setShowUserMenu(false);
        setMobileMenuOpen(false);
        setShowMobileSearch(false);
    }, [location.pathname]);

    // Close menus when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            // Close dropdown menus when clicking outside
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowExplore(false);
                setShowUserMenu(false);
            }

            // Close mobile menu when clicking outside
            if (
                mobileMenuOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                !event.target.closest(".mobile-menu-button")
            ) {
                setMobileMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [mobileMenuOpen]);

    // Focus search input when mobile search is shown
    useEffect(() => {
        if (showMobileSearch && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [showMobileSearch]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
            setShowMobileSearch(false);
        }
    };

    const toggleMobileSearch = () => {
        setShowMobileSearch((prev) => !prev);
        if (!showMobileSearch) {
            setMobileMenuOpen(false);
        }
    };

    // console.log("User", user.role);
    // if (user.role == "user") {
    //     console.log("okokokokokokko");
    // }

    // console.log("Admin", user.role);
    // if (user.role == "admin") {
    //     console.log("okokokokokokko");
    // }

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white text-blue-800 shadow-lg"
                    : "bg-blue-700 text-black"
            }`}
        >
            <div className="w-full px-6 py-3">
                <div className="flex items-center justify-between w-full">
                    {/* Left: Logo & Mobile Menu Button */}
                    <div className="flex items-center space-x-4">
                        {/* Mobile menu button */}
                        <button
                            className="mobile-menu-button p-2 rounded-md inline-flex items-center justify-center text-blue-100 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <FaTimes className="block h-5 w-5" />
                            ) : (
                                <FaBars className="block h-5 w-5" />
                            )}
                        </button>

                        {/* Logo */}
                        <Link
                            to="/"
                            className={`text-2xl font-extrabold tracking-wide flex items-center ${
                                isScrolled
                                    ? "text-blue-700"
                                    : "text-white drop-shadow-md"
                            }`}
                        >
                            <FaGraduationCap className="mr-2" />
                            <span className="hidden sm:inline-block">
                                CourseSelling
                            </span>
                            <span className="sm:hidden">CS</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        {/* Explore Dropdown */}
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowExplore((prev) => !prev)}
                                className={`flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-200 ${
                                    isScrolled
                                        ? "border border-blue-300 hover:bg-blue-50"
                                        : "border border-blue-400 bg-blue-600 hover:bg-blue-800 text-white"
                                }`}
                            >
                                Explore{" "}
                                <FaChevronDown
                                    className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                                        showExplore ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            <AnimatePresence>
                                {showExplore && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-10 left-0 bg-white border border-blue-200 rounded-md shadow-lg w-56 z-50 overflow-hidden"
                                    >
                                        {courseCategories &&
                                        courseCategories.length > 0 ? (
                                            courseCategories.map(
                                                (category, i) => (
                                                    <Link
                                                        key={i}
                                                        to={`/courses?category=${encodeURIComponent(
                                                            category
                                                        )}`}
                                                        className="block px-4 py-2 hover:bg-blue-50 text-sm text-blue-700 font-medium border-l-2 border-transparent hover:border-blue-500 transition-all"
                                                    >
                                                        {category}
                                                    </Link>
                                                )
                                            )
                                        ) : (
                                            <div className="px-4 py-3 text-sm text-gray-600 flex items-center justify-center">
                                                <div className="animate-pulse mr-2 h-4 w-4 bg-blue-200 rounded-full"></div>
                                                Loading categories...
                                            </div>
                                        )}
                                        <Link
                                            to="/courses"
                                            className="block px-4 py-2 bg-blue-50 text-blue-700 font-medium text-sm border-t border-blue-100"
                                        >
                                            Browse All Courses
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link
                            to="/courses"
                            className={`text-sm font-medium transition-colors ${
                                isScrolled
                                    ? "text-blue-800 hover:text-blue-600"
                                    : "text-white hover:text-blue-200"
                            }`}
                        >
                            All Courses
                        </Link>
                        <Link
                            to="/about"
                            className={`text-sm font-medium transition-colors ${
                                isScrolled
                                    ? "text-blue-800 hover:text-blue-600"
                                    : "text-white hover:text-blue-200"
                            }`}
                        >
                            About
                        </Link>
                        

                        <Link
                            to="/contact"
                            className={`text-sm font-medium transition-colors ${
                                isScrolled
                                    ? "text-blue-800 hover:text-blue-600"
                                    : "text-white hover:text-blue-200"
                            }`}
                        >
                            Contact
                        </Link>
                        {/* 
                        <Link
                            to="/admin/dashboard"
                            className={`text-sm font-medium transition-colors ${
                                isScrolled
                                    ? "text-blue-800 hover:text-blue-600"
                                    : "text-white hover:text-blue-200"
                            }`}
                        >
                            Admin Dashboard
                        </Link>
                         */}
                    </div>

                    {/* Right: Search & User */}
                    <div className="flex items-center space-x-4">
                        {/* Desktop Search */}
                        <div className="hidden md:block relative">
                            <form onSubmit={handleSearch} className="flex">
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-40 lg:w-60 px-3 py-1.5 rounded-l-md focus:outline-none border border-r-0 border-blue-300 placeholder-gray-400 text-sm"
                                />
                                <button
                                    type="submit"
                                    className={`rounded-r-md px-3 py-1.5 transition-colors ${
                                        isScrolled
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-white hover:bg-blue-100 text-blue-700"
                                    }`}
                                >
                                    <FaSearch />
                                </button>
                            </form>
                        </div>

                        {/* Mobile Search Button */}
                        <button
                            className="md:hidden p-2 rounded-full hover:bg-blue-600 focus:outline-none"
                            onClick={toggleMobileSearch}
                        >
                            {showMobileSearch ? <FaTimes /> : <FaSearch />}
                        </button>

                        {/* User Menu */}
                        {user ? (
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() =>
                                        setShowUserMenu((prev) => !prev)
                                    }
                                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                                >
                                    {user.profilePicture ? (
                                        <img
                                            src={user.profilePicture}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full object-cover border-2 border-blue-300"
                                        />
                                    ) : (
                                        <div
                                            className={`p-1 rounded-full ${
                                                isScrolled
                                                    ? "bg-blue-600 text-white"
                                                    : "bg-white text-blue-700"
                                            }`}
                                        >
                                            <FaUserCircle size={20} />
                                        </div>
                                    )}
                                    <span className="hidden md:inline-block font-medium text-sm">
                                        {user.name
                                            ? user.name.split(" ")[0]
                                            : "Account"}
                                    </span>
                                    <FaChevronDown
                                        className={`w-3 h-3 transition-transform duration-200 ${
                                            showUserMenu ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-12 right-0 bg-white border border-blue-200 rounded-md shadow-lg w-56 z-50 overflow-hidden"
                                        >
                                            <div className="px-4 py-3 border-b border-blue-100 bg-blue-50">
                                                <p className="font-semibold text-blue-800">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {user.email}
                                                </p>
                                            </div>

                                            <Link
                                                to="admin/dashboard"
                                                className="flex items-center px-4 py-2 hover:bg-blue-50 text-gray-700"
                                            >
                                                <FaBook className="mr-2 text-blue-600" />
                                                My Learning
                                            </Link>

                                            {user.isAdmin && (
                                                <Link
                                                    to="/dashboard/admin"
                                                    className="flex items-center px-4 py-2 hover:bg-blue-50 text-gray-700"
                                                >
                                                    <FaShieldAlt className="mr-2 text-purple-600" />
                                                    Admin Panel
                                                </Link>
                                            )}

                                            <Link
                                                to="/profile"
                                                className="flex items-center px-4 py-2 hover:bg-blue-50 text-gray-700"
                                                onClick={() =>
                                                    setShowUserMenu(false)
                                                }
                                            >
                                                <FaUser className="mr-2 text-blue-600" />
                                                My Profile
                                            </Link>

                                            <button
                                                onClick={() => {
                                                    logout();
                                                    navigate("/");
                                                }}
                                                className="flex items-center w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 border-t border-gray-100"
                                            >
                                                <FaSignOutAlt className="mr-2" />
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/auth/login"
                                    className={`hidden sm:inline-block text-sm font-medium transition-colors ${
                                        isScrolled
                                            ? "text-blue-700 hover:text-blue-500"
                                            : "text-white hover:text-blue-200"
                                    }`}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/auth/register"
                                    className={`text-sm font-medium px-4 py-1.5 rounded-md transition-colors ${
                                        isScrolled
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-white hover:bg-blue-100 text-blue-700"
                                    }`}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Search Bar (Expandable) */}
                <AnimatePresence>
                    {showMobileSearch && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden mt-3"
                        >
                            <form onSubmit={handleSearch} className="flex">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full px-3 py-2 rounded-l-md focus:outline-none border border-r-0 border-blue-300"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white rounded-r-md px-4 py-2 hover:bg-blue-700 transition-colors"
                                >
                                    <FaSearch />
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden bg-white border-t border-blue-100 shadow-lg"
                        ref={mobileMenuRef}
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link
                                to="/courses"
                                className="block px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-blue-50"
                            >
                                All Courses
                            </Link>

                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setShowExplore((prev) => !prev)
                                    }
                                    className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-blue-50"
                                >
                                    Explore Categories
                                    <FaChevronDown
                                        className={`transition-transform duration-200 ${
                                            showExplore ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {showExplore && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="pl-4 border-l-2 border-blue-200 ml-3 mt-1 overflow-hidden"
                                        >
                                            {courseCategories &&
                                            courseCategories.length > 0 ? (
                                                courseCategories.map(
                                                    (category, i) => (
                                                        <Link
                                                            key={i}
                                                            to={`/courses?category=${encodeURIComponent(
                                                                category
                                                            )}`}
                                                            className="block px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded"
                                                        >
                                                            {category}
                                                        </Link>
                                                    )
                                                )
                                            ) : (
                                                <div className="px-3 py-2 text-sm text-gray-500 flex items-center">
                                                    <div className="animate-pulse mr-2 h-3 w-3 bg-blue-200 rounded-full"></div>
                                                    Loading...
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link
                                to="/contact"
                                className="block px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-blue-50"
                            >
                                Contact
                            </Link>

                            {!user && (
                                <Link
                                    to="/auth/login"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-700 hover:bg-blue-50"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;