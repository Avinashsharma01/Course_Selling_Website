import loginImage from "../../assets/react.svg"; // Use any image you like
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

const Login = () => {
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

            await login(credentials, false); // false for user login

            showToast("Successfully logged in", "success");
            navigate("/dashboard");
        } catch (error) {
            showToast(
                typeof error === "string"
                    ? error
                    : "Invalid credentials. Please try again.",
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
                <div className="hidden md:flex items-center justify-center bg-blue-100">
                    <img
                        src={loginImage}
                        alt="Login Visual"
                        className="w-3/4"
                    />
                </div>

                {/* Right: Login Form */}
                <div className="p-8 sm:p-12">
                    <h2 className="text-3xl font-bold text-blue-700 mb-6">
                        User Login
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Please enter your credentials to login
                    </p>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full font-semibold py-2 rounded-lg transition duration-200 
                                bg-blue-600 hover:bg-blue-700 text-white
                                ${
                                    isLoading
                                        ? "opacity-70 cursor-not-allowed"
                                        : ""
                                }
                            `}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <div className="mt-6 flex flex-col space-y-2">
                        <p className="text-sm text-gray-500">
                            Don't have an account?{" "}
                            <Link
                                to="/auth/register"
                                className="text-blue-600 hover:underline"
                            >
                                Register here
                            </Link>
                        </p>
                        <p className="text-sm text-gray-500">
                            <Link
                                to="/auth/admin/login"
                                className="text-blue-600 hover:underline"
                            >
                                Login as Admin
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
