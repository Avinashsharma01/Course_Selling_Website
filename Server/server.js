import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/db.js';
import courseRoutes from './routes/course.route.js';

dotenv.config();
const app = express();

app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.use('/courses', courseRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
