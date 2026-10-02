import bcrypt from "bcryptjs";

import {
  signup,
  login,
  loginWithGoogle,
  getCurrentUser,
} from "../services/authService.js";

import User from "../models/User.js";

import {
  AUTH_COOKIE_NAME,
  authCookieOptions,
} from "../config/authConfig.js";

// ----------------------------------
// Cookie options for clearing cookie
// ----------------------------------

const clearCookieOptions = {
  httpOnly: authCookieOptions.httpOnly,
  secure: authCookieOptions.secure,
  sameSite: authCookieOptions.sameSite,
  path: authCookieOptions.path,
};

// ----------------------------------
// Signup Controller
// ----------------------------------

const signupUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // ----------------------------------
    // Basic validation
    // ----------------------------------

    if (!name || !email || !password) {
      res.status(400);

      return next(
        new Error(
          "Name, email and password are required.",
        ),
      );
    }

    // Keep backend validation consistent
    // with the frontend signup requirement.
    if (password.length < 8) {
      res.status(400);

      return next(
        new Error(
          "Password must be at least 8 characters long.",
        ),
      );
    }

    // ----------------------------------
    // Create account
    // ----------------------------------

    const result = await signup({
      name,
      email,
      password,
    });

    // ----------------------------------
    // Store JWT in HTTP-only cookie
    // ----------------------------------

    res.cookie(
      AUTH_COOKIE_NAME,
      result.token,
      authCookieOptions,
    );

    // ----------------------------------
    // Send response
    // ----------------------------------

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: result.user,
    });
  } catch (error) {
    // ----------------------------------
    // Duplicate email
    // ----------------------------------

    if (error.code === 11000) {
      res.status(409);

      return next(
        new Error(
          "An account with this email already exists.",
        ),
      );
    }

    // ----------------------------------
    // Mongoose validation error
    // ----------------------------------

    if (error.name === "ValidationError") {
      res.status(400);

      return next(
        new Error(
          Object.values(error.errors)
            .map((err) => err.message)
            .join(", "),
        ),
      );
    }

    res.status(400);
    next(error);
  }
};

// ----------------------------------
// Login Controller
// ----------------------------------

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ----------------------------------
    // Basic validation
    // ----------------------------------

    if (!email || !password) {
      res.status(400);

      return next(
        new Error(
          "Email and password are required.",
        ),
      );
    }

    // ----------------------------------
    // Authenticate user
    // ----------------------------------

    const result = await login({
      email,
      password,
    });

    // ----------------------------------
    // Store JWT in HTTP-only cookie
    // ----------------------------------

    res.cookie(
      AUTH_COOKIE_NAME,
      result.token,
      authCookieOptions,
    );

    // ----------------------------------
    // Send response
    // ----------------------------------

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: result.user,
    });
  } catch (error) {
    res.status(401);
    next(error);
  }
};

// ----------------------------------
// Google Login Controller
// ----------------------------------

const googleLogin = async (req, res, next) => {
  try {
    const { credential } = req.body;

    // ----------------------------------
    // Validate Google credential
    // ----------------------------------

    if (!credential) {
      res.status(400);

      return next(
        new Error(
          "Google credential is required.",
        ),
      );
    }

    // ----------------------------------
    // Authenticate with Google
    // ----------------------------------

    const result =
      await loginWithGoogle(credential);

    // ----------------------------------
    // Store JWT in HTTP-only cookie
    // ----------------------------------

    res.cookie(
      AUTH_COOKIE_NAME,
      result.token,
      authCookieOptions,
    );

    // ----------------------------------
    // Send response
    // ----------------------------------

    res.status(200).json({
      success: true,
      message:
        "Google authentication successful.",
      user: result.user,
    });
  } catch (error) {
    console.error(
      "Google authentication error:",
      error.message,
    );

    res.status(401);

    next(
      new Error(
        "Google authentication failed.",
      ),
    );
  }
};

// ----------------------------------
// Change Password Controller
// ----------------------------------
//
// PATCH /api/auth/password
//
// Protected route.
//
// The authenticated user comes from
// req.user. We never trust a userId
// supplied by the frontend.
// ----------------------------------

const changePassword = async (req, res, next) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    // ----------------------------------
    // Required fields
    // ----------------------------------

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      res.status(400);

      return next(
        new Error(
          "Current password, new password and confirmation are required.",
        ),
      );
    }

    // ----------------------------------
    // New password validation
    // ----------------------------------

    if (typeof newPassword !== "string") {
      res.status(400);

      return next(
        new Error(
          "New password must be at least 8 characters long.",
        ),
      );
    }

    if (newPassword.length < 8) {
      res.status(400);

      return next(
        new Error(
          "New password must be at least 8 characters long.",
        ),
      );
    }

    // ----------------------------------
    // Confirm password
    // ----------------------------------

    if (newPassword !== confirmPassword) {
      res.status(400);

      return next(
        new Error(
          "New passwords do not match.",
        ),
      );
    }

    // ----------------------------------
    // New password must differ
    // ----------------------------------

    if (currentPassword === newPassword) {
      res.status(400);

      return next(
        new Error(
          "New password must be different from your current password.",
        ),
      );
    }

    // ----------------------------------
    // Find authenticated user
    // ----------------------------------
    //
    // req.user was created by protect
    // middleware from the authenticated
    // JWT cookie.
    //
    // Password is select:false in User.js,
    // so we explicitly include it here.
    // ----------------------------------

    const user = await User.findById(
      req.user._id,
    ).select("+password");

    if (!user) {
      res.status(404);

      return next(
        new Error(
          "User account not found.",
        ),
      );
    }

    // ----------------------------------
    // Google-only account check
    // ----------------------------------
    //
    // A Google-only account may not have
    // a local password to verify.
    // ----------------------------------

    if (!user.password) {
      res.status(400);

      return next(
        new Error(
          "Password changes are unavailable for this Google-only account.",
        ),
      );
    }

    // ----------------------------------
    // Verify current password
    // ----------------------------------

    const currentPasswordMatches =
      await bcrypt.compare(
        currentPassword,
        user.password,
      );

    if (!currentPasswordMatches) {
      res.status(401);

      return next(
        new Error(
          "Current password is incorrect.",
        ),
      );
    }

    // ----------------------------------
    // Hash new password
    // ----------------------------------

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        12,
      );

    user.password = hashedPassword;

    // ----------------------------------
    // Save updated password
    // ----------------------------------

    await user.save();

    // ----------------------------------
    // Success response
    // ----------------------------------

    res.status(200).json({
      success: true,
      message:
        "Password changed successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------
// Logout Controller
// ----------------------------------

const logoutUser = (req, res, next) => {
  try {
    // ----------------------------------
    // Clear authentication cookie
    // ----------------------------------

    res.clearCookie(
      AUTH_COOKIE_NAME,
      clearCookieOptions,
    );

    // ----------------------------------
    // Send response
    // ----------------------------------

    res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// ----------------------------------
// Get Current User Controller
// ----------------------------------

const getMe = async (req, res, next) => {
  try {
    // ----------------------------------
    // Get authenticated user
    // ----------------------------------

    const user = await getCurrentUser(
      req.user._id,
    );

    // ----------------------------------
    // Send response
    // ----------------------------------

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(404);
    next(error);
  }
};

// ----------------------------------
// Export controllers
// ----------------------------------

export {
  signupUser,
  loginUser,
  googleLogin,
  changePassword,
  logoutUser,
  getMe,
};