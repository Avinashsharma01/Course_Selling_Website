import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    FaClock,
    FaChartLine,
    FaUser,
    FaCheckCircle,
    FaStar,
    FaBook,
} from "react-icons/fa";
import EnrollButton from "../../components/course/EnrollButton";
import courseService from "../../api/services/courseService";
import Loader from "../../components/common/Loader";
import { useToast } from "../../hooks/useToast";
import { useCourses } from "../../hooks/useCourses";
import { useAuth } from "../../hooks/useAuth";

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const { showToast } = useToast();
    const { user } = useAuth();
    const { enrolledCourses } = useCourses();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                setLoading(true);
                const courseData = await courseService.getCourseById(id);
                setCourse(courseData);
            } catch (error) {
                console.error("Failed to fetch course:", error);
                showToast("Failed to load course details", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id, showToast]);

    // Check if user is already enrolled in this course
    useEffect(() => {
        if (user && enrolledCourses && enrolledCourses.length > 0 && course) {
            console.log("Checking if enrolled:", {
                enrolledCourses,
                courseId: course._id,
            });

            // Check if the course is directly in enrolledCourses or within course property
            const alreadyEnrolled = enrolledCourses.some((enrollment) => {
                // If the enrollment object has a course property, check that
                if (enrollment.course) {
                    return (
                        enrollment.course._id === course._id ||
                        enrollment.course.id === course._id
                    );
                }
                // Otherwise check the enrollment object itself
                return (
                    enrollment._id === course._id ||
                    enrollment.id === course._id
                );
            });

            console.log("Enrollment status:", alreadyEnrolled);
            setIsEnrolled(alreadyEnrolled);
        }
    }, [user, enrolledCourses, course]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    if (!course) {
        return (
            <p className="text-center text-red-600 text-xl mt-32">
                🚫 Course not found.
            </p>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
            {/* Top Banner */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex items-center px-6 md:px-20">
                    <div className="text-white max-w-3xl">
                        <h1 className="text-3xl md:text-5xl font-extrabold mb-4">
                            {course.title}
                        </h1>
                        <p className="text-lg text-gray-100 mb-6">
                            {course.description}
                        </p>

                        <div className="flex gap-6 flex-wrap text-sm text-white/90">
                            <div className="flex items-center gap-2">
                                <FaUser /> {course.instructor}
                            </div>
                            <div className="flex items-center gap-2">
                                <FaChartLine /> {course.level}
                            </div>
                            <div className="flex items-center gap-2">
                                <FaClock /> {course.duration} hrs
                            </div>
                            <div className="flex items-center gap-2">
                                <FaStar /> 4.8 Rating
                            </div>
                            <div className="flex items-center gap-2">
                                <FaBook /> {course.category}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body Content */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">
                {/* Left Info */}
                <div className="md:col-span-2 space-y-8">
                    {/* What You'll Learn */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
                        <h2 className="text-2xl font-bold text-blue-700 mb-4">
                            What You'll Learn
                        </h2>
                        <ul className="grid sm:grid-cols-2 gap-4 list-disc list-inside text-gray-700 text-sm">
                            <li>Build real-world projects</li>
                            <li>Master {course.category} fundamentals</li>
                            <li>Understand modern tools and frameworks</li>
                            <li>Improve problem-solving skills</li>
                            <li>Gain industry-recognized certificate</li>
                            <li>Work on hands-on assignments</li>
                        </ul>
                    </div>

                    {/* Topics Covered */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                        <h2 className="text-2xl font-bold text-green-700 mb-4">
                            Course Topics
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-3 text-gray-800 text-sm">
                            {(
                                course.topics || [
                                    "Variables",
                                    "Functions",
                                    "Projects",
                                    "Tools",
                                    "APIs",
                                    "Deployment",
                                ]
                            ).map((topic, idx) => (
                                <div
                                    key={idx}
                                    className="bg-blue-100 rounded px-3 py-2 shadow-sm"
                                >
                                    ✅ {topic}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-400 flex flex-col justify-between h-fit sticky top-28">
                    <div>
                        <h3 className="text-3xl font-bold text-green-600 mb-2">
                            ₹{course.price}
                        </h3>
                        <p className="text-gray-500 text-sm mb-6">
                            One-time payment. No hidden fees.
                        </p>

                        <EnrollButton
                            courseId={course._id}
                            alreadyEnrolled={isEnrolled}
                        />

                        {isEnrolled && (
                            <div className="mt-3">
                                <button
                                    className="w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold py-3 rounded-lg shadow"
                                    onClick={() => {
                                        showToast(
                                            "Accessing course content...",
                                            "info"
                                        );
                                        // Here you would navigate to the course content/learning page
                                        // For now we'll just scroll to the course details
                                        window.scrollTo({
                                            top: 300,
                                            behavior: "smooth",
                                        });
                                    }}
                                >
                                    Start Learning
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 text-sm text-gray-600 space-y-2">
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-600" />
                            Lifetime Access
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-600" />
                            Certificate of Completion
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-600" />
                            24/7 Community Support
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
