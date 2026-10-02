import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Analyzer from "./pages/Analyzer";
import Analysis from "./pages/Analysis";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Help from "./pages/Help";
import Settings from "./pages/Settings";
import History from "./pages/History";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import DashboardLayout from "./components/layout/DashboardLayout";

export default function App() {
  return (
    <Routes>
      {/* =====================================================
          PUBLIC-ONLY PAGES
      ====================================================== */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* =====================================================
          PUBLIC INFORMATIONAL PAGES
      ====================================================== */}
      <Route path="/terms" element={<Terms />} />

      {/* =====================================================
          PROTECTED WORKSPACE
      ====================================================== */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/history" element={<History />} />
          <Route path="/analysis/:id" element={<Analysis />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<Privacy />} />
        </Route>
      </Route>

      {/* =====================================================
          UNKNOWN ROUTES
      ====================================================== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}