import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
});

// Make sure the third argument ('course') matches your collection name in Atlas exactly
// models/course.model.js
const Course = mongoose.model('Course', courseSchema, 'courses');
export default Course;
 // <-- 'courses', not 'course'



