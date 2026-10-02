import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";



import { Link } from "react-router-dom";

import { useState } from "react";



import { useAuth } from "../context/AuthContext";

import api from "../services/api";



export default function Settings() {

  const { user } = useAuth();



  const currentUser = user?.data || user || {};



  const displayName =

    currentUser.name?.trim() || "User";



  const displayEmail =

    currentUser.email?.trim() ||

    "ResumeIQ account";



  const [showCurrentPassword, setShowCurrentPassword] =

    useState(false);



  const [showNewPassword, setShowNewPassword] =

    useState(false);



  const [showConfirmPassword, setShowConfirmPassword] =

    useState(false);



  const [currentPassword, setCurrentPassword] =

    useState("");



  const [newPassword, setNewPassword] =

    useState("");



  const [confirmPassword, setConfirmPassword] =

    useState("");



  const [error, setError] = useState("");



  const [success, setSuccess] = useState("");



  const [loading, setLoading] = useState(false);



  const handleSubmit = async (event) => {

    event.preventDefault();



    if (loading) {

      return;

    }



    setError("");

    setSuccess("");



    // ----------------------------------

    // Basic validation

    // ----------------------------------



    if (!currentPassword) {

      setError(

        "Please enter your current password.",

      );

      return;

    }



    if (!newPassword) {

      setError(

        "Please enter a new password.",

      );

      return;

    }



    if (newPassword.length < 8) {

      setError(

        "Your new password must be at least 8 characters long.",

      );

      return;

    }



    if (!confirmPassword) {

      setError(

        "Please confirm your new password.",

      );

      return;

    }



    if (newPassword !== confirmPassword) {

      setError(

        "New password and confirmation do not match.",

      );

      return;

    }



    if (currentPassword === newPassword) {

      setError(

        "Your new password must be different from your current password.",

      );

      return;

    }



    // ----------------------------------

    // Change password API

    // ----------------------------------



    try {

      setLoading(true);



      const response = await api.patch(

        "/auth/password",

        {

          currentPassword,

          newPassword,

          confirmPassword,

        },

      );



      if (!response.data?.success) {

        setError(

          response.data?.message ||

            "Unable to change your password. Please try again.",

        );

        return;

      }



      setSuccess(

        response.data?.message ||

          "Password changed successfully.",

      );



      // Clear the form after success.

      setCurrentPassword("");

      setNewPassword("");

      setConfirmPassword("");



      // Reset visibility states.

      setShowCurrentPassword(false);

      setShowNewPassword(false);

      setShowConfirmPassword(false);

    } catch (submitError) {

      console.error(

        "Password change error:",

        submitError,

      );



      const status =

        submitError?.response?.status;



      const message =

        submitError?.response?.data?.message;



      if (status === 401) {

        setError(

          message ||

            "Current password is incorrect.",

        );

      } else if (status === 400) {

        setError(

          message ||

            "Please check the password details and try again.",

        );

      } else if (status === 404) {

        setError(

          message ||

            "Your account could not be found.",

        );

      } else {

        setError(

          message ||

            "Unable to change your password. Please try again.",

        );

      }

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="min-h-screen bg-[#F8F9FC] text-slate-900">

      {/* Main */}

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">

        {/* Page heading */}

        <section>

          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700">

            <ShieldCheck size={14} />

            Account Settings

          </div>



          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">

            Settings

          </h1>



          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">

            Manage your account security and password.

            Your login email cannot be changed from

            ResumeIQ.

          </p>

        </section>



        {/* Account information */}

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5 sm:px-7">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                <Mail size={19} />

              </div>



              <div>

                <h2 className="text-base font-bold text-slate-900">

                  Account Information

                </h2>



                <p className="mt-1 text-xs text-slate-500">

                  Your account details

                </p>

              </div>

            </div>

          </div>



          <div className="grid gap-5 px-6 py-6 sm:grid-cols-2 sm:px-7">

            {/* Name */}

            <div>

              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">

                Name

              </label>



              <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-700">

                {displayName}

              </div>

            </div>



            {/* Email */}

            <div>

              <label className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">

                Email

              </label>



              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">

                <Mail

                  size={17}

                  className="shrink-0 text-slate-400"

                />



                <span className="truncate text-sm font-medium text-slate-700">

                  {displayEmail}

                </span>



                <span className="ml-auto shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">

                  Read only

                </span>

              </div>

            </div>

          </div>

        </section>



        {/* Password section */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5 sm:px-7">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                <LockKeyhole size={19} />

              </div>



              <div>

                <h2 className="text-base font-bold text-slate-900">

                  Change Password

                </h2>



                <p className="mt-1 text-xs text-slate-500">

                  Update the password used to sign in

                  to your account.

                </p>

              </div>

            </div>

          </div>



          <form

            onSubmit={handleSubmit}

            className="px-6 py-6 sm:px-7"

          >

            <div className="max-w-xl space-y-5">

              {/* Current Password */}

              <div>

                <label

                  htmlFor="currentPassword"

                  className="text-sm font-semibold text-slate-700"

                >

                  Current Password

                </label>



                <div className="relative mt-2">

                  <input

                    id="currentPassword"

                    type={

                      showCurrentPassword

                        ? "text"

                        : "password"

                    }

                    value={currentPassword}

                    onChange={(event) => {

                      setCurrentPassword(

                        event.target.value,

                      );

                      setError("");

                      setSuccess("");

                    }}

                    autoComplete="current-password"

                    placeholder="Enter your current password"

                    disabled={loading}

                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:bg-slate-50"

                  />



                  <button

                    type="button"

                    onClick={() =>

                      setShowCurrentPassword(

                        (value) => !value,

                      )

                    }

                    disabled={loading}

                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"

                    aria-label={

                      showCurrentPassword

                        ? "Hide current password"

                        : "Show current password"

                    }

                  >

                    {showCurrentPassword ? (

                      <EyeOff size={17} />

                    ) : (

                      <Eye size={17} />

                    )}

                  </button>

                </div>

              </div>



              {/* New Password */}

              <div>

                <label

                  htmlFor="newPassword"

                  className="text-sm font-semibold text-slate-700"

                >

                  New Password

                </label>



                <div className="relative mt-2">

                  <input

                    id="newPassword"

                    type={

                      showNewPassword

                        ? "text"

                        : "password"

                    }

                    value={newPassword}

                    onChange={(event) => {

                      setNewPassword(

                        event.target.value,

                      );

                      setError("");

                      setSuccess("");

                    }}

                    autoComplete="new-password"

                    placeholder="Enter your new password"

                    disabled={loading}

                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:bg-slate-50"

                  />



                  <button

                    type="button"

                    onClick={() =>

                      setShowNewPassword(

                        (value) => !value,

                      )

                    }

                    disabled={loading}

                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"

                    aria-label={

                      showNewPassword

                        ? "Hide new password"

                        : "Show new password"

                    }

                  >

                    {showNewPassword ? (

                      <EyeOff size={17} />

                    ) : (

                      <Eye size={17} />

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

                  className="text-sm font-semibold text-slate-700"

                >

                  Confirm New Password

                </label>



                <div className="relative mt-2">

                  <input

                    id="confirmPassword"

                    type={

                      showConfirmPassword

                        ? "text"

                        : "password"

                    }

                    value={confirmPassword}

                    onChange={(event) => {

                      setConfirmPassword(

                        event.target.value,

                      );

                      setError("");

                      setSuccess("");

                    }}

                    autoComplete="new-password"

                    placeholder="Re-enter your new password"

                    disabled={loading}

                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:bg-slate-50"

                  />



                  <button

                    type="button"

                    onClick={() =>

                      setShowConfirmPassword(

                        (value) => !value,

                      )

                    }

                    disabled={loading}

                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"

                    aria-label={

                      showConfirmPassword

                        ? "Hide password confirmation"

                        : "Show password confirmation"

                    }

                  >

                    {showConfirmPassword ? (

                      <EyeOff size={17} />

                    ) : (

                      <Eye size={17} />

                    )}

                  </button>

                </div>

              </div>



              {/* Error */}

              {error && (

                <div

                  role="alert"

                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-600"

                >

                  {error}

                </div>

              )}



              {/* Success */}

              {success && (

                <div

                  role="status"

                  className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700"

                >

                  {success}

                </div>

              )}



              {/* Submit */}

              <button

                type="submit"

                disabled={loading}

                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"

              >

                <LockKeyhole size={17} />



                {loading

                  ? "Updating password..."

                  : "Change Password"}

              </button>

            </div>

          </form>

        </section>



        {/* Security note */}

        <section className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 sm:p-6">

          <div className="flex items-start gap-3">

            <ShieldCheck

              size={20}

              className="mt-0.5 shrink-0 text-indigo-600"

            />



            <div>

              <h3 className="text-sm font-bold text-slate-900">

                Account security

              </h3>



              <p className="mt-1 text-sm leading-6 text-slate-600">

                Your authentication session is managed

                by ResumeIQ. Never share your password

                or authentication information with

                anyone.

              </p>

            </div>

          </div>

        </section>



        {/* Footer */}

        <footer className="mt-10 flex flex-col justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">

          <p>

            © {new Date().getFullYear()} ResumeIQ.

            All rights reserved.

          </p>



          <div className="flex items-center gap-5">

            <Link

              to="/privacy"

              className="transition hover:text-indigo-600"

            >

              Privacy

            </Link>



            <Link

              to="/terms"

              className="transition hover:text-indigo-600"

            >

              Terms

            </Link>

          </div>

        </footer>

      </main>

    </div>

  );

}