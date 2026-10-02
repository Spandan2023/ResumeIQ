
import { Link } from "react-router-dom";
import {
  FileText,
  ArrowLeft,
  ShieldCheck,
  LockKeyhole,
  Database,
  Eye,
  UserCheck,
  FileSearch,
  Mail,
  ChevronRight,
  Shield,
} from "lucide-react";

export default function Privacy() {
  const lastUpdated = "September 26, 2026";

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900">
      {/* Navbar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <FileText size={20} strokeWidth={2.2} />
              <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full border border-indigo-600 bg-cyan-300" />
            </div>

            <span className="text-xl font-bold tracking-tight">
              Resume<span className="text-indigo-600">IQ</span>
            </span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Home</span>
            <span className="sm:hidden">Home</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-violet-100/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-indigo-700">
              <ShieldCheck size={15} />
              Privacy & Security
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Your privacy matters.
              <span className="mt-2 block text-indigo-600">
                Your career, your data.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
              This page explains how ResumeIQ is designed to handle
              information when you use our resume analysis platform.
              We believe you should understand how your information
              is collected, used, and managed.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
                <LockKeyhole size={14} className="text-indigo-600" />
                Privacy-conscious design
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
                <Shield size={14} className="text-emerald-600" />
                Data transparency
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-[260px_1fr]">
          {/* Table of contents */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[1.5px] text-slate-400">
                On this page
              </h2>

              <nav className="space-y-1">
                {[
                  ["overview", "Overview"],
                  ["information", "Information We Handle"],
                  ["usage", "How We Use Information"],
                  ["documents", "Resume & Documents"],
                  ["storage", "Storage & Security"],
                  ["sharing", "Information Sharing"],
                  ["rights", "Your Privacy Rights"],
                  ["cookies", "Cookies & Tracking"],
                  ["changes", "Policy Updates"],
                  ["contact", "Contact Us"],
                ].map(([id, label]) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700"
                  >
                    {label}
                    <ChevronRight
                      size={15}
                      className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-500"
                    />
                  </a>
                ))}
              </nav>

              <div className="mt-5 rounded-xl bg-indigo-50 p-4">
                <div className="flex items-center gap-2 text-indigo-700">
                  <ShieldCheck size={17} />
                  <span className="text-sm font-bold">
                    Your information
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-600">
                  Avoid uploading sensitive personal information that
                  is not necessary for resume analysis.
                </p>
              </div>
            </div>
          </aside>

          {/* Privacy sections */}
          <div className="min-w-0 space-y-6">
            {/* Overview */}
            <PolicySection
              id="overview"
              number="01"
              title="Overview"
              icon={<ShieldCheck size={20} />}
            >
              <p>
                ResumeIQ is a resume analysis platform designed to help
                users compare their resumes with job descriptions,
                identify skill gaps, and receive structured recommendations.
              </p>

              <p>
                This page describes the intended information-handling
                practices of ResumeIQ. It is a development-stage policy
                template and should be reviewed and finalized before
                the application is made publicly available.
              </p>

              <p>
                By using ResumeIQ, you should review this policy and
                understand how information may be processed when you
                use the platform.
              </p>
            </PolicySection>

            {/* Information */}
            <PolicySection
              id="information"
              number="02"
              title="Information We Handle"
              icon={<Database size={20} />}
            >
              <p>
                Depending on the features you use, ResumeIQ may process
                the following categories of information:
              </p>

              <InfoCard
                title="Account information"
                description="Information such as your name, email address, and authentication credentials when you register for an account."
                icon={<UserCheck size={19} />}
              />

              <InfoCard
                title="Resume information"
                description="The resume file and extracted text you provide for resume-to-job-description analysis. This may include your education, skills, employment history, and contact details contained in the document."
                icon={<FileText size={19} />}
              />

              <InfoCard
                title="Job descriptions"
                description="The job description text you submit so the platform can compare job requirements with the information in your resume."
                icon={<FileSearch size={19} />}
              />

              <InfoCard
                title="Technical information"
                description="Information such as browser type, application logs, and technical error details may be processed to operate, troubleshoot, and maintain the platform."
                icon={<Eye size={19} />}
              />

              <p className="text-sm">
                The exact information collected will depend on the
                features implemented and enabled in the deployed
                application.
              </p>
            </PolicySection>

            {/* Usage */}
            <PolicySection
              id="usage"
              number="03"
              title="How We Use Information"
              icon={<Eye size={20} />}
            >
              <p>
                Information submitted to ResumeIQ may be used for
                the following purposes:
              </p>

              <BulletList
                items={[
                  "To analyze resume content against a provided job description.",
                  "To identify relevant skills, missing skills, and alignment between resume content and job requirements.",
                  "To generate analysis results and structured recommendations.",
                  "To create and manage user accounts and authenticate registered users.",
                  "To provide saved analysis history and dashboard functionality when available.",
                  "To diagnose technical problems, maintain application reliability, and protect the service against misuse.",
                ]}
              />

              <p>
                ResumeIQ is intended to provide informational resume
                feedback. Analysis results are not a guarantee of
                employment, an interview, or selection by an employer.
              </p>
            </PolicySection>

            {/* Documents */}
            <PolicySection
              id="documents"
              number="04"
              title="Resume & Document Processing"
              icon={<FileSearch size={20} />}
            >
              <p>
                ResumeIQ is designed to accept supported resume
                documents and extract text for analysis. Depending
                on the implementation, supported formats may include
                PDF, DOC, and DOCX.
              </p>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <LockKeyhole
                    size={19}
                    className="mt-0.5 shrink-0 text-amber-700"
                  />

                  <div>
                    <h4 className="text-sm font-bold text-amber-900">
                      Before uploading a document
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-amber-800">
                      Ensure that you have the right to submit the
                      document. Avoid including passwords, financial
                      account information, government identification
                      numbers, or other sensitive details that are
                      unnecessary for resume analysis.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Documents and extracted text may be processed by
                the application's backend and its configured analysis
                service to produce the requested results.
              </p>

              <p>
                The final production policy must specify whether
                original files and extracted text are retained,
                for how long they are retained, and how users can
                request their deletion.
              </p>
            </PolicySection>

            {/* Storage */}
            <PolicySection
              id="storage"
              number="05"
              title="Storage & Security"
              icon={<LockKeyhole size={20} />}
            >
              <p>
                ResumeIQ is being developed with a backend architecture
                that may use a database for account information and
                saved analysis records.
              </p>

              <p>
                Security measures should be implemented according
                to the information being processed. These may include:
              </p>

              <BulletList
                items={[
                  "Password hashing rather than storing passwords in plain text.",
                  "Authenticated access to account-specific resources.",
                  "Server-side validation of uploaded files and user input.",
                  "Restricted access to application secrets and database credentials.",
                  "Secure connections using HTTPS in production.",
                  "Appropriate controls for access to stored documents and analysis results.",
                ]}
              />

              <p>
                No online system can guarantee absolute security.
                The production deployment should document the security
                controls actually implemented rather than treating
                planned controls as completed measures.
              </p>
            </PolicySection>

            {/* Sharing */}
            <PolicySection
              id="sharing"
              number="06"
              title="Information Sharing"
              icon={<Database size={20} />}
            >
              <p>
                ResumeIQ does not need to publish your resume or
                job description publicly to provide its core analysis
                functionality.
              </p>

              <p>
                Information may be processed by infrastructure or
                service providers that are configured to operate
                the application, such as hosting, database, or
                analysis-service providers.
              </p>

              <p>
                The final policy should identify the actual providers,
                the information each provider receives, and the
                applicable retention and privacy terms before launch.
              </p>

              <p>
                ResumeIQ should not represent that information is
                never shared with third parties unless that claim
                has been verified against the deployed architecture
                and its service providers.
              </p>
            </PolicySection>

            {/* Rights */}
            <PolicySection
              id="rights"
              number="07"
              title="Your Privacy Rights"
              icon={<UserCheck size={20} />}
            >
              <p>
                Depending on applicable law and the final functionality
                of the service, users may have rights relating to
                their personal information, including:
              </p>

              <BulletList
                items={[
                  "Requesting access to personal information associated with their account.",
                  "Requesting correction of inaccurate account information.",
                  "Requesting deletion of account information and eligible saved records.",
                  "Withdrawing consent where processing is based on consent.",
                  "Raising questions or concerns about how information is processed.",
                ]}
              />

              <p>
                The availability and scope of these rights depend
                on applicable law. A contact and request-handling
                process should be established before public launch.
              </p>
            </PolicySection>

            {/* Cookies */}
            <PolicySection
              id="cookies"
              number="08"
              title="Cookies & Tracking"
              icon={<Eye size={20} />}
            >
              <p>
                The application may use browser storage, cookies,
                or similar technologies to support authentication,
                maintain sessions, and remember relevant preferences.
              </p>

              <p>
                The actual technologies used will depend on the
                authentication implementation and production
                configuration.
              </p>

              <p>
                Any analytics, advertising, or non-essential tracking
                technologies should be disclosed here if they are
                introduced into the deployed application.
              </p>
            </PolicySection>

            {/* Changes */}
            <PolicySection
              id="changes"
              number="09"
              title="Policy Updates"
              icon={<ShieldCheck size={20} />}
            >
              <p>
                This policy may be updated as ResumeIQ's features,
                infrastructure, and information-handling practices
                evolve.
              </p>

              <p>
                Material changes should be reflected in the published
                policy with an updated revision date. Where required
                by applicable law, users should be notified or
                asked to provide consent.
              </p>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Last updated
                </p>

                <p className="mt-1 text-sm font-bold text-slate-700">
                  {lastUpdated}
                </p>
              </div>
            </PolicySection>

            {/* Contact */}
            <PolicySection
              id="contact"
              number="10"
              title="Contact Us"
              icon={<Mail size={20} />}
            >
              <p>
                If you have questions about this policy or the
                handling of your information, contact the ResumeIQ
                team through the official contact channel provided
                with the deployed application.
              </p>

              <div className="mt-5 rounded-xl border border-indigo-100 bg-indigo-50 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600">
                    <Mail size={19} />
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      Privacy questions
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      The official privacy contact email should be
                      added before the application is publicly launched.
                    </p>
                  </div>
                </div>
              </div>
            </PolicySection>

            {/* Bottom CTA */}
            <div className="rounded-2xl bg-[#11132D] p-7 sm:p-9">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Ready to continue?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Return to ResumeIQ and continue working on your
                    resume analysis.
                  </p>
                </div>

                <Link
                  to="/"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  Go to ResumeIQ
                  <ChevronRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-7 text-xs text-slate-400 sm:flex-row sm:items-center sm:px-8">
          <p>
            © {new Date().getFullYear()} ResumeIQ. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              to="/terms"
              className="transition hover:text-indigo-600"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/login"
              className="transition hover:text-indigo-600"
            >
              Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* =========================================
   Reusable Privacy Policy Components
========================================= */

function PolicySection({ id, number, title, icon, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>

        <div>
          <p className="mb-1 text-xs font-bold uppercase tracking-[1.5px] text-indigo-500">
            Section {number}
          </p>

          <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {title}
          </h2>
        </div>
      </div>

      <div className="space-y-4 text-sm leading-7 text-slate-600">
        {children}
      </div>
    </section>
  );
}

function InfoCard({ title, description, icon }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
        {icon}
      </div>

      <div>
        <h4 className="text-sm font-bold text-slate-800">{title}</h4>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />

          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}