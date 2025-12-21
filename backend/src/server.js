import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

const app = express();
const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

// Parse JSON bodies with 5MB limit (for image uploads)
app.use(express.json({ limit: "5mb" }));

// Enable CORS for frontend requests
app.use(cors({ 
  origin: ENV.CLIENT_URL, 
  credentials: true 
}));

// Parse cookies from requests (required for JWT auth)
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve frontend in production
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start server and connect to database
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
  connectDB();
});