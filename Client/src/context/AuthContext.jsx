import React, { useState, useEffect } from "react";
import authService from "../api/services/authService";
import { AuthContext } from "./AuthContextCreator";

// AuthContext Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    // Check for saved token and load user on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        const userType = localStorage.getItem("userType");

        if (token) {
            loadUser(userType);
        } else {
            setLoading(false);
        }
    }, []);

    const loadUser = async (userType) => {
        setLoading(true);
        try {
            let userData;
            if (userType === "admin") {
                userData = await authService.getAdminProfile();
                setIsAdmin(true);
            } else {
                userData = await authService.getUserProfile();
                setIsAdmin(false);
            }

            // Set the user data
            setUser(userData);
            setError(null);
        } catch (err) {
            console.error("Failed to load user", err);
            setError(err);
            // Clear stored data if authentication fails
            localStorage.removeItem("token");
            localStorage.removeItem("userType");
            setIsAdmin(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials, isAdminLogin = false) => {
        setLoading(true);
        try {
            let response;
            if (isAdminLogin) {
                response = await authService.loginAdmin(credentials);
                setIsAdmin(true);
                localStorage.setItem("userType", "admin");
            } else {
                response = await authService.loginUser(credentials);
                setIsAdmin(false);
                localStorage.setItem("userType", "user");
            }

            // Save token and user data
            localStorage.setItem("token", response.token);
            setUser(response);
            setError(null);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData, isAdminRegister = false) => {
        setLoading(true);
        try {
            let response;
            if (isAdminRegister) {
                response = await authService.registerAdmin(userData);
                setIsAdmin(true);
                localStorage.setItem("userType", "admin");
            } else {
                response = await authService.registerUser(userData);
                setIsAdmin(false);
                localStorage.setItem("userType", "user");
            }

            // Save token and user data
            localStorage.setItem("token", response.token);
            setUser(response);
            setError(null);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (profileData, isAdminUpdate = false) => {
        setLoading(true);
        try {
            let response;
            if (isAdminUpdate) {
                response = await authService.updateAdminProfile(profileData);
            } else {
                response = await authService.updateUserProfile(profileData);
            }

            // Update user data
            setUser((prev) => ({ ...prev, ...response }));
            setError(null);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updatePassword = async (
        currentPassword,
        newPassword,
        isAdminUpdate = false
    ) => {
        setLoading(true);
        try {
            const passwordData = { currentPassword, newPassword };

            if (isAdminUpdate) {
                await authService.updateAdminPassword(passwordData);
            } else {
                await authService.updateUserPassword(passwordData);
            }

            setError(null);
            return true;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        // Remove token from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        // Reset state
        setUser(null);
        setIsAdmin(false);
    };

    // Determine if user is authenticated
    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider
            value={{
                user,
                isAdmin,
                loading,
                error,
                isAuthenticated,
                login,
                register,
                updateProfile,
                updatePassword,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
