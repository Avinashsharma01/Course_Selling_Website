// models/user.model.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
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
    role: {
      type: String,
      default: "user"
    },
    profilePicture: {
      type: String,
      default: 'https://via.placeholder.com/150'
    },
    phoneNumber: {
      type: String,
      default: ''
    },
    interests: [{
      type: String
    }],
    enrolledCourseCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }

);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
