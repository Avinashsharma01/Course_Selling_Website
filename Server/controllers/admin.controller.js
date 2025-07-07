import bcrypt from 'bcryptjs';
import AdminModel from '../models/admin.model.js';
import generateToken from '../utils/generateToken.js';

// Register admin
const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, position, contactNumber } = req.body;

        // Check if admin already exists
        const adminExists = await AdminModel.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the admin
        const newAdmin = await AdminModel.create({
            name,
            email,
            password: hashedPassword,
            position: position || 'Instructor',
            contactNumber: contactNumber || ''
        });

        // Generate token
        const token = generateToken(newAdmin._id, 'admin');

        // Return admin data with token
        res.status(201).json({
            _id: newAdmin._id,
            name: newAdmin.name,
            email: newAdmin.email,
            position: newAdmin.position,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await AdminModel.findOne({ email });

        // Check if admin exists and password matches
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(admin._id, 'admin');

        // Return admin data with token
        res.status(200).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            position: admin.position,
            isSuperAdmin: admin.isSuperAdmin,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get admin profile
const getAdminProfile = async (req, res) => {
    try {
        const admin = await AdminModel.findById(req.userId).select('-password');

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update admin profile
const updateAdminProfile = async (req, res) => {
    try {
        const admin = await AdminModel.findById(req.userId);

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Update fields
        admin.name = req.body.name || admin.name;
        admin.email = req.body.email || admin.email;
        admin.bio = req.body.bio || admin.bio;
        admin.profileImage = req.body.profileImage || admin.profileImage;
        admin.contactNumber = req.body.contactNumber || admin.contactNumber;
        admin.position = req.body.position || admin.position;

        // Update password if provided
        if (req.body.password) {
            admin.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedAdmin = await admin.save();

        res.status(200).json({
            _id: updatedAdmin._id,
            name: updatedAdmin.name,
            email: updatedAdmin.email,
            bio: updatedAdmin.bio,
            profileImage: updatedAdmin.profileImage,
            contactNumber: updatedAdmin.contactNumber,
            position: updatedAdmin.position,
            isSuperAdmin: updatedAdmin.isSuperAdmin
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Super admin: Get all admins
const getAllAdmins = async (req, res) => {
    try {
        // Check if requester is super admin
        const requestingAdmin = await AdminModel.findById(req.userId);

        if (!requestingAdmin || !requestingAdmin.isSuperAdmin) {
            return res.status(403).json({ message: 'Access denied. Super admin only.' });
        }

        // Get all admins except the requesting super admin
        const admins = await AdminModel.find({ _id: { $ne: req.userId } })
            .select('-password')
            .sort({ createdAt: -1 });

        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Super admin: Create new admin
const createAdmin = async (req, res) => {
    try {
        // Check if requester is super admin
        const requestingAdmin = await AdminModel.findById(req.userId);

        if (!requestingAdmin || !requestingAdmin.isSuperAdmin) {
            return res.status(403).json({ message: 'Access denied. Super admin only.' });
        }

        const { name, email, password, position, isSuperAdmin } = req.body;

        // Check if admin already exists
        const adminExists = await AdminModel.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: 'Admin with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the admin
        const newAdmin = await AdminModel.create({
            name,
            email,
            password: hashedPassword,
            position: position || 'Instructor',
            isSuperAdmin: isSuperAdmin || false
        });

        res.status(201).json({
            _id: newAdmin._id,
            name: newAdmin.name,
            email: newAdmin.email,
            position: newAdmin.position,
            isSuperAdmin: newAdmin.isSuperAdmin
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Super admin: Delete admin
const deleteAdmin = async (req, res) => {
    try {
        // Check if requester is super admin
        const requestingAdmin = await AdminModel.findById(req.userId);

        if (!requestingAdmin || !requestingAdmin.isSuperAdmin) {
            return res.status(403).json({ message: 'Access denied. Super admin only.' });
        }

        const adminToDelete = await AdminModel.findById(req.params.id);

        if (!adminToDelete) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Prevent deleting other super admins for safety
        if (adminToDelete.isSuperAdmin) {
            return res.status(403).json({ message: 'Cannot delete another super admin' });
        }

        await AdminModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
    updateAdminProfile,
    getAllAdmins,
    createAdmin,
    deleteAdmin
};
