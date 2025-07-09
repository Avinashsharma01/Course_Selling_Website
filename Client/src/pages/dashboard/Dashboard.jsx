import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBook, FaUser, FaLink } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { dummyCourses } from '../../api/dummyCourses';
import dummyUser from '../../api/dummyUser';
import { motion } from "framer-motion";


const SidebarItem = ({ icon: Icon, label, to }) => (
  <Link
    to={to}
    className="flex items-center gap-3 text-gray-700 hover:bg-blue-100 px-4 py-2 rounded-md cursor-pointer transition"
  >
    <Icon className="text-blue-600" />
    <span className="font-medium">{label}</span>
  </Link>
);

const Dashboard = () => {
  const enrolledCourses = dummyCourses.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r p-6">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-blue-700 mb-2">🎓 CourseSelling</h2>
          <div className="text-gray-500 text-sm">Student Dashboard</div>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">GENERAL</p>
            <SidebarItem icon={FaHome} label="Home" to="/" />
            <SidebarItem icon={FaUser} label="My Profile" to="/dashboard" />
            <SidebarItem icon={FaBook} label="Courses" to="/courses" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">CLASS</p>
            <SidebarItem icon={MdSpaceDashboard} label="Live Class" to="#" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">LINKS</p>
            <SidebarItem icon={FaLink} label="Resources" to="#" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        
<motion.h1
  className="text-3xl font-extrabold text-blue-800 mb-4"
  animate={{
    rotateX: [0, 8, -8, 0],
    rotateY: [0, -5, 5, 0],
    scale: [1, 1.02, 1, 1.02, 1],
  }}
  transition={{
    repeat: Infinity,
    duration: 6,
    ease: "easeInOut",
  }}
>
  👋 Welcome back, {dummyUser.name || "Student"}!
</motion.h1>

        <p className="text-gray-600 mb-10">
          Let’s complete your profile and setup so you can start learning smoothly.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Complete Setup Box */}
          <div className="bg-white rounded-xl shadow-md p-6">
           
            <div className="flex justify-between items-center mb-4">
  <h2 className="text-lg font-semibold text-gray-800">Complete Setup</h2>
  <button
    className="text-sm text-blue-600 hover:underline"
    onClick={() => alert("Edit Profile clicked — Connect this to a modal or route")}
  >
    ✏️ Edit Profile
  </button>
</div>
            <ul className="space-y-4 text-sm">
              {/* Name */}
              <li className="flex items-start justify-between">
                <div>
                  <span className="font-medium text-gray-800">✅ Name</span>
                  <p className="text-gray-600 text-xs">
                    {dummyUser.name ? (
                      <>Provided: <strong>{dummyUser.name}</strong></>
                    ) : (
                      <>Not Provided</>
                    )}
                  </p>
                </div>
                <span className={dummyUser.name ? "text-green-500" : "text-gray-400"}>
                  {dummyUser.name ? "✔️" : "Pending"}
                </span>
              </li>

              {/* Email */}
              <li className="flex items-start justify-between">
                <div>
                  <span className="font-medium text-gray-800">📧 Email</span>
                  <p className="text-gray-600 text-xs">
                    {dummyUser.email ? <>Email: <strong>{dummyUser.email}</strong></> : "Not Provided"}
                  </p>
                </div>
                <span className={dummyUser.email ? "text-green-500" : "text-yellow-500"}>
                  {dummyUser.email ? "✔️" : "Verify"}
                </span>
              </li>

              {/* Profile Photo */}
              <li className="flex items-start justify-between">
                <div>
                  <span className="font-medium text-gray-800">🖼️ Profile Photo</span>
                  <p className="text-gray-600 text-xs">
                    {dummyUser.profilePicture ? (
                      <span className="flex items-center gap-2">
                        <img
                          src={dummyUser.profilePicture}
                          alt="Profile"
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        Uploaded
                      </span>
                    ) : (
                      "No photo uploaded yet."
                    )}
                  </p>
                </div>
                <span className={dummyUser.profilePicture ? "text-green-500" : "text-gray-400"}>
                  {dummyUser.profilePicture ? "✔️" : "Pending"}
                </span>
              </li>

              {/* Goal */}
              <li className="flex items-start justify-between">
                <div>
                  <span className="font-medium text-gray-800">🎯 Learning Interests</span>
                  <p className="text-gray-600 text-xs">
                    {dummyUser.interests && dummyUser.interests.length > 0 ? (
                      dummyUser.interests.join(", ")
                    ) : (
                      "Not Provided"
                    )}
                  </p>
                </div>
                <span className={dummyUser.interests && dummyUser.interests.length > 0 ? "text-green-500" : "text-gray-400"}>
                  {dummyUser.interests && dummyUser.interests.length > 0 ? "✔️" : "Pending"}
                </span>
              </li>
            </ul>
          </div>

          {/* Enrolled Courses */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">📚 Enrolled Courses</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              {enrolledCourses.map((course) => (
                <li key={course.id}>
                  <strong>{course.title}</strong> — by {course.instructor}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
