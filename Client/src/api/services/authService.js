// authService.js
import api from '../axios';

// User authentication
const registerUser = async (userData) => {
    return await api.post('/user/register', userData);
};

const loginUser = async (credentials) => {
    return await api.post('/user/login', credentials);
};

const getUserProfile = async () => {
    return await api.get('/user/profile');
};

const updateUserProfile = async (profileData) => {
    return await api.put('/user/profile', profileData);
};

const updateUserPassword = async (passwordData) => {
    return await api.put('/user/password', passwordData);
};

// Admin authentication
const registerAdmin = async (adminData) => {
    return await api.post('/admin/register', adminData);
};

const loginAdmin = async (credentials) => {
    return await api.post('/admin/login', credentials);
};

const getAdminProfile = async () => {
    return await api.get('/admin/profile');
};

const updateAdminProfile = async (profileData) => {
    return await api.put('/admin/profile', profileData);
};

const updateAdminPassword = async (passwordData) => {
    return await api.put('/admin/password', passwordData);
};

// For super admin only
const getAllAdmins = async () => {
    return await api.get('/admin/all');
};

const createAdmin = async (adminData) => {
    return await api.post('/admin/create', adminData);
};

const deleteAdmin = async (adminId) => {
    return await api.delete(`/admin/${adminId}`);
};

export default {
    // User methods
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    updateUserPassword,
    // Admin methods
    registerAdmin,
    loginAdmin,
    getAdminProfile,
    updateAdminProfile,
    updateAdminPassword,
    // Super admin methods
    getAllAdmins,
    createAdmin,
    deleteAdmin,
};
