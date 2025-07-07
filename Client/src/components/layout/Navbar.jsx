import { Link } from 'react-router-dom';
import { FaChevronDown, FaSearch, FaUserCircle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Left: Logo & Explore */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-2xl font-extrabold text-blue-700 tracking-wide">
            CourseSelling
          </Link>

          <button className="flex items-center gap-1 text-sm font-medium px-3 py-1 border rounded hover:bg-gray-100 transition">
            Explore <FaChevronDown size={12} />
          </button>
        </div>

        {/* Middle: Search */}
        <div className="flex-1 px-8 max-w-xl hidden md:flex">
          <div className="flex w-full items-center border rounded-full overflow-hidden shadow-sm">
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="w-full px-4 py-2 text-sm outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full m-1 transition">
              <FaSearch size={14} />
            </button>
          </div>
        </div>

        {/* Right: Links + Auth */}
        <div className="flex items-center gap-5 text-sm font-medium text-gray-700">
          <Link to="/courses" className="hover:text-blue-600 transition">
            Courses
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-600 transition hidden sm:inline">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md transition"
              >
                Logout
              </button>
              <FaUserCircle size={20} className="text-blue-600" />
            </>
          ) : (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">
                Log In
              </Link>
              <Link
                to="/register"
                className="border border-blue-500 text-blue-700 font-semibold px-4 py-1 rounded-md hover:bg-blue-50 transition"
              >
                Join for Free
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
