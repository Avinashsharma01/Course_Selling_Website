import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaChevronDown, FaSearch, FaUserCircle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showExplore, setShowExplore] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const dummyCategories = ['Web Development', 'Data Science', 'Cyber Security', 'AI & ML'];

  // Close dropdowns on route change
  useEffect(() => {
    setShowExplore(false);
    setShowUserMenu(false);
  }, [location.pathname]);

  return (
    <nav className="fixed  top-0 left-0 w-full bg-blue-700 shadow-lg border-b border-blue-800 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex flex-row items-center justify-between">
        
        {/* Left: Logo & Explore */}
        <div className="flex flex-row items-center gap-6 relative">
          <Link to="/" className="text-2xl font-extrabold text-white tracking-wide drop-shadow">
            CourseSelling
          </Link>

          {/* Explore Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExplore((prev) => !prev)}
              className="flex items-center gap-1 text-sm font-medium px-3 py-1 border border-blue-400 rounded bg-blue-600 text-white hover:bg-blue-800 hover:border-blue-300 transition"
            >
              Explore <FaChevronDown size={12} />
            </button>

            {showExplore && (
              <div className="absolute top-10 left-0 bg-white border border-blue-200 rounded shadow-md w-48 z-50">
                {dummyCategories.map((category, i) => (
                  <Link
                    key={i}
                    to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block px-4 py-2 hover:bg-blue-50 text-sm text-blue-700 font-semibold"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Middle: Search Bar */}
        <div className="flex-1 px-8 max-w-xl hidden md:flex justify-center">
          <div className="flex w-full items-center border border-blue-300 rounded-full overflow-hidden shadow-sm bg-white">
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="w-full px-4 py-2 text-sm outline-none text-blue-900 bg-white placeholder-blue-400"
            />
            <button className="bg-blue-600 hover:bg-blue-800 text-white p-2 rounded-full m-1 transition">
              <FaSearch size={14} />
            </button>
          </div>
        </div>

        {/* Right: Links & Auth */}
        <div className="flex flex-row items-center gap-5 text-sm font-semibold text-white relative">
          <Link to="/courses" className="hover:text-yellow-300 transition">
            Courses
          </Link>
          <Link to="/contact" className="hover:text-yellow-300 transition">
            Contact
          </Link>

          {/* Admin-only Link */}
          {user?.role === 'admin' && (
            <Link to="/admin/dashboard" className="hover:text-yellow-300 transition hidden sm:inline">
              Admin
            </Link>
          )}

          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-yellow-300 transition hidden sm:inline">
                Dashboard
              </Link>

              {/* User icon with dropdown */}
              <div className="relative">
                <FaUserCircle
                  size={22}
                  className="text-yellow-300 cursor-pointer drop-shadow"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                />

                {showUserMenu && (
                  <div className="absolute right-0 top-8 bg-white border border-blue-200 rounded shadow-md w-40 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-blue-50 text-sm text-blue-700 font-semibold"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:bg-blue-50 text-sm text-blue-700 font-semibold"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-blue-50 text-sm font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-yellow-300 font-bold hover:underline"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="border border-yellow-300 text-yellow-300 font-bold px-4 py-1 rounded-md hover:bg-yellow-100 hover:text-blue-800 transition"
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
