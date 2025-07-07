import bcrypt from 'bcryptjs';
import UserModel from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';

// Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, interests } = req.body;

    // Check if user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber: phoneNumber || '',
      interests: interests || []
    });

    // Generate token
    const token = generateToken(newUser._id, 'user');

    // Return user data with token
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      profilePicture: newUser.profilePicture,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });

    // Check if user exists and password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id, 'user');

    // Return user data with token
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profilePicture = req.body.profilePicture || user.profilePicture;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    // Update interests if provided
    if (req.body.interests) {
      user.interests = req.body.interests;
    }

    // Update password if provided
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      phoneNumber: updatedUser.phoneNumber,
      interests: updatedUser.interests
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// For admin: Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// For admin: Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser
};
