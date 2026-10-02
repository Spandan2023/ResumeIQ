// ----------------------------------
// Authentication Configuration
// ----------------------------------

// Authentication lifetime
const AUTH_TOKEN_EXPIRES_IN =
  process.env.AUTH_TOKEN_EXPIRES_IN || "30d";

// Authentication cookie name
const AUTH_COOKIE_NAME =
  process.env.AUTH_COOKIE_NAME || "token";

// Cookie lifetime: 30 days
const AUTH_COOKIE_MAX_AGE =
  30 * 24 * 60 * 60 * 1000;

// Environment
const isProduction =
  process.env.NODE_ENV === "production";

// SameSite can be overridden through environment variables.
// Local development uses "lax" by default.
// Production defaults to "none" so a separately hosted
// frontend/backend can use the authentication cookie.
const AUTH_COOKIE_SAME_SITE =
  process.env.AUTH_COOKIE_SAME_SITE ||
  (isProduction ? "none" : "lax");

// ----------------------------------
// Authentication Cookie Options
// ----------------------------------

const authCookieOptions = {
  httpOnly: true,

  secure: isProduction,

  sameSite: AUTH_COOKIE_SAME_SITE,

  maxAge: AUTH_COOKIE_MAX_AGE,

  path: "/",
};

// ----------------------------------
// Export configuration
// ----------------------------------

export {
  AUTH_TOKEN_EXPIRES_IN,
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_MAX_AGE,
  AUTH_COOKIE_SAME_SITE,
  authCookieOptions,
};