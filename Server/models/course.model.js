import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  instructor: String,
}, {
  timestamps: true,
  collection: 'courses' // ✅ forces name of collection in MongoDB
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
