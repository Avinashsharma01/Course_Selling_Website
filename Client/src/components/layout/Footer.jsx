import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-10 ">
      <div className="max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-3">
        
        {/* 🧭 Branding */}
        <div>
          <h3 className="text-2xl font-bold mb-2 text-green-300">CourseSelling</h3>
          <p className="text-sm text-blue-100">
            Empower your career with high-quality, affordable courses.
          </p>
        </div>

       
        <div>
          <h4 className="text-lg font-semibold mb-3 text-green-200">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-green-300 transition">Home</Link></li>
            <li><Link to="/courses" className="hover:text-green-300 transition">Courses</Link></li>
            <li><Link to="/contact" className="hover:text-green-300 transition">Contact</Link></li>
            <li><Link to="/login" className="hover:text-green-300 transition">Login</Link></li>
            <li><Link to="/register" className="hover:text-green-300 transition">Register</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-green-300 transition">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-3 text-green-200">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@courseselling.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 9876543210
            </li>
            <li className="flex items-center gap-3 mt-3">
              <Facebook className="hover:text-green-400 cursor-pointer" size={20} />
              <Instagram className="hover:text-green-400 cursor-pointer" size={20} />
              <Twitter className="hover:text-green-400 cursor-pointer" size={20} />
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm mt-10 text-blue-200">
        © {new Date().getFullYear()} CourseSelling. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
