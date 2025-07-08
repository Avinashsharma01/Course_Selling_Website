import React from 'react';
import { FaBook, FaCertificate, FaUserCircle } from 'react-icons/fa';
import { MdOutlineAutoGraph } from 'react-icons/md';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-2">📊 Student Dashboard</h1>
          <p className="text-gray-600 text-lg">Track your learning, achievements, and course activities here.</p>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Enrolled Courses */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaBook size={30} className="text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Enrolled Courses</h2>
            </div>
            <p className="text-gray-600">You're enrolled in <span className="font-bold text-green-700">4 courses</span>.</p>
          </motion.div>

          {/* Progress */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <MdOutlineAutoGraph size={30} className="text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Progress</h2>
            </div>
            <p className="text-gray-600">📘 2 in progress, ✅ 1 completed, ⏳ 1 not started</p>
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all"
                  style={{ width: '60%' }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">60% overall completion</p>
            </div>
          </motion.div>

          {/* Certificates */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-yellow-400"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaCertificate size={28} className="text-yellow-500" />
              <h2 className="text-xl font-semibold text-gray-800">Certificates</h2>
            </div>
            <p className="text-gray-600">🏅 You've earned <span className="font-bold text-yellow-600">2 certificates</span>.</p>
            <p className="text-sm text-gray-500 mt-1">Download from course page</p>
          </motion.div>

          {/* Account Info */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-purple-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <FaUserCircle size={30} className="text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">Account Info</h2>
            </div>
            <p className="text-gray-600">Email: <strong className="text-purple-700">student@learnhub.com</strong></p>
            <p className="text-gray-600">Plan: <strong className="text-purple-700">Premium</strong></p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
