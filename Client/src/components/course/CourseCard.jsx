import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg">
      <img src={course.image} alt={course.title} className="h-40 w-full object-cover rounded mb-4" />
      <h3 className="text-lg font-bold">{course.title}</h3>
      <p className="text-sm text-gray-600">{course.instructor}</p>
      <p className="text-green-600 font-semibold mt-2">₹{course.price}</p>
      <Link to={`/courses/${course.id}`} className="block mt-4 text-center bg-blue-600 text-white py-2 rounded">
        View Details
      </Link>
    </div>
  );
};

export default CourseCard;
