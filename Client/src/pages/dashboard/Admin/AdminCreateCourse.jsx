import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaImage, FaPlus, FaTimes } from "react-icons/fa";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import courseService from "../../../api/services/courseService";
import Loader from "../../../components/common/Loader";

const AdminCreateCourse = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { showToast } = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        price: 0,
        instructor: user?.name || "",
        duration: 0,
        level: "beginner",
        category: "",
        thumbnail:
            "https://images.unsplash.com/photo-1751837184233-b26fa8444e4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
        topics: [],
    });

    const [categories, setCategories] = useState([]);
    const [newTopic, setNewTopic] = useState("");
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        // Fetch categories when component mounts
        const loadCategories = async () => {
            try {
                console.log("Fetching categories...");
                const response = await courseService.getCategories();
                console.log("Categories API response:", response);

                // The response is already the data due to axios interceptor
                if (response && Array.isArray(response)) {
                    setCategories(response);
                    console.log("Categories set:", response);
                } else {
                    console.error("Invalid response format:", response);
                    // Default categories in case API returns empty or invalid response
                    setCategories([
                        "Web Development",
                        "Mobile Development",
                        "Data Science",
                        "Design",
                        "Business",
                        "Marketing",
                    ]);
                }
            } catch (error) {
                showToast("Failed to load categories", "error");
                console.error("Error fetching categories:", error);
            }
        };

        loadCategories();
    }, [showToast]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "price" || name === "duration") {
            setCourseData((prev) => ({
                ...prev,
                [name]: parseFloat(value) || 0,
            }));
        } else {
            setCourseData((prev) => ({ ...prev, [name]: value }));
        }

        // Clear error for this field when user makes changes
        if (formErrors[name]) {
            setFormErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleTopicAdd = () => {
        if (newTopic.trim() === "") return;

        setCourseData((prev) => ({
            ...prev,
            topics: [...prev.topics, newTopic.trim()],
        }));
        setNewTopic("");
    };

    const handleTopicRemove = (index) => {
        setCourseData((prev) => ({
            ...prev,
            topics: prev.topics.filter((_, i) => i !== index),
        }));
    };

    const validateForm = () => {
        const errors = {};

        if (!courseData.title.trim()) errors.title = "Title is required";
        if (!courseData.description.trim())
            errors.description = "Description is required";
        if (courseData.price < 0) errors.price = "Price cannot be negative";
        if (!courseData.instructor.trim())
            errors.instructor = "Instructor name is required";
        if (courseData.duration <= 0)
            errors.duration = "Duration must be greater than 0";
        if (!courseData.category) errors.category = "Category is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showToast("Please fix the form errors", "error");
            return;
        }

        setIsLoading(true);
        try {
            const response = await courseService.addCourse(courseData);
            console.log("Course creation response:", response);

            // Show success message
            showToast("Course created successfully!", "success");

            // Navigate to admin dashboard and let it handle the refresh
            navigate("/admin/dashboard");
        } catch (error) {
            console.error("Error creating course:", error);

            // Better error handling
            let errorMessage = "Failed to create course";

            if (error?.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error?.message) {
                errorMessage = error.message;
            } else if (typeof error === "string") {
                errorMessage = error;
            }

            showToast(errorMessage, "error");
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    // Debug information
    console.log("Current categories state:", categories);

    return (
        <div className="min-h-screen bg-gray-100 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                        <FaArrowLeft className="mr-2" />
                        <span>Back to Dashboard</span>
                    </button>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        Create New Course
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Title */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Course Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={courseData.title}
                                    onChange={handleChange}
                                    placeholder="e.g., Complete React Developer Course"
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                        formErrors.title
                                            ? "border-red-500 focus:ring-red-300"
                                            : "focus:ring-blue-300 border-gray-300"
                                    }`}
                                />
                                {formErrors.title && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {formErrors.title}
                                    </p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={courseData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Provide a detailed description of the course"
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                        formErrors.description
                                            ? "border-red-500 focus:ring-red-300"
                                            : "focus:ring-blue-300 border-gray-300"
                                    }`}
                                ></textarea>
                                {formErrors.description && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {formErrors.description}
                                    </p>
                                )}
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price (₹)
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={courseData.price}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                        formErrors.price
                                            ? "border-red-500 focus:ring-red-300"
                                            : "focus:ring-blue-300 border-gray-300"
                                    }`}
                                />
                                {formErrors.price && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {formErrors.price}
                                    </p>
                                )}
                            </div>

                            {/* Instructor */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Instructor
                                </label>
                                <input
                                    type="text"
                                    name="instructor"
                                    value={courseData.instructor}
                                    onChange={handleChange}
                                    placeholder="Your name or the instructor's name"
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                        formErrors.instructor
                                            ? "border-red-500 focus:ring-red-300"
                                            : "focus:ring-blue-300 border-gray-300"
                                    }`}
                                />
                                {formErrors.instructor && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {formErrors.instructor}
                                    </p>
                                )}
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration (hours)
                                </label>
                                <input
                                    type="number"
                                    name="duration"
                                    value={courseData.duration}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.5"
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                        formErrors.duration
                                            ? "border-red-500 focus:ring-red-300"
                                            : "focus:ring-blue-300 border-gray-300"
                                    }`}
                                />
                                {formErrors.duration && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {formErrors.duration}
                                    </p>
                                )}
                            </div>

                            {/* Level */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Level
                                </label>
                                <div className="relative">
                                    <select
                                        name="level"
                                        value={courseData.level}
                                        onChange={handleChange}
                                        className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    >
                                        <option value="beginner">
                                            Beginner
                                        </option>
                                        <option value="intermediate">
                                            Intermediate
                                        </option>
                                        <option value="advanced">
                                            Advanced
                                        </option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        value={courseData.category}
                                        onChange={handleChange}
                                        className={`appearance-none w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                            formErrors.category
                                                ? "border-red-500 focus:ring-red-300"
                                                : "focus:ring-blue-300 border-gray-300"
                                        }`}
                                    >
                                        <option value="">
                                            Select a category
                                        </option>
                                        <option value="Web Development">
                                            Web Development
                                        </option>
                                        <option value="Mobile Development">
                                            Mobile Development
                                        </option>
                                        <option value="Data Science">
                                            Data Science
                                        </option>
                                        <option value="Design">Design</option>
                                        <option value="Business">
                                            Business
                                        </option>
                                        <option value="Marketing">
                                            Marketing
                                        </option>
                                        {/* {categories.length > 0 ? (
                                            categories.map((category) => (
                                                <option
                                                    key={category}
                                                    value={category}
                                                >
                                                    {category}
                                                </option>
                                            ))
                                        ) : (
                                            <>
                                                <option value="Web Development">
                                                    Web Development
                                                </option>
                                                <option value="Mobile Development">
                                                    Mobile Development
                                                </option>
                                                <option value="Data Science">
                                                    Data Science
                                                </option>
                                                <option value="Design">
                                                    Design
                                                </option>
                                                <option value="Business">
                                                    Business
                                                </option>
                                                <option value="Marketing">
                                                    Marketing
                                                </option>
                                            </>
                                        )} */}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                                {formErrors.category && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {formErrors.category}
                                    </p>
                                )}
                            </div>

                            {/* Thumbnail URL */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Thumbnail URL
                                </label>
                                <div className="flex items-start space-x-4">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            name="thumbnail"
                                            value={courseData.thumbnail}
                                            onChange={handleChange}
                                            placeholder="Enter image URL for course thumbnail"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        />
                                    </div>
                                    <div className="w-16 h-16 border border-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                        {courseData.thumbnail ? (
                                            <img
                                                src={courseData.thumbnail}
                                                alt="Thumbnail preview"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src =
                                                        "https://via.placeholder.com/300x200";
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                <FaImage
                                                    className="text-gray-400"
                                                    size={20}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Topics */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Topics Covered
                                </label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={newTopic}
                                        onChange={(e) =>
                                            setNewTopic(e.target.value)
                                        }
                                        placeholder="Enter a topic and click Add"
                                        className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                handleTopicAdd();
                                            }
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleTopicAdd}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none"
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {courseData.topics.map((topic, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded-md"
                                        >
                                            <span className="text-sm">
                                                {topic}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleTopicRemove(index)
                                                }
                                                className="ml-1 text-blue-500 hover:text-blue-700 focus:outline-none"
                                            >
                                                <FaTimes size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    {courseData.topics.length === 0 && (
                                        <span className="text-sm text-gray-500">
                                            No topics added yet
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <Loader size="small" color="white" />
                                        <span className="ml-2">
                                            Creating Course...
                                        </span>
                                    </div>
                                ) : (
                                    "Create Course"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminCreateCourse;
