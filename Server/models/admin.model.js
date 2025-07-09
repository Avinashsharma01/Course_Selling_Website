// models/admin.model.js

import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        isSuperAdmin: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            default: "admin"
        },
        bio: {
            type: String,
            default: ''
        },
        profileImage: {
            type: String,
            default: 'https://via.placeholder.com/150'
        },
        contactNumber: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: 'Instructor'
        }
    },
    {
        timestamps: true,
    }
);

const AdminModel = mongoose.model('Admin', adminSchema);

export default AdminModel;
