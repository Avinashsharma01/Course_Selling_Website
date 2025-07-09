import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
    // Format currency with locale (adjust as needed)
    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(price);
    };

    // Truncate description to max length
    const truncateText = (text, maxLength = 80) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    // Capitalize first letter
    const capitalize = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg p-4 flex flex-col justify-between h-full">
            <img
                src={course.thumbnail || "https://via.placeholder.com/300x200"}
                alt={course.title}
                className="w-full h-40 object-cover rounded-md mb-4"
            />

            <div className="flex-1">
                <div className="flex items-center mb-1">
                    <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full 
            ${course.level === "beginner" ? "bg-green-100 text-green-800" : ""}
            ${
                course.level === "intermediate"
                    ? "bg-yellow-100 text-yellow-800"
                    : ""
            }
            ${course.level === "advanced" ? "bg-red-100 text-red-800" : ""}
          `}
                    >
                        {capitalize(course.level || "beginner")}
                    </span>

                    {course.rating > 0 && (
                        <div className="ml-auto flex items-center text-yellow-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            <span className="text-xs font-semibold ml-1">
                                {course.rating.toFixed(1)}
                            </span>
                        </div>
                    )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {course.title}
                </h3>
                <p className="text-gray-700 text-sm mb-3">
                    {truncateText(course.description)}
                </p>

                <div className="flex items-center mb-2">
                    <span className="text-sm text-gray-600">
                        {course.instructor}
                    </span>
                    {course.duration && (
                        <span className="text-xs text-gray-500 ml-auto">
                            {course.duration}{" "}
                            {course.duration === 1 ? "hour" : "hours"}
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-blue-600">
                        {formatPrice(course.price)}
                    </p>
                    {course.enrollmentCount > 0 && (
                        <p className="text-xs text-gray-500">
                            {course.enrollmentCount}{" "}
                            {course.enrollmentCount === 1
                                ? "student"
                                : "students"}
                        </p>
                    )}
                </div>
            </div>

            {/* View Details Button */}
            <Link
                to={`/courses/${course._id}`}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded text-center transition duration-300"
            >
                View Details
            </Link>
        </div>
    );
};

export default CourseCard;
