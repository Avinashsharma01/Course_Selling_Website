import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="w-full h-full p-4 rounded-xl bg-white shadow-lg flex flex-col justify-between cursor-pointer">
      <div>
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-24 object-cover rounded-lg mb-2"
        />
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="text-green-600 font-bold mt-1">₹{course.price}</p>
      </div>
      <Link
        to={`/courses/${course.id}`}
        className="mt-3 bg-blue-600 text-white text-sm py-2 rounded text-center hover:bg-blue-700 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default CourseCard;
