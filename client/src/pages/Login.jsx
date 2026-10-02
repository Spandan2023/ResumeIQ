import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  FileText,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const GOOGLE_SCRIPT_URL =
  "https://accounts.google.com/gsi/client";

// ----------------------------------
// Load Google Identity Services
// ----------------------------------

const loadGoogleIdentityServices = () => {
  return new Promise((resolve, reject) => {
    if (
      window.google?.accounts?.id
    ) {
      resolve(window.google);
      return;
    }

    const existingScript =
      document.querySelector(
        `script[src="${GOOGLE_SCRIPT_URL}"]`
      );

    if (existingScript) {
      existingScript.addEventListener(
        "load",
        () => resolve(window.google),
        { once: true }
      );

      existingScript.addEventListener(
        "error",
        () =>
          reject(
            new Error(
              "Unable to load Google Sign-In."
            )
          ),
        { once: true }
      );

      return;
    }

    const script =
      document.createElement("script");

    script.src = GOOGLE_SCRIPT_URL;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (
        window.google?.accounts?.id
      ) {
        resolve(window.google);
      } else {
        reject(
          new Error(
            "Google Sign-In loaded incorrectly."
          )
        );
      }
    };

    script.onerror = () => {
      reject(
        new Error(
          "Unable to load Google Sign-In."
        )
      );
    };

    document.head.appendChild(script);
  });
};

// ----------------------------------
// Extract useful API error message
// ----------------------------------

const getErrorMessage = (
  error,
  fallbackMessage
) => {
  return (
    error?.response?.data?.message ||
    error?.message ||
    fallbackMessage
  );
};

// ----------------------------------
// Login Page
// ----------------------------------

export default function Login() {
  const navigate = useNavigate();

  const {
    login,
    googleLogin,
  } = useAuth();

  const googleButtonRef =
    useRef(null);

  const [
    googleReady,
    setGoogleReady,
  ] = useState(false);

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
      rememberMe: false,
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ----------------------------------
  // Environment configuration
  // ----------------------------------

  const googleClientId =
    import.meta.env
      .VITE_GOOGLE_CLIENT_ID;

  // ----------------------------------
  // Input change
  // ----------------------------------

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setError("");
  };

  // ----------------------------------
  // Email/password login
  // ----------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email =
      formData.email.trim();

    const password =
      formData.password;

    if (!email || !password) {
      setError(
        "Please enter your email and password."
      );

      return;
    }

    setLoading(true);

    try {
      await login({
        email,
        password,
      });

      // The backend has already created
      // the HttpOnly authentication cookie.
      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      setError(
        getErrorMessage(
          error,
          "Unable to sign in. Please check your credentials and try again."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------
  // Google credential callback
  // ----------------------------------

  const handleGoogleCredential =
    useCallback(
      async (response) => {
        if (
          !response?.credential
        ) {
          setError(
            "Google did not return a valid authentication credential."
          );

          return;
        }

        setError("");
        setLoading(true);

        try {
          await googleLogin(
            response.credential
          );

          navigate("/dashboard", {
            replace: true,
          });
        } catch (error) {
          setError(
            getErrorMessage(
              error,
              "Google sign-in failed. Please try again."
            )
          );
        } finally {
          setLoading(false);
        }
      },
      [
        googleLogin,
        navigate,
      ]
    );

  // ----------------------------------
  // Initialize Google Sign-In
  // ----------------------------------

  useEffect(() => {
    let cancelled = false;

    const initializeGoogleSignIn =
      async () => {
        if (!googleClientId) {
          setGoogleReady(false);
          return;
        }

        try {
          const google =
            await loadGoogleIdentityServices();

          if (
            cancelled ||
            !googleButtonRef.current
          ) {
            return;
          }

          // Clear any previously rendered button
          googleButtonRef.current.innerHTML =
            "";

          google.accounts.id.initialize({
            client_id:
              googleClientId,

            callback:
              handleGoogleCredential,

            auto_select: false,
          });

          google.accounts.id.renderButton(
            googleButtonRef.current,
            {
              type: "standard",
              theme: "outline",
              size: "large",
              text: "signin_with",
              shape: "rectangular",
              logo_alignment: "left",
            }
          );

          if (!cancelled) {
            setGoogleReady(true);
          }
        } catch (error) {
          console.error(
            "Google Sign-In initialization failed:",
            error
          );

          if (!cancelled) {
            setGoogleReady(false);
          }
        }
      };

    initializeGoogleSignIn();

    return () => {
      cancelled = true;
    };
  }, [
    googleClientId,
    handleGoogleCredential,
  ]);

  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* ======================================
            LEFT SIDE - LOGIN FORM
        ====================================== */}
        <div className="flex flex-col">
          {/* Brand navbar */}
          <header className="flex h-[76px] items-center justify-between px-6 sm:px-10 lg:px-14">
            <Link
              to="/"
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
            </Link>

            <Link
              to="/signup"
              className="text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
            >
              Create account
            </Link>
          </header>

          {/* Form content */}
          <main className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
            <div className="w-full max-w-[420px]">
              {/* Heading */}
              <div className="mb-8">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                  <Sparkles size={14} />
                  Welcome back to ResumeIQ
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Sign in to your account
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Continue your career journey.
                  Access your resume analyses
                  and track your progress.
                </p>
              </div>

              {/* Login form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
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
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={
                        formData.email
                      }
                      onChange={
                        handleChange
                      }
                      required
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        setError(
                          "Password recovery will be available in a future update."
                        )
                      }
                      className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-800"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={
                        formData.password
                      }
                      onChange={
                        handleChange
                      }
                      required
                      disabled={loading}
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-50"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (prev) =>
                            !prev
                        )
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      {showPassword ? (
                        <EyeOff
                          size={18}
                        />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={
                        formData.rememberMe
                      }
                      onChange={
                        handleChange
                      }
                      disabled={loading}
                      className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-indigo-600 focus:ring-indigo-500"
                    />

                    <span className="text-sm text-slate-600">
                      Remember me
                    </span>
                  </label>

                  <div className="flex items-center gap-1.5 text-xs text-emerald-600">
                    <ShieldCheck
                      size={15}
                    />
                    Secure login
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
                  >
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <LoaderCircle
                        size={18}
                        className="animate-spin"
                      />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight
                        size={18}
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Google Sign-In */}
              <div className="my-7">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-200" />

                  <span className="text-xs font-medium text-slate-400">
                    OR CONTINUE WITH
                  </span>

                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div
                  className={`mt-5 flex min-h-11 justify-center transition ${
                    loading
                      ? "pointer-events-none opacity-60"
                      : ""
                  }`}
                >
                  {googleClientId ? (
                    <div
                      ref={
                        googleButtonRef
                      }
                      aria-label="Continue with Google"
                    />
                  ) : (
                    <div className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-xs leading-5 text-slate-500">
                      Google Sign-In is
                      not configured
                      yet. Add
                      VITE_GOOGLE_CLIENT_ID
                      to the frontend
                      environment file.
                    </div>
                  )}
                </div>

                {!googleReady &&
                  googleClientId && (
                    <p className="mt-2 text-center text-[11px] text-slate-400">
                      Loading Google Sign-In...
                    </p>
                  )}
              </div>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-xs font-medium text-slate-400">
                  NEW TO RESUMEIQ?
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              {/* Signup link */}
              <Link
                to="/signup"
                className="flex h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
              >
                Create a free account
              </Link>

              {/* Guest access */}
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() =>
                    navigate("/")
                  }
                  className="text-sm font-medium text-slate-500 transition hover:text-indigo-600"
                >
                  Continue as guest
                  <ArrowRight
                    size={14}
                    className="ml-1 inline"
                  />
                </button>
              </div>

              {/* Terms */}
              <p className="mt-10 text-center text-xs leading-6 text-slate-400">
                By continuing, you agree
                to our{" "}
                <Link
                  to="/terms"
                  className="font-medium text-slate-600 underline underline-offset-2 hover:text-indigo-600"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="font-medium text-slate-600 underline underline-offset-2 hover:text-indigo-600"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </main>

          {/* Footer */}
          <footer className="px-6 py-5 text-center text-xs text-slate-400 sm:px-10">
            ©{" "}
            {new Date().getFullYear()}{" "}
            ResumeIQ. All rights reserved.
          </footer>
        </div>

        {/* ======================================
            RIGHT SIDE - BRAND SHOWCASE
        ====================================== */}
        <aside className="relative hidden overflow-hidden bg-[#11132D] lg:flex lg:flex-col lg:justify-between">
          {/* Decorative background */}
          <div className="absolute -right-32 -top-32 h-[450px] w-[450px] rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="absolute -bottom-32 -left-32 h-[450px] w-[450px] rounded-full bg-violet-500/20 blur-3xl" />

          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0c_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Content */}
          <div className="relative z-10 flex flex-1 flex-col justify-center px-12 py-16 xl:px-20">
            <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-indigo-200">
              <Sparkles size={15} />
              Smarter resume analysis
            </div>

            <h2 className="max-w-xl text-4xl font-bold leading-[1.2] tracking-tight text-white xl:text-5xl">
              Your next opportunity starts
              with a{" "}
              <span className="text-indigo-400">
                stronger resume.
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-8 text-slate-300">
              Understand how your skills align
              with a job description, identify
              missing qualifications, and make
              informed improvements to your
              resume.
            </p>

            {/* Feature list */}
            <div className="mt-10 space-y-5">
              <Feature
                title="Understand your match"
                description="See how your resume aligns with a specific job description."
              />

              <Feature
                title="Discover skill gaps"
                description="Identify relevant skills that may be missing from your resume."
              />

              <Feature
                title="Get actionable feedback"
                description="Receive structured recommendations to improve your application."
              />
            </div>

            {/* Product preview */}
            <div className="mt-12 max-w-md rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300">
                    <FileText size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Resume analysis
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Sample interface preview
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                  Preview
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-300">
                      Skills alignment
                    </span>

                    <span className="text-indigo-300">
                      Illustration
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-3/4 rounded-full bg-indigo-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-slate-400">
                      Skill analysis
                    </p>

                    <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-emerald-300">
                      <CheckCircle2
                        size={15}
                      />
                      Matched skills
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-xs text-slate-400">
                      Improvement
                    </p>

                    <p className="mt-2 text-sm font-semibold text-amber-300">
                      Skill gaps
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-md text-xs leading-5 text-slate-500">
              ResumeIQ provides
              resume-to-job-description
              alignment insights. Match scores
              are not probabilities of employment.
            </p>
          </div>

          {/* Bottom footer */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/10 px-12 py-6 xl:px-20">
            <p className="text-xs text-slate-500">
              Built for your next career move.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck
                size={15}
              />
              Privacy-conscious design
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// =========================================
// Reusable feature component
// =========================================

function Feature({
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
        <CheckCircle2 size={16} />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}