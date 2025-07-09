import registerImage from "../../assets/react.svg"; // or reuse login image
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

const Register = () => {
    const { register } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        interests: [], // For user registration
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInterestChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            interests: checked
                ? [...prev.interests, value]
                : prev.interests.filter((interest) => interest !== value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await register(formData, false); // false for user registration

            showToast(
                `Registration successful! Welcome ${formData.name}!`,
                "success"
            );

            navigate("/dashboard");
        } catch (error) {
            showToast(
                typeof error === "string"
                    ? error
                    : "Registration failed. Please try again with different credentials.",
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
                        src={registerImage}
                        alt="Register Visual"
                        className="w-3/4"
                    />
                </div>

                {/* Right: Register Form */}
                <div className="p-8 sm:p-12">
                    <h2 className="text-3xl font-bold text-blue-700 mb-6">
                        Create User Account
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Please fill the form to register
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
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Interests
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    "Web Development",
                                    "Data Science",
                                    "Machine Learning",
                                    "Mobile Development",
                                    "DevOps",
                                    "Cloud Computing",
                                ].map((interest) => (
                                    <div
                                        className="flex items-center"
                                        key={interest}
                                    >
                                        <input
                                            type="checkbox"
                                            id={interest}
                                            name="interests"
                                            value={interest}
                                            checked={formData.interests.includes(
                                                interest
                                            )}
                                            onChange={handleInterestChange}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label
                                            htmlFor={interest}
                                            className="ml-2 text-sm text-gray-700"
                                        >
                                            {interest}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 
                                ${
                                    isLoading
                                        ? "opacity-70 cursor-not-allowed"
                                        : ""
                                }
                            `}
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <div className="mt-6 flex flex-col space-y-2">
                        <p className="text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link
                                to="/auth/login"
                                className="text-blue-600 hover:underline"
                            >
                                Login here
                            </Link>
                        </p>
                        <p className="text-sm text-gray-500">
                            <Link
                                to="/auth/admin/register"
                                className="text-blue-600 hover:underline"
                            >
                                Register as Admin instead
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
