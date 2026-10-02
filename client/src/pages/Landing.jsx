
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronRight,
  FileText,
  Sparkles,
  Target,
  Search,
  Lightbulb,
  Upload,
  ClipboardList,
  BrainCircuit,
  ShieldCheck,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

/* -------------------------------------------------------
   REUSABLE COMPONENTS
------------------------------------------------------- */

function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 transition-transform duration-300 group-hover:rotate-[-4deg]">
        <FileText size={21} strokeWidth={2.2} />
      </div>

      <span className="text-xl font-bold tracking-tight text-slate-950">
        Resume<span className="text-indigo-600">IQ</span>
      </span>
    </Link>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/80 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-700">
      <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, center = false }) {
  return (
    <div
      className={`max-w-2xl ${
        center ? "mx-auto text-center" : ""
      }`}
    >
      {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}

      <h2 className="text-3xl font-bold leading-[1.15] tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[46px]">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
          {description}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------
   PRODUCT PREVIEW
   Illustrative UI only — not actual analysis results.
------------------------------------------------------- */

function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      {/* Ambient glow */}
      <div className="absolute -inset-8 rounded-[40px] bg-indigo-400/15 blur-3xl" />

      {/* Floating label */}
      <div className="absolute -left-5 top-16 z-20 hidden items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-xl shadow-slate-900/5 backdrop-blur-xl sm:flex lg:-left-12">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={20} />
        </div>

        <div>
          <p className="text-xs font-bold text-slate-900">
            Skills alignment
          </p>
          <p className="mt-0.5 text-[11px] text-slate-500">
            Matched requirements
          </p>
        </div>
      </div>

      {/* Main browser card */}
      <div className="relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_35px_100px_-30px_rgba(49,46,129,0.25)]">
        {/* Browser header */}
        <div className="flex h-12 items-center justify-between border-b border-slate-100 bg-white px-5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>

          <div className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-1.5">
            <ShieldCheck size={12} className="text-slate-400" />
            <span className="text-[10px] font-medium text-slate-400">
              ResumeIQ / Analysis
            </span>
          </div>

          <div className="w-10" />
        </div>

        {/* Preview content */}
        <div className="bg-[#FAFAFE] p-4 sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <Sparkles size={15} />
                </div>

                <span className="text-sm font-bold text-slate-900">
                  Resume analysis
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                A clearer view of your job alignment.
              </p>
            </div>

            <span className="shrink-0 rounded-full border border-indigo-100 bg-white px-2.5 py-1 text-[9px] font-semibold text-indigo-600">
              Sample preview
            </span>
          </div>

          {/* Match overview */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Alignment overview
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  Resume vs. job requirements
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Target size={18} />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-indigo-50/70 p-3.5">
                <div className="flex items-center gap-2 text-indigo-700">
                  <CheckCircle2 size={15} />
                  <span className="text-[11px] font-semibold">
                    Matched skills
                  </span>
                </div>

                <p className="mt-3 text-xl font-bold tracking-tight text-slate-900">
                  Relevant
                </p>

                <p className="mt-1 text-[10px] text-slate-500">
                  Skills found in your resume
                </p>
              </div>

              <div className="rounded-xl bg-amber-50/70 p-3.5">
                <div className="flex items-center gap-2 text-amber-700">
                  <Search size={15} />
                  <span className="text-[11px] font-semibold">
                    Skill gaps
                  </span>
                </div>

                <p className="mt-3 text-xl font-bold tracking-tight text-slate-900">
                  Review
                </p>

                <p className="mt-1 text-[10px] text-slate-500">
                  Requirements to investigate
                </p>
              </div>
            </div>

            {/* Skills list */}
            <div className="mt-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-800">
                  Skills comparison
                </p>

                <span className="text-[10px] text-slate-400">
                  Illustrative
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    name: "React",
                    status: "Matched",
                    color: "bg-emerald-50 text-emerald-700",
                    dot: "bg-emerald-500",
                  },
                  {
                    name: "JavaScript",
                    status: "Matched",
                    color: "bg-emerald-50 text-emerald-700",
                    dot: "bg-emerald-500",
                  },
                  {
                    name: "Testing",
                    status: "Review",
                    color: "bg-amber-50 text-amber-700",
                    dot: "bg-amber-500",
                  },
                ].map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between rounded-lg border border-slate-100 px-3.5 py-3"
                  >
                    <span className="text-xs font-medium text-slate-700">
                      {skill.name}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${skill.color}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${skill.dot}`}
                      />
                      {skill.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendation preview */}
          <div className="mt-4 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Lightbulb size={18} />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-900">
                  Improvement insights
                </p>

                <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                  Review how your experience is presented and identify areas
                  to strengthen for your target role.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating recommendation badge */}
      <div className="absolute -bottom-5 -right-3 z-20 hidden items-center gap-2.5 rounded-2xl border border-white bg-white px-4 py-3 shadow-xl shadow-slate-900/10 sm:flex lg:-right-8">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
          <Sparkles size={17} />
        </div>

        <div>
          <p className="text-xs font-bold text-slate-900">
            Actionable insights
          </p>
          <p className="mt-0.5 text-[10px] text-slate-500">
            Understand what to improve
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   NAVBAR
------------------------------------------------------- */

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-500 transition hover:text-indigo-600"
          >
            How it works
          </a>

          <a
            href="#features"
            className="text-sm font-medium text-slate-500 transition hover:text-indigo-600"
          >
            Features
          </a>

          <a
            href="#why-resumeiq"
            className="text-sm font-medium text-slate-500 transition hover:text-indigo-600"
          >
            Why ResumeIQ
          </a>
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-600 transition hover:text-indigo-600"
          >
            Log in
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-600/30"
          >
            Analyze My Resume
            <ArrowRight size={16} />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-5 shadow-xl md:hidden">
          <nav className="flex flex-col gap-1">
            {[
              { label: "How it works", href: "#how-it-works" },
              { label: "Features", href: "#features" },
              { label: "Why ResumeIQ", href: "#why-resumeiq" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                {item.label}
              </a>
            ))}

            <div className="my-2 border-t border-slate-100" />

            <Link
              to="/login"
              onClick={closeMenu}
              className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Log in
            </Link>

            <Link
              to="/login"
              onClick={closeMenu}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white"
            >
              Analyze My Resume
              <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

/* -------------------------------------------------------
   HERO SECTION
------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-indigo-100/60 blur-[120px]" />

        <div className="absolute -left-40 top-72 h-[300px] w-[300px] rounded-full bg-violet-100/40 blur-[100px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#64748b08_1px,transparent_1px),linear-gradient(to_bottom,#64748b08_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-16 sm:px-8 sm:pb-28 sm:pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-10 lg:pb-32 lg:pt-24">
        {/* Left content */}
        <div className="relative z-10 max-w-xl">
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 shadow-sm shadow-indigo-900/[0.03]">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <Sparkles size={13} />
            </span>

            <span className="text-xs font-semibold tracking-wide text-slate-600">
              AI-POWERED RESUME ANALYSIS
            </span>
          </div>

          <h1 className="text-[42px] font-bold leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-[62px] xl:text-[68px]">
            Your resume.
            <br />
            Their requirements.
            <br />
            <span className="relative inline-block text-indigo-600">
              One clear match.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 330 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3 8C85 2 230 2 327 7"
                  stroke="#A5B4FC"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
            See how your resume aligns with the job you're targeting. Discover
            skill gaps and understand what to improve before you apply.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/login"
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-indigo-600 px-7 py-4 text-sm font-bold text-white shadow-xl shadow-indigo-600/20 transition hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-indigo-600/30"
            >
              Analyze My Resume

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-7 py-4 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50/50"
            >
              See how it works
              <ChevronRight size={16} />
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-emerald-500" />
              Guest upload available below
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

            <span className="inline-flex items-center gap-1.5">
              <Check size={14} className="text-emerald-500" />
              Clear, actionable insights
            </span>
          </div>
        </div>

        {/* Right product preview */}
        <div className="relative mx-auto w-full max-w-[620px] lg:ml-auto">
          <ProductPreview />
        </div>
      </div>

      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
    </section>
  );
}

/* -------------------------------------------------------
   GUEST RESUME ANALYZER
   Frontend form only. API submission will be connected later.
------------------------------------------------------- */

function GuestAnalyzer() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setMessage("");

    if (!file) {
      setResumeFile(null);
      return;
    }

    const fileName = file.name.toLowerCase();
    const isAllowed = [".pdf", ".docx"].some((extension) =>
      fileName.endsWith(extension)
    );

    if (!isAllowed) {
      setResumeFile(null);
      event.target.value = "";
      setMessage("Please upload your resume as a PDF or DOCX file.");
      setMessageType("error");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setResumeFile(null);
      event.target.value = "";
      setMessage("Your file must be smaller than 10 MB.");
      setMessageType("error");
      return;
    }

    setResumeFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");

    if (!resumeFile) {
      setMessage("Please upload your resume first.");
      setMessageType("error");
      return;
    }

    if (!jobDescription.trim()) {
      setMessage("Please paste the job description.");
      setMessageType("error");
      return;
    }

    // The analysis API is not connected yet. Do not show fabricated results.
    setMessage(
      "Your resume and job description are ready. Guest analysis will be enabled when the analysis API is connected."
    );
    setMessageType("success");
  };

  return (
    <section
      id="guest-analyzer"
      className="scroll-mt-24 border-b border-slate-100 bg-[#FAFAFC] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>Try it as a guest</SectionLabel>
          <h2 className="text-3xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl">
            Try ResumeIQ without creating an account.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
            Upload your resume and paste the job description to prepare a
            resume-to-role analysis. No account is required to try the guest
            workflow.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_24px_80px_-40px_rgba(49,46,129,0.22)] sm:p-8"
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <label
                htmlFor="guest-resume"
                className="mb-3 block text-sm font-bold text-slate-800"
              >
                1. Upload your resume
              </label>

              <label
                htmlFor="guest-resume"
                className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/40 px-5 py-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                  <Upload size={23} />
                </div>

                {resumeFile ? (
                  <>
                    <span className="max-w-full break-all text-sm font-bold text-slate-800">
                      {resumeFile.name}
                    </span>
                    <span className="mt-2 text-xs text-slate-500">
                      {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB · Click
                      to change file
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-sm font-bold text-slate-800">
                      Click to upload or choose a file
                    </span>
                    <span className="mt-2 text-xs text-slate-500">
                      PDF or DOCX · Maximum 10 MB
                    </span>
                  </>
                )}
              </label>

              <input
                id="guest-resume"
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="sr-only"
              />
            </div>

            <div>
              <label
                htmlFor="guest-job-description"
                className="mb-3 block text-sm font-bold text-slate-800"
              >
                2. Paste the job description
              </label>

              <textarea
                id="guest-job-description"
                value={jobDescription}
                onChange={(event) => {
                  setJobDescription(event.target.value);
                  if (message) setMessage("");
                }}
                rows={9}
                placeholder="Paste the job title, responsibilities, required skills, and qualifications here..."
                className="min-h-[220px] w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />
              <div className="mt-2 flex items-center justify-between gap-3">
                <p className="text-xs text-slate-400">
                  Include the requirements for the role you're targeting.
                </p>
                <span className="shrink-0 text-xs tabular-nums text-slate-400">
                  {jobDescription.length} characters
                </span>
              </div>
            </div>
          </div>

          {message && (
            <div
              role="status"
              className={`mt-6 rounded-xl px-4 py-3 text-sm leading-6 ${
                messageType === "error"
                  ? "border border-rose-200 bg-rose-50 text-rose-700"
                  : "border border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {message}
            </div>
          )}

          <div className="mt-7 flex flex-col items-stretch justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
            <p className="max-w-md text-xs leading-5 text-slate-400">
              Want to save your analyses and access them later? Create a free
              account to keep your career workspace organized.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white px-5 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
              >
                Create free account
              </Link>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"
              >
                Analyze as guest
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   HOW IT WORKS
------------------------------------------------------- */

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload your resume",
    description:
      "Start with your existing resume in PDF, DOC, or DOCX format.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Add the job description",
    description:
      "Provide the job requirements for the role you're targeting.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    number: "03",
    icon: BrainCircuit,
    title: "Understand your match",
    description:
      "Explore skills alignment, gaps, and areas to improve.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-b border-slate-100 bg-[#FAFAFC] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Simple by design"
          title="From resume to actionable insights."
          description="Three straightforward steps to understand how your experience connects with the role you want."
          center
        />

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          {/* Connector line */}
          <div className="absolute left-[18%] right-[18%] top-10 hidden h-px border-t border-dashed border-indigo-200 md:block" />

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-2xl border border-slate-200/80 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-900/[0.04] sm:p-8"
              >
                <div className="relative z-10 flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${step.color} transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon size={24} strokeWidth={1.8} />
                  </div>

                  <span className="text-3xl font-bold tracking-tight text-slate-100 transition group-hover:text-indigo-100">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 text-lg font-bold tracking-tight text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100">
                  Step {step.number}
                  <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   PRODUCT SHOWCASE
------------------------------------------------------- */

function ProductShowcase() {
  return (
    <section
      id="features"
      className="scroll-mt-20 overflow-hidden bg-white py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Text */}
          <div>
            <SectionHeading
              eyebrow="A clearer picture"
              title="Know exactly where you stand."
              description="Go beyond a single score. Understand the relationship between your experience and the requirements of the job."
            />

            <div className="mt-9 space-y-5">
              {[
                {
                  title: "Relevant skills",
                  text: "Identify experience and skills that align with the role.",
                },
                {
                  title: "Requirements to review",
                  text: "Spot skills and qualifications that may need attention.",
                },
                {
                  title: "Resume improvement",
                  text: "Understand where your resume could communicate your value more clearly.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                    <Check size={14} strokeWidth={2.5} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-sm leading-6 text-slate-500">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/login"
              className="group mt-9 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
            >
              Explore resume analysis
              <ArrowUpRight
                size={17}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-br from-indigo-100/70 via-violet-50/40 to-blue-50/70 blur-2xl" />

            <div className="relative rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_30px_90px_-40px_rgba(49,46,129,0.25)] sm:p-7">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Analysis overview
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Illustrative product interface
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Target size={19} />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {/* Matched skills */}
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-800">
                      Matched skills
                    </p>

                    <CheckCircle2 size={17} className="text-emerald-600" />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {["React", "JavaScript", "HTML", "CSS"].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-emerald-100 bg-white px-3 py-2 text-[11px] font-semibold text-emerald-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 text-xs leading-5 text-slate-500">
                    Skills identified in the resume and relevant to the role.
                  </p>
                </div>

                {/* Missing skills */}
                <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-800">
                      Skills to review
                    </p>

                    <Search size={17} className="text-amber-600" />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Testing", "Docker", "CI/CD"].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-amber-100 bg-white px-3 py-2 text-[11px] font-semibold text-amber-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="mt-5 text-xs leading-5 text-slate-500">
                    Requirements to verify against your actual experience.
                  </p>
                </div>
              </div>

              {/* Recommendation area */}
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                    <Lightbulb size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Recommendations
                    </p>

                    <p className="mt-1 text-[10px] text-slate-400">
                      Areas to strengthen
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {[
                    "Highlight relevant project experience.",
                    "Connect skills to specific accomplishments.",
                    "Review requirements that are not demonstrated.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={15}
                        className="mt-0.5 shrink-0 text-indigo-500"
                      />

                      <p className="text-xs leading-5 text-slate-600">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="relative mt-4 text-center text-[11px] text-slate-400">
              Illustrative interface. Actual analysis depends on the resume and
              job description provided.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   THREE INSIGHT CARDS
------------------------------------------------------- */

const insights = [
  {
    number: "01",
    title: "Find what's already working.",
    description:
      "See which skills, technologies, and experiences in your resume align with the job requirements.",
    icon: CheckCircle2,
    bg: "bg-emerald-50",
    color: "text-emerald-600",
    tags: ["React", "JavaScript", "Problem solving"],
    type: "matched",
  },
  {
    number: "02",
    title: "See what's missing.",
    description:
      "Identify relevant requirements that are not clearly demonstrated in your resume, so you know what to review.",
    icon: Search,
    bg: "bg-amber-50",
    color: "text-amber-600",
    tags: ["Testing", "CI/CD", "Cloud"],
    type: "missing",
  },
  {
    number: "03",
    title: "Know what to work on next.",
    description:
      "Get structured suggestions to strengthen your resume and communicate your experience more effectively.",
    icon: Lightbulb,
    bg: "bg-violet-50",
    color: "text-violet-600",
    tags: [
      "Strengthen project descriptions",
      "Highlight relevant skills",
      "Add measurable outcomes",
    ],
    type: "suggestions",
  },
];

function InsightVisual({ insight }) {
  const Icon = insight.icon;

  return (
    <div className="relative flex min-h-[230px] items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5">
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-indigo-50/80 blur-2xl" />

      <div className="relative w-full max-w-sm space-y-3">
        {insight.tags.map((tag, index) => (
          <div
            key={tag}
            className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3.5 shadow-sm shadow-slate-900/[0.02] transition-transform duration-300 hover:translate-x-1"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${insight.bg} ${insight.color}`}
              >
                <Icon size={15} />
              </div>

              <span className="truncate text-xs font-semibold text-slate-700">
                {tag}
              </span>
            </div>

            {insight.type === "matched" ? (
              <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-700">
                Matched
              </span>
            ) : insight.type === "missing" ? (
              <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-semibold text-amber-700">
                Review
              </span>
            ) : (
              <ArrowUpRight
                size={15}
                className="shrink-0 text-slate-300"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Insights() {
  return (
    <section className="border-y border-slate-100 bg-[#FAFAFC] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-16 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="More than a score"
            title="Turn analysis into your next move."
            description="Get a more useful picture of your resume with insights that help you understand the details."
          />

          <Link
            to="/login"
            className="group inline-flex w-fit shrink-0 items-center gap-2 text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
          >
            Try ResumeIQ
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {insights.map((insight) => {
            const Icon = insight.icon;

            return (
              <article
                key={insight.number}
                className="group rounded-[22px] border border-slate-200/80 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-900/[0.04] sm:p-6"
              >
                <InsightVisual insight={insight} />

                <div className="mt-7 flex items-center gap-2">
                  <span className="text-xs font-bold tracking-widest text-indigo-600">
                    {insight.number}
                  </span>

                  <span className="h-px w-8 bg-indigo-200" />

                  <Icon size={15} className="text-slate-400" />
                </div>

                <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight text-slate-900">
                  {insight.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {insight.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   DARK FEATURE SECTION
------------------------------------------------------- */

const capabilities = [
  {
    icon: Target,
    title: "Resume alignment",
    description:
      "Understand how your skills and experience connect with a specific job description.",
  },
  {
    icon: Search,
    title: "Skill gap insights",
    description:
      "Identify relevant requirements that your resume may not demonstrate clearly.",
  },
  {
    icon: Lightbulb,
    title: "Practical recommendations",
    description:
      "Explore actionable ways to improve how your qualifications are presented.",
  },
];

function WhyResumeIQ() {
  return (
    <section
      id="why-resumeiq"
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#11112B] py-24 sm:py-32"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/20 blur-[120px]" />

        <div className="absolute -bottom-48 left-1/4 h-[450px] w-[450px] rounded-full bg-violet-600/15 blur-[120px]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-300">
            <Sparkles size={14} />
            A more informed approach
          </div>

          <h2 className="text-4xl font-bold leading-[1.13] tracking-[-0.04em] text-white sm:text-5xl lg:text-[56px]">
            Less guessing.
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-blue-300 bg-clip-text text-transparent">
              More understanding.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            Your resume tells your story. ResumeIQ helps you understand how
            that story connects with the opportunity you're pursuing.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {capabilities.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/[0.09] bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-white/[0.07] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300 transition group-hover:bg-indigo-400/20">
                    <Icon size={22} />
                  </div>

                  <span className="text-xs font-bold tracking-widest text-slate-600">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-8 text-lg font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {item.description}
                </p>

                <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-indigo-300">
                  Built around your resume
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <p className="text-xs text-slate-500">
            ResumeIQ provides analysis and decision-support insights. It does
            not guarantee interviews or employment.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   FINAL CTA
------------------------------------------------------- */

function FinalCTA() {
  return (
    <section className="bg-white px-5 py-24 sm:px-8 sm:py-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-indigo-600 px-6 py-16 text-center shadow-2xl shadow-indigo-900/15 sm:px-12 sm:py-20 lg:px-20">
        {/* CTA decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-40 h-80 w-80 rounded-full border border-white/[0.08]" />

          <div className="absolute -right-10 -top-32 h-80 w-80 rounded-full border border-white/[0.08]" />

          <div className="absolute -bottom-48 -left-20 h-96 w-96 rounded-full bg-violet-400/20 blur-[80px]" />

          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,#ffffff08_50%,transparent_80%)]" />
        </div>

        <div className="relative mx-auto max-w-2xl">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-lg">
            <Sparkles size={25} />
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
            Ready to understand your resume better?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-indigo-100/80 sm:text-base sm:leading-8">
            Upload your resume, add a job description, and explore the insights
            that can help you prepare for your next application.
          </p>

          <Link
            to="/login"
            className="group mt-9 inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-4 text-sm font-bold text-indigo-700 shadow-xl transition hover:-translate-y-1 hover:bg-indigo-50"
          >
            Analyze My Resume

            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <p className="mt-5 text-xs font-medium text-indigo-100/70">
            Start with your resume. Explore your possibilities.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   FOOTER
------------------------------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-[#FAFAFC]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo />

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500">
              Understand your resume. Discover skill gaps. Prepare for your
              next opportunity with ResumeIQ.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">
              Product
            </h3>

            <div className="mt-5 flex flex-col items-start gap-3.5">
              <a
                href="#how-it-works"
                className="text-sm text-slate-500 transition hover:text-indigo-600"
              >
                How it works
              </a>

              <a
                href="#features"
                className="text-sm text-slate-500 transition hover:text-indigo-600"
              >
                Features
              </a>

              <Link
                to="/login"
                className="text-sm text-slate-500 transition hover:text-indigo-600"
              >
                Analyze resume
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">
              Legal
            </h3>

            <div className="mt-5 flex flex-col items-start gap-3.5">
              <Link
                to="/privacy"
                className="text-sm text-slate-500 transition hover:text-indigo-600"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="text-sm text-slate-500 transition hover:text-indigo-600"
              >
                Terms of Service
              </Link>

              <Link
                to="/login"
                className="text-sm text-slate-500 transition hover:text-indigo-600"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} ResumeIQ. All rights reserved.
          </p>

          <p className="text-xs text-slate-400">
            Built to make resume analysis more understandable.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------
   LANDING PAGE
------------------------------------------------------- */

export default function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans antialiased">
      <Navbar />

      <main>
        <Hero />

        <GuestAnalyzer />

        <HowItWorks />

        <ProductShowcase />

        <Insights />

        <WhyResumeIQ />

        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}