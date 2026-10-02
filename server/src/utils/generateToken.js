import jwt from "jsonwebtoken";

import {
  AUTH_TOKEN_EXPIRES_IN,
} from "../config/authConfig.js";

const generateToken = (userId) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: AUTH_TOKEN_EXPIRES_IN,
    }
  );
};

export default generateToken;