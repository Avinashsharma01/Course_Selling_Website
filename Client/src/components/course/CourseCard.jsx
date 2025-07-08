// src/components/course/CourseCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm">
      <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p className="text-green-600 font-medium">₹{course.price}</p>
        <button
          onClick={handleViewDetails}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
