import { useState } from 'react';

const initialCourses = [
  {
    id: 1,
    title: 'React for Beginners',
    instructor: 'John Doe',
    price: '₹999',
  },
  {
    id: 2,
    title: 'Node.js API Mastery',
    instructor: 'Jane Smith',
    price: '₹1299',
  },
];

const AdminCourses = () => {
  const [courses, setCourses] = useState(initialCourses);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (confirmDelete) {
      setCourses((prev) => prev.filter((course) => course.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">🎓 Admin - Manage Courses</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-md shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Instructor</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b">
                <td className="py-3 px-6">{course.title}</td>
                <td className="py-3 px-6">{course.instructor}</td>
                <td className="py-3 px-6">{course.price}</td>
                <td className="py-3 px-6 text-center space-x-2">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Course Button */}
      <div className="mt-6 text-right">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold">
          ➕ Add New Course
        </button>
      </div>
    </div>
  );
};

export default AdminCourses;
