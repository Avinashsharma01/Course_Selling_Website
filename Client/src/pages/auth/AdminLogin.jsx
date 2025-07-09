import loginImage from "../../assets/react.svg";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

const AdminLogin = () => {
    const { login } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    // Form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const credentials = {
                email,
                password,
            };

            await login(credentials, true); // true for admin login

            showToast("Successfully logged in as admin", "success");
            navigate("/admin/dashboard");
        } catch (error) {
            showToast(
                typeof error === "string"
                    ? error
                    : "Invalid admin credentials. Please try again.",
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* Left: Image */}
                <div className="hidden md:flex items-center justify-center bg-purple-100">
                    <img
                        src={loginImage}
                        alt="Admin Login Visual"
                        className="w-3/4"
                    />
                </div>

                {/* Right: Login Form */}
                <div className="p-8 sm:p-12">
                    <h2 className="text-3xl font-bold text-purple-700 mb-6">
                        Admin Login
                    </h2>
                    <p className="text-sm text-gray-600 mb-8">
                        Please sign in with your admin credentials
                    </p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your password"
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200 ${
                                isLoading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        >
                            {isLoading ? "Signing in..." : "Sign In as Admin"}
                        </button>
                    </form>

                    <div className="mt-6 text-center space-y-2">
                        <p className="text-sm text-gray-500">
                            Don't have an admin account?{" "}
                            <Link
                                to="/auth/admin/register"
                                className="text-purple-600 hover:underline"
                            >
                                Register here
                            </Link>
                        </p>
                        <p className="text-sm text-gray-500">
                            <Link
                                to="/auth/login"
                                className="text-purple-600 hover:underline"
                            >
                                User Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
