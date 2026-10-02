import express from "express";

import {
  signupUser,
  loginUser,
  googleLogin,
  changePassword,
  logoutUser,
  getMe,
} from "../controllers/authController.js";

import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// ----------------------------------
// Public authentication routes
// ----------------------------------

// Signup with email and password
router.post("/signup", signupUser);

// Login with email and password
router.post("/login", loginUser);

// Login / signup with Google
router.post("/google", googleLogin);

// Logout
router.post("/logout", logoutUser);

// ----------------------------------
// Protected authentication routes
// ----------------------------------

// Get currently authenticated user
router.get("/me", protect, getMe);

// Change current user's password
router.patch(
  "/password",
  protect,
  changePassword,
);

export default router;