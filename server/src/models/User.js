import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // ----------------------------------
    // Basic user information
    // ----------------------------------

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    // ----------------------------------
    // Local authentication
    // ----------------------------------

    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },

    // ----------------------------------
    // Google authentication
    // ----------------------------------

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    // ----------------------------------
    // Authentication provider
    // ----------------------------------

    authProvider: {
      type: String,
      enum: ["local", "google", "both"],
      default: "local",
    },

    // ----------------------------------
    // Account status
    // ----------------------------------

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;