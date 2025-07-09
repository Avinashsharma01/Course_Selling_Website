import registerImage from "../../assets/5191079.jpg";

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
        interests: [],
        profilePicture: null, // ✅ New field
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
                : prev.interests.filter((i) => i !== value),
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, profilePicture: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // ✅ Create formData for image upload
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("password", formData.password);
            data.append("phoneNumber", formData.phoneNumber);
            formData.interests.forEach((i) => data.append("interests[]", i));
            if (formData.profilePicture) {
                data.append("profilePicture", formData.profilePicture);
            }

            await register(data, false); // Your backend must support FormData

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
                <div className="hidden md:flex items-center justify-center bg-blue-100 p-4">
  <img
    src={registerImage}
    alt="Register"
    className="h-[100%] w-full object-contain"
  />
</div>


                {/* Right Side */}
                <div className="p-8 sm:p-12">
                    <h2 className="text-3xl font-bold text-blue-700 mb-6">
                        Create User Account
                    </h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Please fill the form to register
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                required
                                onChange={handleChange}
                                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                                placeholder="Your name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                required
                                onChange={handleChange}
                                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                                placeholder="you@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                required
                                minLength="6"
                                onChange={handleChange}
                                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                                placeholder="Minimum 6 characters"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                                placeholder="Your phone number"
                            />
                        </div>

                        {/* ✅ Profile Picture */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Profile Picture
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>

                        {/* Interests */}
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
                                    <div key={interest} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value={interest}
                                            checked={formData.interests.includes(interest)}
                                            onChange={handleInterestChange}
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 text-sm text-gray-700">
                                            {interest}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 ${
                                isLoading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </button>
                    </form>

                    <div className="mt-6 text-sm text-gray-500 space-y-2">
                        <p>
                            Already have an account?{" "}
                            <Link to="/auth/login" className="text-blue-600 hover:underline">
                                Login here
                            </Link>
                        </p>
                        <p>
                            <Link to="/auth/admin/register" className="text-blue-600 hover:underline">
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
