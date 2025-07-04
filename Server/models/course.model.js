import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  instructor: String,
  duration: String,
}, {
  timestamps: true
});

export const Course = mongoose.model('Course', courseSchema);
