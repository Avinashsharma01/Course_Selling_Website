import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// Route files
import contactRoute from "./routes/contact.route.js";
import userRoutes from './routes/user.route.js';
import courseRoutes from './routes/course.route.js'; // ✅ import course routes

import connectToDb from "./database/db.js";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
    res.send("Server is live");
});

// Use routes
app.use("/api", contactRoute);
app.use("/api/user", userRoutes);
app.use("/api/courses", courseRoutes); // ✅ mount course routes

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
