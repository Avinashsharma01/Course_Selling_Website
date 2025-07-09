import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../../hooks/useCourses";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

const EnrollButton = ({ courseId, alreadyEnrolled = false }) => {
    const [isEnrolling, setIsEnrolling] = useState(false);
    const { enrollInCourse } = useCourses();
    const { user } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleEnroll = async () => {
        if (!user) {
            showToast("Please log in to enroll in courses", "info");
            navigate("/login");
            return;
        }

        if (alreadyEnrolled) {
            showToast("You are already enrolled in this course", "info");
            // Navigate directly to the course page instead of dashboard
            navigate(`/courses/${courseId}`);
            return;
        }

        setIsEnrolling(true);
        try {
            await enrollInCourse(courseId);
            showToast("Successfully enrolled in course!", "success");
            // Navigate directly to the course page instead of dashboard
            navigate(`/courses/${courseId}`);
        } catch (error) {
            // Check if it's the "already enrolled" error
            if (
                error?.response?.status === 400 &&
                error?.response?.data?.message ===
                    "Already enrolled in this course"
            ) {
                showToast("You are already enrolled in this course", "info");
                // Navigate to the course page
                navigate(`/courses/${courseId}`);
            } else {
                showToast(
                    typeof error === "string"
                        ? error
                        : error?.response?.data?.message ||
                              "Failed to enroll in course. Please try again.",
                    "error"
                );
            }
        } finally {
            setIsEnrolling(false);
        }
    };

    return (
        <button
            onClick={handleEnroll}
            disabled={isEnrolling || alreadyEnrolled}
            className={`px-6 py-3 rounded-lg font-semibold text-white transition duration-200
        ${
            alreadyEnrolled
                ? "bg-gray-500 cursor-default"
                : isEnrolling
                ? "bg-green-500 opacity-70 cursor-wait"
                : "bg-green-600 hover:bg-green-700 hover:shadow-md"
        }
      `}
        >
            {alreadyEnrolled
                ? "Already Enrolled"
                : isEnrolling
                ? "Enrolling..."
                : "Enroll Now"}
        </button>
    );
};

export default EnrollButton;
