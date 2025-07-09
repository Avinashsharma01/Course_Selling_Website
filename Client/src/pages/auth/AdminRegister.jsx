import registerImage from "../../assets/react.svg";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

const AdminRegister = () => {
    const { register } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        position: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await register(formData, true); // true for admin registration

            showToast(
                `Registration successful! Welcome ${formData.name}!`,
                "success"
            );

            navigate("/admin/dashboard");
        } catch (error) {
            showToast(
                typeof error === "string"
                    ? error
                    : "Admin registration failed. Please try again with different credentials.",
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
                        src={registerImage}
                        alt="Register Visual"
                        className="w-3/4"
                    />
                </div>

                {/* Right: Register Form */}
                <div className="p-8 sm:p-12">
                    <h2 className="text-3xl font-bold text-purple-700 mb-6">
                        Admin Registration
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Register as an admin/instructor
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                placeholder="Your name"
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                placeholder="you@example.com"
                                required
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                placeholder="Create a password (min 6 characters)"
                                required
                                minLength="6"
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                placeholder="Your phone number"
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Position
                            </label>
                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                placeholder="e.g., Senior Instructor"
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200 
                                ${
                                    isLoading
                                        ? "opacity-70 cursor-not-allowed"
                                        : ""
                                }
                            `}
                        >
                            {isLoading ? "Registering..." : "Register as Admin"}
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link
                            to="/auth/admin/login"
                            className="text-purple-600 hover:underline"
                        >
                            Login here
                        </Link>
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                        <Link
                            to="/auth/register"
                            className="text-purple-600 hover:underline"
                        >
                            Register as User instead
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
