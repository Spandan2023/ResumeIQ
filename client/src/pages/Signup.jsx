import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  LockKeyhole,
  Mail,
  User,
  Sparkles,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

/*
 * ============================================================
 * GOOGLE SIGNUP BUTTON
 * ============================================================
 *
 * Uses the same Google Identity Services browser flow as the
 * working Google Login page.
 *
 * Google returns a credential.
 * That credential is passed to AuthContext.
 *
 * AuthContext -> POST /api/auth/google
 *
 * The JWT remains inside the HttpOnly cookie.
 * ============================================================
 */

function GoogleSignupButton({ loading, onSuccess, onError }) {
  const buttonRef = useRef(null);

  const googleClientId =
    import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!googleClientId) {
      onError(
        "Google signup is not configured. Please check VITE_GOOGLE_CLIENT_ID.",
      );
      return;
    }

    let cancelled = false;

    const initializeGoogle = () => {
      if (
        cancelled ||
        !window.google?.accounts?.id ||
        !buttonRef.current
      ) {
        return;
      }

      buttonRef.current.innerHTML = "";

      window.google.accounts.id.initialize({
        client_id: googleClientId,

        callback: (response) => {
          if (cancelled) {
            return;
          }

          if (!response?.credential) {
            onError(
              "Google did not return a valid credential.",
            );
            return;
          }

          onSuccess(response.credential);
        },

        auto_select: false,
        cancel_on_tap_outside: true,
      });

      window.google.accounts.id.renderButton(
        buttonRef.current,
        {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "signup_with",
          shape: "rectangular",
          width: 320,
          logo_alignment: "left",
        },
      );
    };

    if (window.google?.accounts?.id) {
      initializeGoogle();
      return () => {
        cancelled = true;
      };
    }

    const existingScript = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]',
    );

    if (existingScript) {
      existingScript.addEventListener(
        "load",
        initializeGoogle,
      );

      return () => {
        cancelled = true;

        existingScript.removeEventListener(
          "load",
          initializeGoogle,
        );
      };
    }

    const script = document.createElement("script");

    script.src =
      "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;

    script.onload = initializeGoogle;

    script.onerror = () => {
      if (!cancelled) {
        onError(
          "Unable to load Google Sign-In. Please try again.",
        );
      }
    };

    document.head.appendChild(script);

    return () => {
      cancelled = true;
    };
  }, [googleClientId, onSuccess, onError]);

  return (
    <div
      className={`flex min-h-[44px] w-full justify-center ${
        loading
          ? "pointer-events-none opacity-60"
          : ""
      }`}
    >
      <div
        ref={buttonRef}
        className="h-10 w-[320px] max-w-full overflow-hidden rounded-xl"
      />
    </div>
  );
}

/*
 * ============================================================
 * SIGNUP PAGE
 * ============================================================
 */

export default function Signup() {
  const navigate = useNavigate();

  const {
    signup: signupRequest,
    googleLogin,
  } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [agreeToTerms, setAgreeToTerms] =
    useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] =
    useState(false);

  /*
   * ----------------------------------------------------------
   * INPUT CHANGE
   * ----------------------------------------------------------
   */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  /*
   * ----------------------------------------------------------
   * NORMAL EMAIL/PASSWORD SIGNUP
   * ----------------------------------------------------------
   */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setError("");

    const {
      name,
      email,
      password,
      confirmPassword,
    } = formData;

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all the fields.");
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters long.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreeToTerms) {
      setError(
        "Please accept the Terms of Service and Privacy Policy.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await signupRequest({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      if (!response?.success) {
        setError(
          response?.message ||
            "Unable to create your account. Please try again.",
        );

        return;
      }

      navigate("/dashboard", {
        replace: true,
      });
    } catch (signupError) {
      console.error(
        "Signup error:",
        signupError,
      );

      setError(
        signupError?.response?.data?.message ||
          "Unable to create your account. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * ----------------------------------------------------------
   * GOOGLE SIGNUP
   * ----------------------------------------------------------
   *
   * Google signup does not require the email/password fields.
   *
   * The backend Google endpoint will:
   * - verify the Google credential
   * - find an existing account or create one
   * - authenticate the user
   * - set the HttpOnly cookie
   */

  const handleGoogleSuccess = async (
    credential,
  ) => {
    if (loading) {
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await googleLogin(
        credential,
      );

      if (!response?.success) {
        setError(
          response?.message ||
            "Unable to create your account with Google.",
        );

        return;
      }

      navigate("/dashboard", {
        replace: true,
      });
    } catch (googleError) {
      console.error(
        "Google signup error:",
        googleError,
      );

      setError(
        googleError?.response?.data?.message ||
          "Google signup failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = (message) => {
    setError(
      message ||
        "Google signup failed. Please try again.",
    );
  };

  /*
   * ----------------------------------------------------------
   * INPUT STYLE
   * ----------------------------------------------------------
   */

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  /*
   * ----------------------------------------------------------
   * UI
   * ----------------------------------------------------------
   */

  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* ==================================================
            LEFT: SIGNUP FORM
        =================================================== */}
        <section className="flex flex-col px-6 py-8 sm:px-12 lg:px-16 xl:px-24">
          {/* Logo */}
          <Link
            to="/"
            className="flex w-fit items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <FileText
                size={21}
                strokeWidth={2.3}
              />
            </div>

            <span className="text-xl font-bold tracking-tight text-slate-900">
              Resume
              <span className="text-blue-600">
                IQ
              </span>
            </span>
          </Link>

          {/* Form Container */}
          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
            <div className="mb-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                <Sparkles size={14} />
                Start your career journey
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Create your account
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Join ResumeIQ to analyze your resume,
                identify skill gaps, and prepare for your
                next opportunity.
              </p>
            </div>

            {/* =================================================
                GOOGLE SIGNUP
            ================================================== */}
            <div className="mb-6">
              <GoogleSignupButton
                loading={loading}
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>

            {/* Divider */}
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                or continue with email
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    className={inputClass}
                    minLength={8}
                    required
                    disabled={loading}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (previous) => !previous,
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Use at least 8 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={inputClass}
                    required
                    disabled={loading}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (previous) => !previous,
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) =>
                    setAgreeToTerms(
                      e.target.checked,
                    )
                  }
                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 accent-blue-600"
                  disabled={loading}
                />

                <label
                  htmlFor="terms"
                  className="text-sm leading-6 text-slate-500"
                >
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Privacy Policy
                  </Link>
                  .
                </label>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600"
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating account..."
                  : "Create account"}

                {!loading && (
                  <ArrowRight size={18} />
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Sign in
              </Link>
            </p>

            {/* Back to Home */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-5 text-center text-sm font-medium text-slate-400 transition hover:text-slate-700"
              disabled={loading}
            >
              ← Back to home
            </button>
          </div>

          <p className="text-center text-xs text-slate-400">
            © {new Date().getFullYear()} ResumeIQ. All
            rights reserved.
          </p>
        </section>

        {/* ==================================================
            RIGHT: BRAND SHOWCASE
        =================================================== */}
        <section className="relative hidden overflow-hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          {/* Background Decoration */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

          {/* Top Label */}
          <div className="relative z-10 flex items-center gap-2 text-sm font-medium text-slate-300">
            <Sparkles
              size={17}
              className="text-blue-400"
            />

            Smarter resumes. Better opportunities.
          </div>

          {/* Main Content */}
          <div className="relative z-10 mx-auto w-full max-w-lg py-12">
            <div className="mb-8 inline-flex rounded-2xl border border-white/10 bg-white/5 p-4">
              <FileText
                size={32}
                className="text-blue-400"
              />
            </div>

            <h2 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
              Your next opportunity starts
              with a{" "}
              <span className="text-blue-400">
                stronger resume.
              </span>
            </h2>

            <p className="mt-6 text-base leading-7 text-slate-400">
              Understand how your resume aligns with a
              job description. Discover missing skills,
              identify improvement areas, and make more
              informed career decisions.
            </p>

            {/* Feature List */}
            <div className="mt-10 space-y-5">
              {[
                "Analyze resume and job description alignment",
                "Identify matched and missing skills",
                "Get actionable resume improvement suggestions",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-blue-400"
                  />

                  <span className="text-sm text-slate-300">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Mock Analysis Card */}
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Resume analysis
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Sample interface preview
                  </p>
                </div>

                <span className="rounded-full bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-300">
                  Preview
                </span>
              </div>

              <div className="mt-6 flex items-center gap-5">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-blue-400/30">
                  <span className="text-2xl font-bold text-blue-300">
                    IQ
                  </span>
                </div>

                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">
                    Resume insights
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Explore skills alignment and
                    personalized recommendations for your
                    target role.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="relative z-10 flex items-center justify-between text-xs text-slate-500">
            <span>Built for your career journey</span>
            <span>ResumeIQ</span>
          </div>
        </section>
      </div>
    </div>
  );
}