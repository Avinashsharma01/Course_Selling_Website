import React from 'react';

const Dashboard = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">📊 Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Enrolled Courses Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-green-500">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Enrolled Courses</h2>
          <p className="text-gray-600">You are enrolled in <strong>3</strong> courses.</p>
        </div>

        {/* Progress Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-blue-500">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Progress</h2>
          <p className="text-gray-600">2 courses are <strong>in progress</strong>, 1 course <strong>completed</strong>.</p>
        </div>

        {/* Certificate Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-yellow-500">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Certificates</h2>
          <p className="text-gray-600">You have earned <strong>1 certificate</strong>.</p>
        </div>

        {/* Account Info Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 border-t-4 border-purple-500">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Account Info</h2>
          <p className="text-gray-600">Email: <strong>you@example.com</strong></p>
          <p className="text-gray-600">Plan: <strong>Basic</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
