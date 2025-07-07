import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Route files
import contactRoute from "./routes/contact.route.js";
import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import courseRoutes from './routes/course.route.js';
import enrollmentRoutes from './routes/enrollment.route.js';

// Middlewares
import { apiLimiter, authLimiter } from './middleware/rateLimiter.js';

import connectToDb from "./database/db.js";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(helmet()); // Security headers
app.use(morgan('dev')); // HTTP request logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiLimiter); // Rate limiting for all routes

// Test route
app.get("/", (req, res) => {
    res.send("Server is live");
});

// Use routes
app.use("/api", contactRoute);
app.use("/api/user", authLimiter, userRoutes); // Stricter rate limiting for auth routes
app.use("/api/admin", authLimiter, adminRoutes); // Admin routes with rate limiting
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);


// 404 handler - for non-existing routes
app.use((req, res) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Global error handler
import errorHandler from './middleware/errorHandler.js';
app.use(errorHandler);

// Start server
app.listen(port, async () => {
    try {
        await connectToDb();
        console.log(`✅ Server is live on port number ${port}`);
    } catch (err) {
        console.error("❌ Failed to connect to the database:", err);
        process.exit(1);
    }
});
