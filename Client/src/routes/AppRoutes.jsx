import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Pages
import Home from "../pages/home/Home";
import Courses from "../pages/courses/Courses";
import CourseDetail from "../pages/courses/CourseDetail";
import Dashboard from "../pages/dashboard/Dashboard";
import AdminDashboard from "../pages/dashboard/Admin/AdminDashboard";
import AdminCreateCourse from "../pages/dashboard/Admin/AdminCreateCourse";
import AdminEditCourse from "../pages/dashboard/Admin/AdminEditCourse";
import AnimatedCourses from "../pages/courses/AnimatedCourses";
import PrivacyPolicy from "../pages/privacyPolicy/privacy-Policy";
import About from "../pages/about/AboutUs";
import Contact from "../pages/contact/Contact";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminLogin from "../pages/auth/AdminLogin";
import AdminRegister from "../pages/auth/AdminRegister";
import NotFound from "../pages/notfound/NotFound";
import Profile from "../pages/profile/Profile";

// Auth guards
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AdminRoute from "../components/auth/AdminRoute";

const AppRoutes = () => {
    return (
        <Routes>
            {/* All routes wrapped in MainLayout to display header and footer on every page */}
            <Route element={<MainLayout />}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="courses" element={<Courses />} />
                <Route path="courses/:id" element={<CourseDetail />} />
                <Route path="animated-courses" element={<AnimatedCourses />} />
                <Route path="contact" element={<Contact />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="about" element={<About />} />

                {/* Protected User Routes */}
                <Route
                    path="dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                {/* Protected Admin Routes */}
                <Route
                    path="admin/dashboard"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />
                <Route
                    path="courses/admin/create"
                    element={
                        <AdminRoute>
                            <AdminCreateCourse />
                        </AdminRoute>
                    }
                />
                <Route
                    path="courses/admin/edit/:id"
                    element={
                        <AdminRoute>
                            <AdminEditCourse />
                        </AdminRoute>
                    }
                />

                {/* User Auth Routes */}
                <Route path="auth/login" element={<Login />} />
                <Route path="auth/register" element={<Register />} />

                {/* Admin Auth Routes */}
                <Route path="auth/admin/login" element={<AdminLogin />} />
                <Route path="auth/admin/register" element={<AdminRegister />} />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
