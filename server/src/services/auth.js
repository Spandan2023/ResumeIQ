import api from "./api.js";
// ----------------------------------
// Login with email and password
// ----------------------------------
const login = async ({ email, password }) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};
// ----------------------------------
// Signup with email and password
// ----------------------------------

const signup = async ({ name, email, password }) => {
  const response = await api.post("/auth/signup", {
    name,
    email,
    password,
  });

  return response.data;
};

// ----------------------------------
// Login / Signup with Google
// ----------------------------------

const googleLogin = async (credential) => {
  const response = await api.post("/auth/google", {
    credential,
  });

  return response.data;
};

// ----------------------------------
// Logout
// ----------------------------------

const logout = async () => {
  const response = await api.post("/auth/logout");

  return response.data;
};

// ----------------------------------
// Get currently authenticated user
// ----------------------------------

const getCurrentUser = async () => {
  const response = await api.get("/auth/me");

  return response.data;
};

// ----------------------------------
// Export authentication functions
// ----------------------------------

export {
  login,
  signup,
  googleLogin,
  logout,
  getCurrentUser,
};


