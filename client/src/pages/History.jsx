import {
  AlertCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileSearch,
  FileText,
  LoaderCircle,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import api from "../services/api";

const ITEMS_PER_PAGE = 10;

/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

const formatDate = (dateValue) => {
  if (!dateValue) return "Unknown date";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (dateValue) => {
  if (!dateValue) return "Unknown date";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const truncateText = (text, maxLength = 260) => {
  if (!text) return "No job description available.";

  const cleaned = String(text).replace(/\s+/g, " ").trim();

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  return `${cleaned.slice(0, maxLength).trim()}...`;
};

const getResumeTypeLabel = (fileType, fileName) => {
  if (
    fileType === "application/pdf" ||
    fileName?.toLowerCase().endsWith(".pdf")
  ) {
    return "PDF";
  }

  if (
    fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName?.toLowerCase().endsWith(".docx")
  ) {
    return "DOCX";
  }

  return "Resume";
};

/*
 * ============================================================
 * HISTORY CARD
 * ============================================================
 */

function HistoryCard({ analysis, onDelete, deletingId }) {
  const isDeleting = deletingId === analysis._id;

  const matchScore =
    typeof analysis.matchScore === "number"
      ? Math.round(analysis.matchScore)
      : null;

  const resumeType = getResumeTypeLabel(
    analysis.resume?.fileType,
    analysis.resume?.fileName
  );

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Delete this analysis from your history? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    onDelete(analysis._id);
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:border-indigo-200 hover:shadow-md">
      <div className="p-5 sm:p-6">
        {/* Top row */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FileText size={19} strokeWidth={1.9} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-600">
                  Resume Analysis
                </p>

                <h2
                  className="mt-1 truncate text-sm font-bold text-slate-900"
                  title={analysis.resume?.fileName || "Resume"}
                >
                  {analysis.resume?.fileName || "Resume"}
                </h2>
              </div>
            </div>
          </div>

          {/* Match score */}
          <div className="flex shrink-0 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3.5 py-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
              <span className="text-sm font-bold text-indigo-600">
                {matchScore !== null ? `${matchScore}%` : "—"}
              </span>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Match
              </p>

              <p className="mt-0.5 text-xs font-semibold text-slate-600">
                Resume alignment
              </p>
            </div>
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
          <div className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} className="text-slate-400" />
            <span>Created {formatDate(analysis.createdAt)}</span>
          </div>

          <span className="hidden h-3 w-px bg-slate-200 sm:block" />

          <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-500">
            {resumeType}
          </span>

          {analysis.status && (
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700">
              {analysis.status === "completed"
                ? "Completed"
                : analysis.status}
            </span>
          )}
        </div>

        {/* Job description */}
        <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
          <div className="flex items-center gap-2">
            <FileSearch size={16} className="text-indigo-500" />

            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
              Job Description
            </p>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {truncateText(analysis.jobDescription)}
          </p>
        </div>

        {/* Footer actions */}
        <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">
            Saved on {formatDateTime(analysis.createdAt)}
          </p>

          <div className="flex items-center gap-2">
            <Link
              to={`/analysis/${analysis._id}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
            >
              <Eye size={16} />
              View Analysis
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? (
                <LoaderCircle
                  size={16}
                  className="animate-spin"
                />
              ) : (
                <Trash2 size={16} />
              )}

              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

/*
 * ============================================================
 * LOADING STATE
 * ============================================================
 */

function LoadingState() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <LoaderCircle size={27} className="animate-spin" />
      </div>

      <h2 className="mt-5 text-lg font-bold text-slate-900">
        Loading your history
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Fetching your saved resume analyses...
      </p>
    </div>
  );
}

/*
 * ============================================================
 * EMPTY STATE
 * ============================================================
 */

function EmptyState() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <FileSearch
          size={30}
          strokeWidth={1.7}
        />
      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-900">
        No analyses yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        Your completed resume analyses will appear here
        once you analyze a resume against a job description.
      </p>

      <Link
        to="/analyzer"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
      >
        <FileSearch size={17} />
        Analyze Your Resume
      </Link>
    </div>
  );
}

/*
 * ============================================================
 * ERROR STATE
 * ============================================================
 */

function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-2xl border border-red-100 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
        <AlertCircle size={27} />
      </div>

      <h2 className="mt-5 text-lg font-bold text-slate-900">
        Unable to load analysis history
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
      >
        Try Again
      </button>
    </div>
  );
}

/*
 * ============================================================
 * HISTORY PAGE
 * ============================================================
 */

export default function History() {
  const [analyses, setAnalyses] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: ITEMS_PER_PAGE,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  /*
   * ----------------------------------------------------------
   * LOAD HISTORY
   * ----------------------------------------------------------
   */

  const loadHistory = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/analysis/history", {
        params: {
          page,
          limit: ITEMS_PER_PAGE,
        },
      });

      /*
       * The backend currently returns the history payload.
       * Supporting both response.data and response.data.data
       * keeps the page tolerant of a standard API wrapper.
       */

      const payload =
        response?.data?.data ||
        response?.data ||
        {};

      const nextAnalyses = Array.isArray(
        payload.analyses
      )
        ? payload.analyses
        : [];

      const nextPagination =
        payload.pagination || {
          page,
          limit: ITEMS_PER_PAGE,
          total: nextAnalyses.length,
          totalPages:
            nextAnalyses.length > 0 ? 1 : 0,
          hasNextPage: false,
          hasPreviousPage: page > 1,
        };

      setAnalyses(nextAnalyses);
      setPagination(nextPagination);
    } catch (requestError) {
      console.error(
        "Failed to load analysis history:",
        requestError
      );

      setError(
        requestError?.response?.data?.message ||
          "We could not retrieve your saved analyses. Please try again."
      );

      setAnalyses([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  /*
   * ----------------------------------------------------------
   * DELETE ANALYSIS
   * ----------------------------------------------------------
   */

  const handleDelete = async (analysisId) => {
    setDeletingId(analysisId);
    setError("");

    try {
      await api.delete(
        `/analysis/${analysisId}`
      );

      /*
       * Reload from the backend so pagination and total
       * count stay synchronized with MongoDB after deletion.
       */

      if (analyses.length === 1 && page > 1) {
        setPage((currentPage) =>
          currentPage - 1
        );
      } else {
        await loadHistory();
      }
    } catch (requestError) {
      console.error(
        "Failed to delete analysis:",
        requestError
      );

      setError(
        requestError?.response?.data?.message ||
          "Unable to delete this analysis. Please try again."
      );
    } finally {
      setDeletingId("");
    }
  };

  /*
   * ----------------------------------------------------------
   * PAGINATION
   * ----------------------------------------------------------
   */

  const handlePreviousPage = () => {
    if (
      !pagination.hasPreviousPage ||
      loading
    ) {
      return;
    }

    setPage((currentPage) =>
      Math.max(currentPage - 1, 1)
    );
  };

  const handleNextPage = () => {
    if (
      !pagination.hasNextPage ||
      loading
    ) {
      return;
    }

    setPage((currentPage) =>
      currentPage + 1
    );
  };

  /*
   * ----------------------------------------------------------
   * RENDER
   * ----------------------------------------------------------
   */

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      {/* Page heading */}

      <section className="mb-9">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700">
          <FileSearch size={14} />
          Analysis History
        </div>

        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Your Analysis History
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Review your previously saved resume
              analyses, revisit the job descriptions
              you analyzed, or remove analyses you no
              longer need.
            </p>
          </div>

          {!loading && pagination.total > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs font-semibold text-slate-400">
                Saved Analyses
              </p>

              <p className="mt-0.5 text-lg font-bold text-slate-900">
                {pagination.total}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Error */}

      {error && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-4">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0 text-red-600"
          />

          <p className="text-sm leading-6 text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* Content */}

      {loading ? (
        <LoadingState />
      ) : analyses.length === 0 && !error ? (
        <EmptyState />
      ) : analyses.length > 0 ? (
        <>
          <section className="space-y-4">
            {analyses.map((analysis) => (
              <HistoryCard
                key={analysis._id}
                analysis={analysis}
                onDelete={handleDelete}
                deletingId={deletingId}
              />
            ))}
          </section>

          {/* Pagination */}

          {pagination.totalPages > 1 && (
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Page{" "}
                <span className="font-semibold text-slate-800">
                  {pagination.page}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-slate-800">
                  {pagination.totalPages}
                </span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={
                    !pagination.hasPreviousPage ||
                    loading
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={
                    !pagination.hasNextPage ||
                    loading
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      ) : null}

      {/* Footer */}

      <footer className="mt-12 flex flex-col justify-between gap-3 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
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

          <Link
            to="/help"
            className="transition hover:text-indigo-600"
          >
            Help
          </Link>
        </div>
      </footer>
    </main>
  );
}