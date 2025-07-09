import loginImage from '../../assets/react.svg'; // Use any image you like
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Login = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleUserLogin = (e) => {
    e.preventDefault();
    login({ name: 'Ishika', email: 'ishika@example.com', role: 'user' });
    navigate('/dashboard');
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    login({ name: 'Admin', email: 'admin@example.com', role: 'admin' });
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left: Image */}
        <div className="hidden md:flex items-center justify-center bg-blue-100">
          <img src={loginImage} alt="Login Visual" className="w-3/4" />
        </div>

        {/* Right: Login Form */}
        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-blue-700 mb-6">Welcome Back</h2>
          <p className="text-sm text-gray-600 mb-6">Please enter your credentials to login</p>

          {/* Login as User */}
          <form onSubmit={handleUserLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Login as User
            </button>
          </form>

          {/* Admin Login Button */}
          <div className="mt-4">
            <button
              onClick={handleAdminLogin}
              className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition duration-200"
            >
              Login as Admin
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
export default Login;
