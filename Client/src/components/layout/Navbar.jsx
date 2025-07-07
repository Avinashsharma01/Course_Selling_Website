import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-800 text-white shadow-md px-8 py-4">
      <div className="flex justify-between items-center">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-extrabold tracking-wide text-green-300">
          <Link to="/">CourseSelling</Link>
        </h1>

        {/* Menu Links */}
        <ul className="flex items-center gap-6 text-sm font-medium">
          <li>
            <Link to="/courses" className="hover:text-green-400 transition-colors duration-200">
              Courses
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-green-400 transition-colors duration-200">
              Contact
            </Link>
          </li>

          {user?.isAdmin && (
            <li>
              <Link to="/admin/courses" className="hover:text-green-400 transition-colors duration-200">
                Admin
              </Link>
            </li>
          )}

          {user ? (
            <>
              <li>
                <Link to="/dashboard" className="hover:text-green-400 transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-white transition-all duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/register"
                  className="px-3 py-1 bg-green-500 hover:bg-green-600 rounded text-white transition-all duration-200"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="px-3 py-1 border border-green-400 hover:bg-green-500 hover:text-white rounded transition-all duration-200"
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
