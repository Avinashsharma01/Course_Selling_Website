import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import courseRoutes from './routes/course.route.js';
import enrollmentRoutes from './routes/enrollment.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/courses', courseRoutes);
app.use('/enrollments', enrollmentRoutes);

console.log('Available routes loaded');

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// MongoDB connection + Start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => console.error('DB connection error:', err));
