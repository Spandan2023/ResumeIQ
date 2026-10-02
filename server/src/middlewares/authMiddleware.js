import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ----------------------------------
// Get authentication token
// ----------------------------------

const getTokenFromRequest = (req) => {
  let token = req.cookies?.token;

  // Optional fallback for API clients using Bearer token
  if (
    !token &&
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  return token;
};

// ----------------------------------
// Protected authentication
// ----------------------------------

const protect = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    // ----------------------------------
    // Check whether token exists
    // ----------------------------------

    if (!token) {
      res.status(401);
      return next(new Error("Not authorized. Please log in."));
    }

    // ----------------------------------
    // Verify JWT
    // ----------------------------------

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ----------------------------------
    // Find user associated with token
    // ----------------------------------

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(401);
      return next(new Error("User not found. Please log in again."));
    }

    // ----------------------------------
    // Attach authenticated user
    // ----------------------------------

    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);

    res.status(401);
    next(new Error("Not authorized. Invalid or expired token."));
  }
};

// ----------------------------------
// Optional authentication
// ----------------------------------
//
// Used when both guests and authenticated
// users are allowed to access an endpoint.
//
// No token:
//   → Continue as guest
//
// Valid token:
//   → Attach req.user
//
// Invalid/expired token:
//   → Return 401
// ----------------------------------

const optionalProtect = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    // ----------------------------------
    // No token = guest user
    // ----------------------------------

    if (!token) {
      return next();
    }

    // ----------------------------------
    // Verify JWT
    // ----------------------------------

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ----------------------------------
    // Find user associated with token
    // ----------------------------------

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(401);
      return next(new Error("User not found. Please log in again."));
    }

    // ----------------------------------
    // Attach authenticated user
    // ----------------------------------

    req.user = user;

    next();
  } catch (error) {
    console.error("Optional authentication error:", error.message);

    res.status(401);
    next(new Error("Not authorized. Invalid or expired token."));
  }
};

export { optionalProtect };
export default protect;