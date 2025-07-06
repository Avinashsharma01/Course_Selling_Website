import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Courses from '../pages/courses/Courses';
import CourseDetail from '../pages/courses/CourseDetail';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import Contact from '../pages/contact/Contact';
import NotFound from '../pages/notfound/NotFound';




const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      
    </Routes>
      );
};

export default AppRoutes;

