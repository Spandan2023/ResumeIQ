import { useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";

import {
  FileText,
  LayoutDashboard,
  FileSearch,
  Settings,
  LogOut,
  ShieldCheck,
  CircleHelp,
  History,
  UserRound,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  /*
   * ----------------------------------------------------------
   * USER DATA
   * ----------------------------------------------------------
   */

  const currentUser = user?.data || user || {};

  const displayName =
    currentUser.name?.trim() ||
    currentUser.email?.split("@")[0] ||
    "User";

  const displayEmail =
    currentUser.email?.trim() ||
    "ResumeIQ account";

  const profilePhoto = currentUser.profilePhoto || "";

  /*
   * ----------------------------------------------------------
   * PAGE TITLE
   * ----------------------------------------------------------
   */

  const getPageTitle = () => {
    if (location.pathname === "/dashboard") {
      return "Dashboard";
    }

    if (location.pathname === "/analyzer") {
      return "Analyze Resume";
    }

    if (location.pathname === "/history") {
      return "Analysis History";
    }

    if (location.pathname.startsWith("/analysis/")) {
      return "Analysis Results";
    }

    if (location.pathname === "/settings") {
      return "Settings";
    }

    if (location.pathname === "/help") {
      return "Help & Support";
    }

    return "Workspace";
  };

  /*
   * ----------------------------------------------------------
   * LOGOUT
   * ----------------------------------------------------------
   */

  const handleLogout = async () => {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);
    setLogoutError("");

    try {
      await logout();

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout error:", error);

      setLogoutError(
        error?.response?.data?.message ||
          "Unable to log out. Please try again."
      );
    } finally {
      setLoggingOut(false);
    }
  };

  /*
   * ----------------------------------------------------------
   * SIDEBAR LINK CLASSES
   * ----------------------------------------------------------
   */

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition ${
      isActive
        ? "bg-indigo-50 font-semibold text-indigo-700"
        : "font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
    }`;

  const historyLinkClass = () => {
    const isActive =
      location.pathname === "/history" ||
      location.pathname.startsWith("/analysis/");

    return `flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm transition ${
      isActive
        ? "bg-indigo-50 font-semibold text-indigo-700"
        : "font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
    }`;
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  /*
   * ----------------------------------------------------------
   * LAYOUT
   * ----------------------------------------------------------
   */

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900">
      {/* =====================================================
          MOBILE SIDEBAR OVERLAY
      ====================================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* -------------------------------------------------
            BRAND
        -------------------------------------------------- */}

        <div className="flex h-[76px] items-center justify-between border-b border-slate-100 px-6">
          <NavLink
            to="/dashboard"
            onClick={closeSidebar}
            className="flex items-center gap-2.5"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <FileText
                size={20}
                strokeWidth={2.2}
              />

              <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full border border-indigo-600 bg-cyan-300" />
            </div>

            <span className="text-xl font-bold tracking-tight text-slate-900">
              Resume
              <span className="text-indigo-600">
                IQ
              </span>
            </span>
          </NavLink>

          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* -------------------------------------------------
            NAVIGATION
        -------------------------------------------------- */}

        <div className="flex-1 overflow-y-auto px-4 py-6">
          {/* Workspace */}

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[1.5px] text-slate-400">
            Workspace
          </p>

          <nav className="space-y-1">
            {/* Dashboard */}

            <NavLink
              to="/dashboard"
              end
              onClick={closeSidebar}
              className={navLinkClass}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            {/* Analyze Resume */}

            <NavLink
              to="/analyzer"
              end
              onClick={closeSidebar}
              className={navLinkClass}
            >
              <FileSearch size={18} />
              Analyze Resume
            </NavLink>

            {/* Analysis History */}

            <NavLink
              to="/history"
              end
              onClick={closeSidebar}
              className={historyLinkClass}
            >
              <History size={18} />
              Analysis History
            </NavLink>
          </nav>

          {/* Preferences */}

          <p className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[1.5px] text-slate-400">
            Preferences
          </p>

          <nav className="space-y-1">
            {/* Settings */}

            <NavLink
              to="/settings"
              end
              onClick={closeSidebar}
              className={navLinkClass}
            >
              <Settings size={18} />
              Settings
            </NavLink>

            {/* Privacy & Security */}

            <NavLink
              to="/privacy"
              onClick={closeSidebar}
              className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
            >
              <ShieldCheck size={18} />
              Privacy & Security
            </NavLink>

            {/* Help & Support */}

            <NavLink
              to="/help"
              end
              onClick={closeSidebar}
              className={navLinkClass}
            >
              <CircleHelp size={18} />
              Help & Support
            </NavLink>
          </nav>
        </div>

        {/* -------------------------------------------------
            USER AREA
        -------------------------------------------------- */}

        <div className="border-t border-slate-100 p-4">
          <NavLink
            to="/settings"
            onClick={closeSidebar}
            className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 transition hover:bg-indigo-50"
          >
            {/* Profile photo */}

            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt={displayName}
                className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                <UserRound size={20} />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                {displayName}
              </p>

              <p className="truncate text-xs text-slate-500">
                {displayEmail}
              </p>
            </div>
          </NavLink>

          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogOut size={17} />

            {loggingOut
              ? "Signing out..."
              : "Sign out"}
          </button>

          {logoutError && (
            <p
              role="alert"
              className="mt-2 px-3 text-xs leading-5 text-red-600"
            >
              {logoutError}
            </p>
          )}
        </div>
      </aside>

      {/* =====================================================
          MAIN WORKSPACE
      ====================================================== */}

      <div className="min-h-screen lg:pl-64">
        {/* -------------------------------------------------
            TOPBAR
        -------------------------------------------------- */}

        <header className="sticky top-0 z-30 flex h-[76px] items-center border-b border-slate-200 bg-white/95 px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            {/* Mobile menu */}

            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="text-xs text-slate-400">
                Workspace / {getPageTitle()}
              </p>

              <h1 className="mt-0.5 text-base font-bold text-slate-900">
                {getPageTitle()}
              </h1>
            </div>
          </div>
        </header>

        {/* -------------------------------------------------
            PAGE CONTENT
        -------------------------------------------------- */}

        <Outlet />
      </div>
    </div>
  );
}