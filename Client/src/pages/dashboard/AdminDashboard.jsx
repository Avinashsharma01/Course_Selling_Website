import { useState } from 'react';

const AdminDashboard = () => {
  // Dummy Course Data
  const [courses, setCourses] = useState([
    { id: 1, title: 'React Basics', instructor: 'John', enrolled: 150 },
    { id: 2, title: 'Cyber Security', instructor: 'Ishika', enrolled: 75 },
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: 'Ankit', email: 'ankit@gmail.com' },
    { id: 2, name: 'Divya', email: 'divya@gmail.com' },
  ]);

  const [newCourse, setNewCourse] = useState({ title: '', instructor: '' });

  // Handle adding a new course
  const handleAddCourse = () => {
    if (newCourse.title && newCourse.instructor) {
      const newId = courses.length + 1;
      setCourses([...courses, { id: newId, ...newCourse, enrolled: 0 }]);
      setNewCourse({ title: '', instructor: '' });
    }
  };

  // Handle delete course
  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  // Handle delete user
  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Admin Dashboard</h1>

      {/* COURSES SECTION */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Manage Courses</h2>

        {/* Add New Course */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Course Title"
            className="border px-3 py-2 rounded w-full sm:w-1/3"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Instructor"
            className="border px-3 py-2 rounded w-full sm:w-1/3"
            value={newCourse.instructor}
            onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
          />
          <button
            onClick={handleAddCourse}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Course
          </button>
        </div>

        {/* Course Table */}
        <table className="w-full table-auto border-t text-sm">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-2">#</th>
              <th className="p-2">Title</th>
              <th className="p-2">Instructor</th>
              <th className="p-2">Enrolled</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{course.id}</td>
                <td className="p-2">{course.title}</td>
                <td className="p-2">{course.instructor}</td>
                <td className="p-2">{course.enrolled}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* USERS SECTION */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Manage Users</h2>
        <table className="w-full table-auto border-t text-sm">
          <thead>
            <tr className="bg-blue-100 text-left">
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
