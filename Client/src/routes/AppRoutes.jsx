import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

import Home from '../pages/home/Home';                     // ✅ Done
// import Courses from '../pages/courses/Courses';            // ✅ Done
// import CourseDetail from '../pages/courses/CourseDetail'; // ❌ Not built yet
import Dashboard from '../pages/dashboard/Dashboard';      // ✅ Done
// import AdminCourses from '../pages/dashboard/AdminCourses';// ✅ Just added base
import Contact from '../pages/contact/Contact';            // ✅ Done
import Login from '../pages/auth/Login';                   // ✅ Done
import Register from '../pages/auth/Register';             // ✅ Done
// import NotFound from '../pages/notfound/NotFound';         // ❌ Not yet created

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />                 {/* ✅ Home page */}
        {/* <Route path="courses" element={<Courses />} /> */}
        {/* <Route path="courses/:id" element={<CourseDetail />} /> */}  {/* ❌ Later */}
        <Route path="dashboard" element={<Dashboard />} />
        {/* <Route path="admin/courses" element={<AdminCourses />} /> */}
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="*" element={<NotFound />} /> */}       {/* ❌ Not yet */}
    </Routes>
  );
};

export default AppRoutes;
