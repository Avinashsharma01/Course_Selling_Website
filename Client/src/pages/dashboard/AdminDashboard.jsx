// src/pages/dashboard/AdminDashboard.jsx
import React from 'react';
import { FaUsers, FaBook, FaUserShield, FaPlus, FaSearch } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import dummyUsers from '../../api/dummyUsers';
import dummyCourses from '../../api/dummyCourses';

const SidebarItem = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-3 text-gray-700 hover:bg-blue-100 px-4 py-2 rounded-md cursor-pointer transition">
    <Icon className="text-blue-600" />
    <span className="font-medium">{label}</span>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r p-6">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">🛠 Admin Panel</h2>
          <div className="text-gray-500 text-sm">Admin Dashboard</div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">MANAGEMENT</p>
            <SidebarItem icon={FaUsers} label="Manage Users" />
            <SidebarItem icon={FaBook} label="Manage Courses" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">OTHER</p>
            <SidebarItem icon={MdSpaceDashboard} label="Dashboard" />
            <SidebarItem icon={FaUserShield} label="Admin Profile" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-blue-800 mb-1">👋 Welcome, Admin!</h1>
          <p className="text-gray-600">You can manage courses and users from here.</p>
        </div>

        {/* Search & Controls */}
        <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center bg-white px-4 py-2 rounded-md shadow border gap-2">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search users or courses..."
              className="outline-none bg-transparent text-sm text-gray-700 w-60"
            />
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition">
            <FaPlus /> Add Course
          </button>
        </div>

        {/* User Management */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-4">👥 Users</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {dummyUsers.map((user) => (
              <div key={user.id} className="bg-white p-5 rounded-lg shadow border">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full mb-3 mx-auto"
                />
                <h3 className="text-lg font-semibold text-center text-gray-800">{user.name}</h3>
                <p className="text-sm text-center text-gray-500">{user.email}</p>
                <p className="text-sm text-center mt-1 text-blue-600">
                  Enrolled in: <span className="font-semibold">{user.enrolled.join(', ')}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Course Management */}
        <div>
          <h2 className="text-xl font-bold text-blue-700 mb-4">📚 Courses</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {dummyCourses.map((course) => (
              <div key={course.id} className="bg-white p-5 rounded-lg shadow border">
                <img src={course.image} alt={course.title} className="w-full h-32 object-cover mb-3 rounded" />
                <h3 className="text-md font-semibold text-gray-800 line-clamp-1">{course.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>
                <p className="text-sm mt-2 text-green-600 font-medium">Instructor: {course.instructor}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;