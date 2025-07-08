// src/pages/courses/CourseDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { dummyCourses } from '../../api/dummyCourses';

const CourseDetail = () => {
  const { id } = useParams();
  const course = dummyCourses.find(c => c.id.toString() === id);

  if (!course) return <p className="text-center text-red-600">Course not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-600 mb-2">Instructor: {course.instructor}</p>
      <p className="text-gray-600 mb-2">Level: {course.level}</p>
      <p className="text-gray-600 mb-2">Duration: {course.duration}</p>
      <p className="text-green-600 font-semibold mb-4">₹{course.price}</p>
      <div className="bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Course Description</h2>
        <p className="text-gray-800">{course.description}</p>
      </div>

      <div className="mt-6">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseDetail;
