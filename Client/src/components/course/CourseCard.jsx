import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg p-4 flex flex-col justify-between h-full">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-40 object-cover rounded-md mb-4"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{course.title}</h3>
        <p className="text-gray-700 text-sm mb-2">{course.description}</p>
        <p className="text-sm text-gray-500">
          <strong>Instructor:</strong> {course.instructor}
        </p>
        <p className="text-sm text-gray-500">
          <strong>Level:</strong> {course.level}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          <strong>Price:</strong> ₹{course.price}
        </p>
      </div>

      {/* View Details Button */}
      <Link
        to={`/courses/${course.id}`}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded text-center transition duration-300"
      >
        View Details
      </Link>
    </div>
  );
};

export default CourseCard;
