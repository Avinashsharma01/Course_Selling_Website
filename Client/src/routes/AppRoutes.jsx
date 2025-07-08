import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

import Home from '../pages/home/Home';
import Courses from '../pages/courses/Courses';
import CourseDetail from '../pages/courses/CourseDetail';
import Dashboard from '../pages/dashboard/Dashboard';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import AnimatedCourses from '../pages/courses/AnimatedCourses';

import Contact from '../pages/contact/Contact';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import NotFound from '../pages/notfound/NotFound';



const AppRoutes = () => {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="animated-courses" element={<AnimatedCourses />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
