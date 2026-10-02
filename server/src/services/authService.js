import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

// ----------------------------------
// Signup with email and password
// ----------------------------------

const signup = async ({ name, email, password }) => {
  // Normalize email
  const normalizedEmail = email.trim().toLowerCase();

  // Check whether an account already exists
  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    throw new Error("An account with this email already exists.");
  }

  // Hash password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    authProvider: "local",
  });

  // Generate authentication token
  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      authProvider: user.authProvider,
    },
    token,
  };
};

// ----------------------------------
// Login with email and password
// ----------------------------------

const login = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  // Password has select:false in User schema,
  // so explicitly include it for login.
  const user = await User.findOne({
    email: normalizedEmail,
  }).select("+password");

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // A Google-only account may not have a password
  if (!user.password) {
    throw new Error(
      "This account uses Google sign-in. Please continue with Google."
    );
  }

  // Compare entered password with stored hash
  const passwordMatches = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatches) {
    throw new Error("Invalid email or password.");
  }

  // Check account status
  if (!user.isActive) {
    throw new Error("Your account is currently inactive.");
  }

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      authProvider: user.authProvider,
    },
    token,
  };
};

// ----------------------------------
// Login / Signup with Google
// ----------------------------------

const loginWithGoogle = async (credential) => {
  // Verify Google credential
  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Unable to verify Google account.");
  }

  const {
    sub: googleId,
    email,
    name,
    email_verified: emailVerified,
  } = payload;

  if (!email || !emailVerified) {
    throw new Error(
      "Google account email could not be verified."
    );
  }

  const normalizedEmail = email.toLowerCase();

  // ----------------------------------
  // Find user by Google ID
  // ----------------------------------

  let user = await User.findOne({ googleId });

  if (user) {
    if (!user.isActive) {
      throw new Error("Your account is currently inactive.");
    }

    // Existing Google account
    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        authProvider: user.authProvider,
      },
      token,
    };
  }

  // ----------------------------------
  // Find user by email
  // ----------------------------------

  user = await User.findOne({
    email: normalizedEmail,
  });

  if (user) {
    // Existing local account.
    // Link Google authentication to it.
    user.googleId = googleId;
    user.authProvider = "both";

    await user.save();

    const token = generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        authProvider: user.authProvider,
      },
      token,
    };
  }

  // ----------------------------------
  // Create a new Google account
  // ----------------------------------

  user = await User.create({
    name: name?.trim() || "ResumeIQ User",
    email: normalizedEmail,
    googleId,
    authProvider: "google",
  });

  const token = generateToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      authProvider: user.authProvider,
    },
    token,
  };
};

// ----------------------------------
// Get current user
// ----------------------------------

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  if (!user.isActive) {
    throw new Error("Your account is currently inactive.");
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    authProvider: user.authProvider,
    createdAt: user.createdAt,
  };
};

export {
  signup,
  login,
  loginWithGoogle,
  getCurrentUser,
};


