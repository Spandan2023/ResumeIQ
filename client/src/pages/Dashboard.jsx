import { Link } from "react-router-dom";

import {
  FileText,
  Clock3,
  Plus,
  ArrowUpRight,
  FileSearch,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  History,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

/*
 * ============================================================
 * DASHBOARD
 * ============================================================
 *
 * The authenticated workspace dashboard.
 *
 * Layout responsibilities such as:
 * - Sidebar
 * - Mobile sidebar
 * - Topbar
 * - User profile
 * - Logout
 *
 * are handled by DashboardLayout.jsx.
 *
 * This page is responsible only for dashboard content.
 * ============================================================
 */

export default function Dashboard() {
  const { user } = useAuth();

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

  /*
   * Use the first word of the user's name in the welcome
   * message.
   */

  const firstName =
    displayName.split(" ")[0] || displayName;

  return (
    <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
      {/* =================================================
          WELCOME
      ================================================== */}

      <section className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
            <Sparkles size={14} />

            Your career workspace
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Welcome, {firstName}
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Analyze your resume against job descriptions,
            discover skill gaps, and get actionable
            recommendations to improve your application.
          </p>
        </div>

        <Link
          to="/analyzer"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          <Plus size={18} />

          New Analysis
        </Link>
      </section>

      {/* =================================================
          SUMMARY CARDS
      ================================================== */}

      <section className="mb-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          icon={<FileSearch size={20} />}
          title="Resume Analyses"
          value="—"
          description="Your completed analyses"
          color="indigo"
        />

        <SummaryCard
          icon={<Clock3 size={20} />}
          title="Recent Activity"
          value="—"
          description="Your latest analysis activity"
          color="blue"
        />

        <SummaryCard
          icon={<ShieldCheck size={20} />}
          title="Account Status"
          value="Active"
          description={`Signed in as ${displayEmail}`}
          color="green"
        />
      </section>

      {/* =================================================
          RECENT ANALYSES
      ================================================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Recent Analyses
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Your resume analysis history
            </p>
          </div>

          <History
            size={20}
            className="text-slate-400"
          />
        </div>

        {/*
         * Recent analysis API integration will be connected
         * here in the next step.
         */}

        <div className="flex min-h-[310px] flex-col items-center justify-center px-6 py-10 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <FileText
              size={29}
              strokeWidth={1.7}
            />
          </div>

          <h4 className="text-lg font-bold text-slate-800">
            No analyses yet
          </h4>

          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
            Your completed resume analyses will appear
            here. Start by uploading your resume and adding
            a job description.
          </p>

          <Link
            to="/analyzer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
          >
            Analyze your resume

            <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      {/* =================================================
          INFORMATION BANNER
      ================================================== */}

      <section className="mt-8 overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
              <Sparkles size={21} />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">
                Make every application count
              </h3>

              <p className="mt-1 max-w-lg text-sm leading-6 text-slate-600">
                Understand how your resume aligns with a job
                description and identify areas you can improve
                before applying.
              </p>
            </div>
          </div>

          <Link
            to="/analyzer"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-indigo-700 transition hover:gap-3"
          >
            Start analyzing

            <ChevronRight size={17} />
          </Link>
        </div>
      </section>

      {/* =================================================
          FOOTER
      ================================================== */}

      <footer className="mt-10 flex flex-col justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} ResumeIQ. All rights
          reserved.
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
  );
}

/*
 * ============================================================
 * REUSABLE DASHBOARD COMPONENT
 * ============================================================
 */

function SummaryCard({
  icon,
  title,
  value,
  description,
  color,
}) {
  const colorClasses = {
    indigo: "bg-indigo-50 text-indigo-600",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            colorClasses[color] ||
            colorClasses.indigo
          }`}
        >
          {icon}
        </div>

        <ArrowUpRight
          size={17}
          className="text-slate-300"
        />
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-400">
        {description}
      </p>
    </div>
  );
}