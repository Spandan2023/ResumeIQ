import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Loader2,
} from "lucide-react";

import api from "../services/api";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_JD_WORDS = 3000;

const ALLOWED_EXTENSIONS = [".pdf", ".docx"];

function getFileExtension(fileName = "") {
  const lastDot = fileName.lastIndexOf(".");
  return lastDot >= 0 ? fileName.slice(lastDot).toLowerCase() : "";
}

function isValidResumeFile(file) {
  if (!file) return false;

  const extension = getFileExtension(file.name);

  return ALLOWED_EXTENSIONS.includes(extension);
}

function getErrorMessage(error) {
  return (
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    "Unable to analyze your resume. Please try again."
  );
}

function getWordCount(text = "") {
  const trimmed = text.trim();

  if (!trimmed) {
    return 0;
  }

  return trimmed.split(/\s+/).length;
}

/*
 * The backend response shape should eventually be verified directly.
 * For now, this helper safely checks a few common response structures
 * without assuming only one exact shape.
 */
function extractAnalysisId(responseData) {
  const possibleAnalysis =
    responseData?.data ||
    responseData?.analysis ||
    responseData;

  return (
    possibleAnalysis?._id ||
    possibleAnalysis?.id ||
    responseData?.data?._id ||
    responseData?.analysis?._id ||
    responseData?._id ||
    responseData?.id ||
    null
  );
}

export default function Analyzer() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const wordCount = getWordCount(jobDescription);
  const isWordLimitExceeded = wordCount > MAX_JD_WORDS;

  const handleChooseFile = () => {
    if (isAnalyzing) return;

    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    setErrorMessage("");

    if (!file) {
      return;
    }

    if (!isValidResumeFile(file)) {
      setResumeFile(null);

      event.target.value = "";

      setErrorMessage(
        "Please upload a PDF or DOCX resume."
      );

      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setResumeFile(null);

      event.target.value = "";

      setErrorMessage(
        "Resume file size must be 10 MB or smaller."
      );

      return;
    }

    setResumeFile(file);
  };

  const handleRemoveFile = () => {
    if (isAnalyzing) return;

    setResumeFile(null);
    setErrorMessage("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value);

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    if (!resumeFile) {
      setErrorMessage("Please choose your resume first.");
      return;
    }

    if (!isValidResumeFile(resumeFile)) {
      setErrorMessage("Please upload a PDF or DOCX resume.");
      return;
    }

    if (resumeFile.size > MAX_FILE_SIZE) {
      setErrorMessage(
        "Resume file size must be 10 MB or smaller."
      );
      return;
    }

    if (!jobDescription.trim()) {
      setErrorMessage(
        "Please enter the job description."
      );
      return;
    }

    if (isWordLimitExceeded) {
      setErrorMessage(
        `Job description must be ${MAX_JD_WORDS.toLocaleString()} words or fewer.`
      );
      return;
    }

    try {
      setIsAnalyzing(true);

      const formData = new FormData();

      formData.append("resume", resumeFile);
      formData.append(
        "jobDescription",
        jobDescription.trim()
      );

      const response = await api.post(
        "/analysis",
        formData
      );

      /*
       * We deliberately do not assume one exact backend
       * response structure here.
       */
      const analysisId = extractAnalysisId(
        response.data
      );

      if (!analysisId) {
        console.error(
          "Analysis response received without an ID:",
          response.data
        );

        throw new Error(
          "The analysis was completed, but no analysis ID was returned."
        );
      }

      navigate(
        `/analysis/${encodeURIComponent(analysisId)}`
      );
    } catch (error) {
      console.error(
        "Resume analysis error:",
        error
      );

      setErrorMessage(
        error?.message?.includes(
          "no analysis ID was returned"
        )
          ? error.message
          : getErrorMessage(error)
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FC] text-slate-900">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
          >
            <ArrowLeft size={17} />

            Back to Dashboard
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <FileText
                size={19}
                strokeWidth={2.1}
              />
            </div>

            <span className="text-xl font-bold tracking-tight text-slate-900">
              Resume
              <span className="text-indigo-600">
                IQ
              </span>
            </span>
          </div>

          <div className="w-[120px] sm:w-[160px]" />
        </div>
      </header>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Page heading */}
        <section className="mx-auto max-w-3xl text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-700">
            <Sparkles size={13} />
            Resume Analyzer
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Analyze your resume against a job description
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Upload your resume, paste the job description,
            and get a resume-to-role analysis with matched
            skills, missing skills, category scores, and
            recommendations.
          </p>
        </section>

        {/* Error */}
        {errorMessage && (
          <div
            role="alert"
            className="mx-auto mt-8 flex max-w-5xl items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700"
          >
            <AlertCircle
              size={19}
              className="mt-0.5 shrink-0"
            />

            <p className="leading-6">
              {errorMessage}
            </p>
          </div>
        )}

        {/* =====================================================
            ANALYZER FORM
        ====================================================== */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="grid lg:grid-cols-2">
            {/* =================================================
                RESUME UPLOAD
            ================================================== */}
            <section className="border-b border-slate-200 p-6 lg:border-b-0 lg:border-r sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    1. Upload your resume
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    PDF or DOCX · Maximum 10 MB
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FileText size={18} />
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="hidden"
              />

              {!resumeFile ? (
                <button
                  type="button"
                  onClick={handleChooseFile}
                  disabled={isAnalyzing}
                  className="mt-6 flex min-h-[290px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 px-6 text-center transition hover:border-indigo-400 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100">
                    <Upload size={25} />
                  </div>

                  <p className="mt-5 text-sm font-bold text-slate-800">
                    Click to upload or choose a file
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Supported formats: PDF and DOCX
                  </p>
                </button>
              ) : (
                <div className="mt-6 min-h-[290px] rounded-2xl border border-indigo-200 bg-indigo-50/40 p-6">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm ring-1 ring-indigo-100">
                            <FileText size={22} />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-600">
                              Selected Resume
                            </p>

                            <p className="mt-1 break-all text-sm font-bold text-slate-800">
                              {resumeFile.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {(
                                resumeFile.size /
                                (1024 * 1024)
                              ).toFixed(2)}{" "}
                              MB ·{" "}
                              {getFileExtension(
                                resumeFile.name
                              )
                                .replace(".", "")
                                .toUpperCase()}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          disabled={isAnalyzing}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                          aria-label="Remove resume"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="mt-8 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 size={16} />
                        Resume is ready for analysis.
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleChooseFile}
                      disabled={isAnalyzing}
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Change file
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* =================================================
                JOB DESCRIPTION
            ================================================== */}
            <section className="p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    2. Paste the job description
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Include responsibilities, skills,
                    qualifications, and requirements.
                  </p>
                </div>

                <div className="hidden h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 sm:flex">
                  <FileSearchIcon />
                </div>
              </div>

              <textarea
                value={jobDescription}
                onChange={handleJobDescriptionChange}
                disabled={isAnalyzing}
                placeholder="Paste the job title, responsibilities, required skills, qualifications, and other requirements here..."
                className="mt-6 min-h-[290px] w-full resize-y rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-7 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:bg-slate-50"
              />

              <div className="mt-2 flex items-center justify-between gap-4">
                <p
                  className={`text-xs ${
                    isWordLimitExceeded
                      ? "font-semibold text-red-600"
                      : "text-slate-400"
                  }`}
                >
                  Maximum {MAX_JD_WORDS.toLocaleString()} words
                </p>

                <p
                  className={`text-xs ${
                    isWordLimitExceeded
                      ? "font-semibold text-red-600"
                      : "text-slate-400"
                  }`}
                >
                  {wordCount.toLocaleString()} /{" "}
                  {MAX_JD_WORDS.toLocaleString()} words
                </p>
              </div>
            </section>
          </div>

          {/* ===================================================
              ACTION AREA
          ==================================================== */}
          <div className="border-t border-slate-200 bg-slate-50/70 px-6 py-5 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Ready to analyze?
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your completed analysis will be saved to
                  your ResumeIQ account.
                </p>
              </div>

              <button
                type="submit"
                disabled={
                  isAnalyzing ||
                  !resumeFile ||
                  !jobDescription.trim() ||
                  isWordLimitExceeded
                }
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Start Analyzing
                    <ArrowRight size={17} />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* =====================================================
            SMALL INFO NOTE
        ====================================================== */}
        <div className="mx-auto mt-6 max-w-5xl rounded-xl border border-indigo-100 bg-indigo-50/60 px-5 py-4">
          <p className="text-xs leading-6 text-indigo-800">
            <span className="font-bold">
              Note:
            </span>{" "}
            The match score reflects resume-to-job-description
            alignment. It does not predict interview or hiring
            success.
          </p>
        </div>
      </div>
    </main>
  );
}

/*
 * Small inline icon wrapper so we don't need another
 * import just for the job-description field icon.
 */
function FileSearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <circle cx="11" cy="13" r="3" />
      <path d="m13.5 15.5 2 2" />
    </svg>
  );
}