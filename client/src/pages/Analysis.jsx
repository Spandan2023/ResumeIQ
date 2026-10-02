import { useEffect, useMemo, useState } from "react";

import { Link, useParams } from "react-router-dom";

import {

  AlertCircle,

  ArrowLeft,

  CalendarDays,

  CheckCircle2,

  Clock3,

  FileSearch,

  FileText,

  Lightbulb,

  Target,

  XCircle,

} from "lucide-react";



import api from "../services/api";



/* ============================================================

   HELPERS

============================================================ */



const formatDate = (value) => {

  if (!value) return "—";



  const date = new Date(value);



  if (Number.isNaN(date.getTime())) {

    return "—";

  }



  return date.toLocaleDateString("en-IN", {

    day: "2-digit",

    month: "short",

    year: "numeric",

  });

};



const formatDateTime = (value) => {

  if (!value) return "—";



  const date = new Date(value);



  if (Number.isNaN(date.getTime())) {

    return "—";

  }



  return date.toLocaleString("en-IN", {

    day: "2-digit",

    month: "short",

    year: "numeric",

    hour: "numeric",

    minute: "2-digit",

  });

};



const formatCategoryName = (value) => {

  if (!value) return "Category";



  return String(value)

    .replace(/([a-z])([A-Z])/g, "$1 $2")

    .replace(/[_-]+/g, " ")

    .replace(/\b\w/g, (letter) => letter.toUpperCase());

};



const getFileTypeLabel = (fileType = "") => {

  if (fileType.includes("pdf")) {

    return "PDF";

  }



  if (fileType.includes("wordprocessingml") || fileType.includes("docx")) {

    return "DOCX";

  }



  return "FILE";

};



const getErrorMessage = (error) => {

  return (

    error?.response?.data?.message ||

    error?.response?.data?.error ||

    "Unable to load this analysis. Please try again."

  );

};



const normalizeAnalysisResponse = (responseData) => {

  /*

    Backend may return:



    {

      success: true,

      data: {...}

    }



    or:



    {

      success: true,

      analysis: {...}

    }



    or directly:



    {...}

  */



  return (

    responseData?.data ||

    responseData?.analysis ||

    responseData

  );

};



/* ============================================================

   LOADING STATE

============================================================ */



function LoadingState() {

  return (

    <main className="min-h-screen bg-[#F8F9FC]">



      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">

        <div className="flex flex-col items-center justify-center py-24 text-center">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">

            <Clock3 size={25} className="animate-pulse" />

          </div>



          <h1 className="mt-5 text-xl font-bold text-slate-900">

            Loading analysis...

          </h1>



          <p className="mt-2 text-sm text-slate-500">

            Retrieving your saved resume analysis.

          </p>

        </div>

      </div>

    </main>

  );

}



/* ============================================================

   ERROR STATE

============================================================ */



function ErrorState({ message }) {

  return (

    <main className="min-h-screen bg-[#F8F9FC]">



      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">

        <div className="rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">

            <AlertCircle size={27} />

          </div>



          <h1 className="mt-5 text-2xl font-bold text-slate-900">

            Unable to load analysis

          </h1>



          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">

            {message}

          </p>



          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

            <Link

              to="/history"

              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"

            >

              <ArrowLeft size={17} />

              Back to History

            </Link>



            <button

              type="button"

              onClick={() => window.location.reload()}

              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"

            >

              Try Again

            </button>

          </div>

        </div>

      </div>

    </main>

  );

}



/* ============================================================

   SCORE CARD

============================================================ */



function ScoreCard({ score }) {

  const safeScore = Math.max(

    0,

    Math.min(100, Number(score) || 0)

  );



  const circumference = 2 * Math.PI * 48;

  const offset =

    circumference - (safeScore / 100) * circumference;



  return (

    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

      <div className="flex flex-col items-center gap-6 sm:flex-row">

        <div className="relative h-32 w-32 shrink-0">

          <svg

            className="h-32 w-32 -rotate-90"

            viewBox="0 0 120 120"

          >

            <circle

              cx="60"

              cy="60"

              r="48"

              fill="none"

              stroke="currentColor"

              strokeWidth="10"

              className="text-slate-100"

            />



            <circle

              cx="60"

              cy="60"

              r="48"

              fill="none"

              stroke="currentColor"

              strokeWidth="10"

              strokeLinecap="round"

              className="text-indigo-600 transition-all duration-700"

              strokeDasharray={circumference}

              strokeDashoffset={offset}

            />

          </svg>



          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span className="text-3xl font-bold tracking-tight text-slate-900">

              {safeScore}%

            </span>



            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">

              Match

            </span>

          </div>

        </div>



        <div className="text-center sm:text-left">

          <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">

            Resume Alignment

          </p>



          <h2 className="mt-2 text-xl font-bold text-slate-900">

            Your analysis is ready

          </h2>



          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">

            This score represents how closely the information detected in

            your resume aligns with the job description you analyzed.

          </p>

        </div>

      </div>

    </section>

  );

}



/* ============================================================

   SKILLS CARD

============================================================ */



function SkillsCard({

  title,

  skills,

  type = "matched",

}) {

  const isMatched = type === "matched";



  return (

    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <div

          className={`flex h-10 w-10 items-center justify-center rounded-xl ${isMatched

            ? "bg-emerald-50 text-emerald-600"

            : "bg-amber-50 text-amber-600"

            }`}

        >

          {isMatched ? (

            <CheckCircle2 size={20} />

          ) : (

            <XCircle size={20} />

          )}

        </div>



        <div>

          <h2 className="text-base font-bold text-slate-900">

            {title}

          </h2>



          <p className="text-xs text-slate-500">

            {skills.length}{" "}

            {skills.length === 1 ? "skill" : "skills"}

          </p>

        </div>

      </div>



      {skills.length > 0 ? (

        <div className="mt-5 flex flex-wrap gap-2.5">

          {skills.map((skill, index) => (

            <span

              key={`${skill}-${index}`}

              className={`rounded-full border px-3.5 py-2 text-xs font-semibold ${isMatched

                ? "border-emerald-100 bg-emerald-50 text-emerald-700"

                : "border-amber-100 bg-amber-50 text-amber-700"

                }`}

            >

              {skill}

            </span>

          ))}

        </div>

      ) : (

        <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center">

          <p className="text-sm text-slate-500">

            No skills were listed in this category.

          </p>

        </div>

      )}

    </section>

  );

}



/* ============================================================

   CATEGORY SCORES

============================================================ */



function CategoryScores({ categoryScores }) {

  const entries = Object.entries(categoryScores || {});



  if (entries.length === 0) {

    return null;

  }



  return (

    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-start gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

          <Target size={20} />

        </div>



        <div>

          <h2 className="text-base font-bold text-slate-900">

            Category Scores

          </h2>



          <p className="mt-1 text-xs text-slate-500">

            Breakdown of the saved analysis.

          </p>

        </div>

      </div>



      <div className="mt-6 space-y-5">

        {entries.map(([key, value]) => {

          const numericValue = Math.max(

            0,

            Math.min(100, Number(value) || 0)

          );



          return (

            <div key={key}>

              <div className="mb-2 flex items-center justify-between gap-4">

                <span className="text-sm font-semibold text-slate-700">

                  {formatCategoryName(key)}

                </span>



                <span className="text-sm font-bold text-slate-900">

                  {numericValue}%

                </span>

              </div>



              <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                <div

                  className="h-full rounded-full bg-indigo-600 transition-all duration-700"

                  style={{

                    width: `${numericValue}%`,

                  }}

                />

              </div>

            </div>

          );

        })}

      </div>

    </section>

  );

}



/* ============================================================

   MAIN ANALYSIS PAGE

============================================================ */



export default function Analysis() {

  const { id } = useParams();



  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");



  useEffect(() => {

    let mounted = true;



    const loadAnalysis = async () => {

      if (!id) {

        setErrorMessage("No analysis ID was provided.");

        setLoading(false);

        return;

      }



      try {

        setLoading(true);

        setErrorMessage("");



        /*

          Protected backend endpoint:



          GET /api/analysis/:id



          The centralized Axios client sends the

          authentication cookie automatically.

        */

        const response = await api.get(

          `/analysis/${encodeURIComponent(id)}`

        );



        const data = normalizeAnalysisResponse(response.data);



        if (!data || typeof data !== "object") {

          throw new Error("Invalid analysis response.");

        }



        if (mounted) {

          setAnalysis(data);

        }

      } catch (error) {

        console.error("Load analysis error:", error);



        if (mounted) {

          setErrorMessage(

            error?.response?.status === 404

              ? "This analysis could not be found or may have been deleted."

              : getErrorMessage(error)

          );

        }

      } finally {

        if (mounted) {

          setLoading(false);

        }

      }

    };



    loadAnalysis();



    return () => {

      mounted = false;

    };

  }, [id]);



  const matchedSkills = useMemo(

    () =>

      Array.isArray(analysis?.matchedSkills)

        ? analysis.matchedSkills

        : [],

    [analysis]

  );



  const missingSkills = useMemo(

    () =>

      Array.isArray(analysis?.missingSkills)

        ? analysis.missingSkills

        : [],

    [analysis]

  );



  const recommendations = useMemo(

    () =>

      Array.isArray(analysis?.recommendations)

        ? analysis.recommendations

        : [],

    [analysis]

  );



  const categoryScores = useMemo(

    () =>

      analysis?.categoryScores &&

        typeof analysis.categoryScores === "object"

        ? analysis.categoryScores

        : {},

    [analysis]

  );



  if (loading) {

    return <LoadingState />;

  }



  if (errorMessage) {

    return <ErrorState message={errorMessage} />;

  }



  if (!analysis) {

    return (

      <ErrorState message="No analysis data was returned by the server." />

    );

  }



  return (

    <main className="min-h-screen bg-[#F8F9FC]">



      {/* ======================================================

          PAGE

      ====================================================== */}

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">

        {/* Page header */}

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-700">

            <FileSearch size={13} />

            Saved Analysis

          </div>



          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">

            Analysis Results

          </h1>



          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">

            Review the saved results, job description, skills, category

            scores, and recommendations from this analysis.

          </p>

        </div>



        {/* Resume information */}

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">

                <FileText size={22} />

              </div>



              <div>

                <p className="text-xs font-bold uppercase tracking-[0.15em] text-indigo-600">

                  Resume

                </p>



                <h2 className="mt-1 text-lg font-bold text-slate-900 break-words">

                  {analysis.resume?.fileName || "Resume"}

                </h2>



                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">

                  <span className="inline-flex items-center gap-1.5">

                    <FileText size={14} />

                    {getFileTypeLabel(

                      analysis.resume?.fileType

                    )}

                  </span>



                  <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />



                  <span className="inline-flex items-center gap-1.5">

                    <CalendarDays size={14} />

                    Created {formatDate(analysis.createdAt)}

                  </span>



                  <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />



                  <span

                    className={`inline-flex items-center gap-1.5 ${analysis.status === "completed"

                      ? "text-emerald-600"

                      : "text-red-600"

                      }`}

                  >

                    {analysis.status === "completed" ? (

                      <CheckCircle2 size={14} />

                    ) : (

                      <XCircle size={14} />

                    )}



                    {analysis.status === "completed"

                      ? "Completed"

                      : "Failed"}

                  </span>

                </div>

              </div>

            </div>



            <div className="rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">

              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">

                Saved

              </p>



              <p className="mt-1 text-sm font-semibold text-slate-700">

                {formatDateTime(analysis.createdAt)}

              </p>

            </div>

          </div>

        </section>



        {/* Match score */}

        <div className="mt-6">

          <ScoreCard score={analysis.matchScore} />

        </div>



        {/* Skills */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          <SkillsCard

            title="Matched Skills"

            skills={matchedSkills}

            type="matched"

          />



          <SkillsCard

            title="Missing Skills"

            skills={missingSkills}

            type="missing"

          />

        </div>



        {/* Category scores */}

        {Object.keys(categoryScores).length > 0 && (

          <div className="mt-6">

            <CategoryScores

              categoryScores={categoryScores}

            />

          </div>

        )}



        {/* Job description */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">

              <FileSearch size={20} />

            </div>



            <div>

              <h2 className="text-base font-bold text-slate-900">

                Original Job Description

              </h2>



              <p className="mt-1 text-xs text-slate-500">

                The job description used for this saved analysis.

              </p>

            </div>

          </div>



          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-5">

            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-600">

              {analysis.jobDescription || "No job description available."}

            </p>

          </div>

        </section>



        {/* Recommendations */}

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">

              <Lightbulb size={20} />

            </div>



            <div>

              <h2 className="text-base font-bold text-slate-900">

                Recommendations

              </h2>



              <p className="mt-1 text-xs text-slate-500">

                Suggestions returned with this saved analysis.

              </p>

            </div>

          </div>



          {recommendations.length > 0 ? (

            <div className="mt-6 space-y-3">

              {recommendations.map((recommendation, index) => (

                <div

                  key={`${recommendation}-${index}`}

                  className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4"

                >

                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-indigo-600 shadow-sm">

                    <span className="text-xs font-bold">

                      {index + 1}

                    </span>

                  </div>



                  <p className="text-sm leading-6 text-slate-600">

                    {recommendation}

                  </p>

                </div>

              ))}

            </div>

          ) : (

            <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-6 text-center">

              <p className="text-sm text-slate-500">

                No recommendations were returned for this analysis.

              </p>

            </div>

          )}

        </section>



        {/* Bottom actions */}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs text-slate-400">

              Analysis ID

            </p>



            <p className="mt-1 break-all font-mono text-xs text-slate-500">

              {analysis._id || id}

            </p>

          </div>



          <Link

            to="/history"

            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"

          >

            <ArrowLeft size={17} />

            Return to Analysis History

          </Link>

        </div>

      </div>



      {/* ======================================================

          FOOTER

      ====================================================== */}

      <footer className="mt-8 border-t border-slate-200 bg-white">

        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8">

          <p>

            © {new Date().getFullYear()} ResumeIQ. All rights reserved.

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

        </div>

      </footer>

    </main>

  );

}