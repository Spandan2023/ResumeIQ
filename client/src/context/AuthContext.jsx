import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getCurrentUser,
  login as loginRequest,
  signup as signupRequest,
  googleLogin as googleLoginRequest,
  logout as logoutRequest,
} from "../services/auth.js";

// ----------------------------------
// Create authentication context
// ----------------------------------

const AuthContext = createContext(null);

// ----------------------------------
// Authentication Provider
// ----------------------------------

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ----------------------------------
  // Check current authentication
  // ----------------------------------

  const checkAuth = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await getCurrentUser();

      if (response?.success && response?.user) {
        setUser(response.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      // No valid authentication cookie
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ----------------------------------
  // Run authentication check
  // when application starts
  // ----------------------------------

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ----------------------------------
  // Login
  // ----------------------------------

  const login = useCallback(
    async (credentials) => {
      const response = await loginRequest(
        credentials
      );

      if (response?.success && response?.user) {
        setUser(response.user);
        setIsAuthenticated(true);

        return response;
      }

      throw new Error(
        response?.message || "Login failed."
      );
    },
    []
  );

  // ----------------------------------
  // Signup
  // ----------------------------------

  const signup = useCallback(
    async (userData) => {
      const response = await signupRequest(
        userData
      );

      if (response?.success && response?.user) {
        setUser(response.user);
        setIsAuthenticated(true);

        return response;
      }

      throw new Error(
        response?.message || "Signup failed."
      );
    },
    []
  );

  // ----------------------------------
  // Google Login / Signup
  // ----------------------------------

  const googleLogin = useCallback(
    async (credential) => {
      const response =
        await googleLoginRequest(
          credential
        );

      if (response?.success && response?.user) {
        setUser(response.user);
        setIsAuthenticated(true);

        return response;
      }

      throw new Error(
        response?.message ||
          "Google authentication failed."
      );
    },
    []
  );

  // ----------------------------------
  // Logout
  // ----------------------------------

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } finally {
      // Clear frontend authentication state
      // regardless of backend response.
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // ----------------------------------
  // Context value
  // ----------------------------------

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,

      login,
      signup,
      googleLogin,
      logout,
      checkAuth,
    }),
    [
      user,
      isAuthenticated,
      isLoading,
      login,
      signup,
      googleLogin,
      logout,
      checkAuth,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ----------------------------------
// Custom hook
// ----------------------------------

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider."
    );
  }

  return context;
}

