import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

import Home from '../pages/home/Home';
// import Courses from '../pages/courses/Courses';              // 🟩 Friend
// import CourseDetail from '../pages/courses/CourseDetail';    // 🟩 Friend
import Contact from '../pages/contact/Contact';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
// import Dashboard from '../pages/dashboard/Dashboard';        // 🟩 Friend
// import AdminCourses from '../pages/dashboard/AdminCourses';  // 🟩 Friend
import NotFound from '../pages/notfound/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        {/* <Route path="courses" element={<Courses />} /> */}
        {/* <Route path="courses/:id" element={<CourseDetail />} /> */}
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        {/* <Route path="admin/courses" element={<AdminCourses />} /> */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
