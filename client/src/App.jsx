
import { Routes, Route } from "react-router-dom";

function Landing() {
  return <main>ResumeIQ Landing Page</main>;
}

function Login() {
  return <main>Login Page</main>;
}

function Signup() {
  return <main>Signup Page</main>;
}

function Dashboard() {
  return <main>Dashboard</main>;
}

function Analysis() {
  return <main>Analysis Results</main>;
}

function Privacy() {
  return <main>Privacy Policy</main>;
}

function Terms() {
  return <main>Terms & Conditions</main>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />
      <Route
        path="/analysis/:id"
        element={<Analysis />}
      />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
    </Routes>
  );
}