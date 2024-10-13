import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path"; // Import the path module

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";
import cloudinary from "cloudinary";

dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

try {
    mongoose.connect(URI);
    console.log("Connected to MongoDB");
} catch (error) {
    console.log(error);
}

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// Serve the frontend in production
if (process.env.NODE_ENV === "production") {
    const dirPath = path.resolve(); // Get the root directory of your project
    app.use(express.static(path.join(dirPath, "frontend", ""))); // Serve static files from the correct directory

    app.get("*", (req, res) => {
        res.sendFile(path.join(dirPath, "frontend", "dist", "index.html")); // Serve index.html for all routes
    });
}

server.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});
