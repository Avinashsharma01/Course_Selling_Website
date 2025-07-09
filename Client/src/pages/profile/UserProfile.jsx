/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaPen,
    FaCheck,
    FaTimes,
    FaKey,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const UserProfile = () => {
    const { user, updateProfile, updatePassword } = useAuth();
    const { showToast } = useToast();

    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        profilePicture: "",
        interests: [],
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // Populate form with user data when component mounts or user changes
    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                profilePicture: user.profilePicture || "",
                interests: user.interests || [],
            });
        }
    }, [user]);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await updateProfile(profileData, false); // false for user profile update
            showToast("Profile updated successfully", "success");
            setIsEditing(false);
        } catch (error) {
            showToast(
                typeof error === "string"
                    ? error
                    : "Failed to update profile. Please try again.",
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            showToast("New passwords don't match", "error");
            return;
        }

        setIsLoading(true);
        try {
            await updatePassword(
                passwordData.currentPassword,
                passwordData.newPassword
            );
            showToast("Password updated successfully", "success");
            setShowPasswordForm(false);
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            showToast(
                typeof error === "string"
                    ? error
                    : "Failed to update password. Please try again.",
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const cancelEditing = () => {
        // Reset form to original user data
        if (user) {
            setProfileData({
                name: user.name || "",
                email: user.email || "",
                phoneNumber: user.phoneNumber || "",
                profilePicture: user.profilePicture || "",
                interests: user.interests || [],
            });
        }
        setIsEditing(false);
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="text-3xl font-bold text-blue-700 mb-8">
                Your Profile
            </h1>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                {/* Profile Header */}
                <div className="bg-blue-600 py-8 px-6 text-white relative">
                    <div className="flex items-center">
                        <div className="mr-6">
                            {profileData.profilePicture ? (
                                <img
                                    src={profileData.profilePicture}
                                    alt={profileData.name}
                                    className="w-24 h-24 rounded-full object-cover border-4 border-white"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-blue-400 flex items-center justify-center border-4 border-white">
                                    <FaUser size={40} />
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold">
                                {profileData.name}
                            </h2>
                            <p className="opacity-90 flex items-center mt-1">
                                <FaEnvelope className="mr-2" />{" "}
                                {profileData.email}
                            </p>
                            {profileData.phoneNumber && (
                                <p className="opacity-90 flex items-center mt-1">
                                    <FaPhone className="mr-2" />{" "}
                                    {profileData.phoneNumber}
                                </p>
                            )}
                        </div>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-400 text-white p-2 rounded-full"
                                title="Edit Profile"
                            >
                                <FaPen />
                            </button>
                        )}
                    </div>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                    {isEditing ? (
                        <form
                            onSubmit={handleProfileSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleProfileChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleProfileChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={profileData.phoneNumber}
                                    onChange={handleProfileChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Profile Picture URL
                                </label>
                                <input
                                    type="url"
                                    name="profilePicture"
                                    value={profileData.profilePicture}
                                    onChange={handleProfileChange}
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center ${
                                        isLoading
                                            ? "opacity-70 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    <FaCheck className="mr-2" />
                                    Save Changes
                                </button>

                                <button
                                    type="button"
                                    onClick={cancelEditing}
                                    className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md flex items-center"
                                >
                                    <FaTimes className="mr-2" />
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <>
                            {profileData.interests &&
                                profileData.interests.length > 0 && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                            Interests
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {profileData.interests.map(
                                                (interest, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                                    >
                                                        {interest}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}

                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                    Account Security
                                </h3>

                                <button
                                    onClick={() =>
                                        setShowPasswordForm(!showPasswordForm)
                                    }
                                    className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
                                >
                                    <FaKey className="mr-2" />
                                    {showPasswordForm
                                        ? "Cancel Password Change"
                                        : "Change Password"}
                                </button>

                                <AnimatePresence>
                                    {showPasswordForm && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="bg-gray-50 p-4 rounded-md border border-gray-200"
                                        >
                                            <form
                                                onSubmit={handlePasswordSubmit}
                                                className="space-y-4"
                                            >
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Current Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="currentPassword"
                                                        value={
                                                            passwordData.currentPassword
                                                        }
                                                        onChange={
                                                            handlePasswordChange
                                                        }
                                                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="newPassword"
                                                        value={
                                                            passwordData.newPassword
                                                        }
                                                        onChange={
                                                            handlePasswordChange
                                                        }
                                                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                        minLength="6"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Confirm New Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="confirmPassword"
                                                        value={
                                                            passwordData.confirmPassword
                                                        }
                                                        onChange={
                                                            handlePasswordChange
                                                        }
                                                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                        minLength="6"
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    disabled={isLoading}
                                                    className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center ${
                                                        isLoading
                                                            ? "opacity-70 cursor-not-allowed"
                                                            : ""
                                                    }`}
                                                >
                                                    Update Password
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    )}
                </div>

                {/* Enrolled Courses */}
                <div className="border-t border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Your Learning
                    </h3>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-600">
                            Access your enrolled courses and continue learning
                        </p>
                        <Link
                            to="/dashboard"
                            className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
