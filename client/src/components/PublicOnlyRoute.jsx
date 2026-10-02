import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function PublicOnlyRoute() {
  const {
    isAuthenticated,
    isLoading,
  } = useAuth();

  // ----------------------------------
  // Wait for initial authentication check
  // ----------------------------------

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
            <span className="text-sm font-bold">
              IQ
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-500" />
            Checking your session...
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------
  // Redirect authenticated users
  // ----------------------------------

  if (isAuthenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  // ----------------------------------
  // User is not authenticated
  // ----------------------------------

  return <Outlet />;
}