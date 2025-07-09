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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        fetchCourseCategories();
    }, [fetchCourseCategories]);

    useEffect(() => {
        setShowExplore(false);
        setShowUserMenu(false);
        setMobileMenuOpen(false);
        setShowMobileSearch(false);
    }, [location.pathname]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowExplore(false);
                setShowUserMenu(false);
            }
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

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-white text-blue-800 shadow-lg"
                    : "bg-blue-700 text-white"
            }`}
        >
            <div className="w-full px-4 sm:px-6 py-3">
                <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
                    {/* Left: Logo & Mobile Menu */}
                    <div className="flex items-center space-x-4">
                        <button
                            className="mobile-menu-button p-2 rounded-md inline-flex items-center justify-center text-blue-100 hover:text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
                        </button>

                        <Link
                            to="/"
                            className={`text-2xl font-extrabold tracking-wide flex items-center ${
                                isScrolled ? "text-blue-700" : "text-white drop-shadow-md"
                            }`}
                        >
                            <FaGraduationCap className="mr-2" />
                            <span className="hidden sm:inline-block">CourseSelling</span>
                            <span className="sm:hidden">CS</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setShowExplore((prev) => !prev)}
                                className={`flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-200 ${
                                    isScrolled
                                        ? "border border-blue-300 hover:bg-blue-50"
                                        : "border border-blue-400 bg-blue-600 hover:bg-blue-800 text-white"
                                }`}
                            >
                                Explore <FaChevronDown className={`w-3 h-3 ml-1 transition-transform duration-200 ${showExplore ? "rotate-180" : ""}`} />
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
                                        {courseCategories?.length > 0 ? (
                                            courseCategories.map((category, i) => (
                                                <Link
                                                    key={i}
                                                    to={`/courses?category=${encodeURIComponent(category)}`}
                                                    className="block px-4 py-2 hover:bg-blue-50 text-sm text-blue-700 font-medium border-l-2 border-transparent hover:border-blue-500 transition-all"
                                                >
                                                    {category}
                                                </Link>
                                            ))
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

                        <Link to="/courses" className={`text-sm font-medium transition-colors ${isScrolled ? "text-blue-800 hover:text-blue-600" : "text-white hover:text-blue-200"}`}>
                            All Courses
                        </Link>
                        <Link to="/contact" className={`text-sm font-medium transition-colors ${isScrolled ? "text-blue-800 hover:text-blue-600" : "text-white hover:text-blue-200"}`}>
                            Contact
                        </Link>
                    </div>

                    {/* Right: Search & User */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:block relative">
                            <form onSubmit={handleSearch} className="flex">
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-40 lg:w-60 px-3 py-1.5 rounded-l-md focus:outline-none border border-r-0 border-blue-300 placeholder-gray-400 text-sm"
                                />
                                <button
                                    type="submit"
                                    className={`rounded-r-md px-3 py-1.5 transition-colors ${isScrolled ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-white hover:bg-blue-100 text-blue-700"}`}
                                >
                                    <FaSearch />
                                </button>
                            </form>
                        </div>

                        <button
                            className="md:hidden p-2 rounded-full hover:bg-blue-600 focus:outline-none"
                            onClick={toggleMobileSearch}
                        >
                            {showMobileSearch ? <FaTimes /> : <FaSearch />}
                        </button>

                        <div className="flex items-center gap-3">
                            {!user && (
                                <>
                                    <Link to="/auth/login" className={`hidden sm:inline-block text-sm font-medium transition-colors ${isScrolled ? "text-blue-700 hover:text-blue-500" : "text-white hover:text-blue-200"}`}>
                                        Login
                                    </Link>
                                    <Link to="/auth/register" className={`text-sm font-medium px-4 py-1.5 rounded-md transition-colors ${isScrolled ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-white hover:bg-blue-100 text-blue-700"}`}>
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
