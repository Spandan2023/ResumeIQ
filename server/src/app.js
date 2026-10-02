
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import {
  notFound,
  errorHandler,
} from "./middlewares/errorMiddleware.js";

const app = express();

// ----------------------------------
// Middleware
// ----------------------------------

// Allow requests from the React frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:7777",
    credentials: true,
  })
);

// Parse incoming JSON request bodies
app.use(express.json({ limit: "1mb" }));

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Parse cookies from incoming requests
app.use(cookieParser());

// ----------------------------------
// Health Check
// ----------------------------------

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ResumeIQ API is running",
  });
});

// ----------------------------------
// API Routes
// ----------------------------------

app.use("/api/auth", authRoutes);
app.use("/api/analysis", analysisRoutes);

// ----------------------------------
// Error Handling
// ----------------------------------

// Handle requests to undefined routes
app.use(notFound);

// Handle application errors
app.use(errorHandler);

export default app;