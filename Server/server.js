
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import contactRoute from "./routes/contact.route.js";
import connectToDb from "./database/db.js";
import userRoutes from './routes/user.route.js';


const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Allow all origins
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // for URL-encoded data

// Test route
app.get("/", (req, res) => {
    res.send("Server is live");
});

// Routes
app.use("/api", contactRoute);
app.use('/api/user', userRoutes);

// Start server
app.listen(port, async () => {
    try {
        await connectToDb();
        console.log(`Server is live on port number ${port}`);
    } catch (err) {
        console.error("Failed to connect to the database:", err);
        process.exit(1); // Exit the app if DB connection fails
    }
});

