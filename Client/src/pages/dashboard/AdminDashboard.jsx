// src/pages/dashboard/AdminDashboard.jsx
import React, { useState } from 'react';
import {
  FaUsers, FaBook, FaUserShield, FaPlus, FaSearch, FaEdit, FaTrash
} from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { dummyUsers } from '../../api/dummyUsers';
import { dummyCourses } from '../../api/dummyCourses';

const SidebarItem = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-3 text-gray-700 hover:bg-blue-100 px-4 py-2 rounded-md cursor-pointer transition">
    <Icon className="text-blue-600" />
    <span className="font-medium">{label}</span>
  </div>
);

const ITEMS_PER_PAGE = 6;

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('users');
  const [page, setPage] = useState(1);

  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery) ||
      user.enrolledCourses?.some((c) =>
        c.toLowerCase().includes(searchQuery)
      )
  );

  const filteredCourses = dummyCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery) ||
      course.instructor?.toLowerCase().includes(searchQuery) ||
      course.category?.toLowerCase().includes(searchQuery)
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const paginatedCourses = filteredCourses.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages =
    tab === 'users'
      ? Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)
      : Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);

  const handlePageChange = (direction) => {
    setPage((prev) =>
      direction === 'next'
        ? Math.min(prev + 1, totalPages)
        : Math.max(prev - 1, 1)
    );
  };

  const handleEdit = (type, id) => {
    console.log(`Edit ${type} with id: ${id}`);
  };

  const handleDelete = (type, id) => {
    console.log(`Delete ${type} with id: ${id}`);
  };

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
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-blue-800 mb-1">👋 Welcome, Admin!</h1>
          <p className="text-gray-600">Manage courses, users, and platform activities here.</p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
          {/* Search */}
          <div className="flex items-center bg-white px-4 py-2 rounded-md shadow border gap-2">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search users or courses..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value.toLowerCase());
                setPage(1);
              }}
              className="outline-none bg-transparent text-sm text-gray-700 w-60"
            />
          </div>

          {/* Tab Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => { setTab('users'); setPage(1); }}
              className={`px-4 py-2 rounded-md ${tab === 'users'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border'
                }`}
            >
              Users
            </button>
            <button
              onClick={() => { setTab('courses'); setPage(1); }}
              className={`px-4 py-2 rounded-md ${tab === 'courses'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border'
                }`}
            >
              Courses
            </button>
          </div>

          {/* Add Course */}
          {tab === 'courses' && (
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition">
              <FaPlus /> Add Course
            </button>
          )}
        </div>

        {/* Main Grid */}
        {tab === 'users' ? (
          <section>
            <h2 className="text-xl font-bold text-blue-700 mb-4">👥 Users</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedUsers.map((user) => (
                <div key={user.id} className="bg-white p-5 rounded-lg shadow border relative">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full mb-3 mx-auto"
                  />
                  <h3 className="text-lg font-semibold text-center text-gray-800">{user.name}</h3>
                  <p className="text-sm text-center text-gray-500">{user.email}</p>
                  <p className="text-sm text-center mt-1 text-blue-600">
                    Enrolled: <span className="font-semibold">
                      {user.enrolledCourses?.join(', ') || 'None'}
                    </span>
                  </p>
                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      onClick={() => handleEdit('user', user.id)}
                      className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete('user', user.id)}
                      className="text-sm text-red-600 hover:underline flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section>
            <h2 className="text-xl font-bold text-blue-700 mb-4">📚 Courses</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedCourses.map((course) => (
                <div key={course.id} className="bg-white p-5 rounded-lg shadow border relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-32 object-cover mb-3 rounded"
                  />
                  <h3 className="text-md font-semibold text-gray-800 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {course.description}
                  </p>
                  <p className="text-sm mt-2 text-green-600 font-medium">
                    Instructor: {course.instructor}
                  </p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEdit('course', course.id)}
                      className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete('course', course.id)}
                      className="text-sm text-red-600 hover:underline flex items-center gap-1"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={page === 1}
            className="px-4 py-2 bg-white border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="font-semibold text-gray-600">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange('next')}
            disabled={page === totalPages}
            className="px-4 py-2 bg-white border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
