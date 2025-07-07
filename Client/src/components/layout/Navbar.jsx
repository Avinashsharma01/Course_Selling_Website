import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-blue-700 text-white">
      <h1 className="text-xl font-bold">
        <Link to="/">CourseSelling</Link>
      </h1>
      <ul className="flex gap-5 items-center">
        <li><Link to="/courses" className="hover:underline">Courses</Link></li>
        <li><Link to="/contact" className="hover:underline">Contact</Link></li>

        {user?.isAdmin && (
          <li><Link to="/admin/courses" className="hover:underline">Admin</Link></li>
        )}

        {user ? (
          <>
            <li><Link to="/dashboard" className="hover:underline">Dashboard</Link></li>
            <li><button onClick={logout} className="hover:text-gray-300">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/register" className="hover:underline">Register</Link></li>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
