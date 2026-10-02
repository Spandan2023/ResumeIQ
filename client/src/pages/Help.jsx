import {
  ArrowLeft,
  ChevronDown,
  CircleHelp,
  FileSearch,
  FileText,
  Mail,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useState } from "react";

const faqItems = [
  {
    question: "How does ResumeIQ work?",
    answer:
      "Upload your resume, paste a job description, and start the analysis. ResumeIQ compares the information provided and presents the resulting match score, matched skills, missing skills, and recommendations.",
    icon: Sparkles,
  },
  {
    question: "Which resume formats are supported?",
    answer:
      "ResumeIQ currently supports PDF and DOCX resume files. For the most reliable text extraction, a clean, ATS-friendly resume layout is recommended.",
    icon: FileText,
  },
  {
    question: "What does the match score mean?",
    answer:
      "The match score represents how closely the information detected in your resume aligns with the job description you provided. It is an analysis score, not a prediction of whether you will receive an interview or a job offer.",
    icon: FileSearch,
  },
  {
    question: "Where can I find my previous analyses?",
    answer:
      "Saved analyses are available from the Analysis History section of your ResumeIQ account. Guest analyses are temporary and are not stored as permanent account history.",
    icon: FileSearch,
  },
  {
    question: "Can I delete a saved analysis?",
    answer:
      "Yes. Registered users can delete individual saved analyses from their analysis history. Once deleted, that saved analysis is removed from your account history.",
    icon: Trash2,
  },
  {
    question: "How is my information handled?",
    answer:
      "ResumeIQ processes uploaded resumes and job descriptions to provide the requested analysis. Registered users can have analyses stored in their account history, while guest analyses do not receive permanent history.",
    icon: ShieldCheck,
  },
];

function FAQItem({ item, isOpen, onToggle }) {
  const Icon = item.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
        aria-expanded={isOpen}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Icon size={19} />
        </div>

        <span className="flex-1 text-sm font-semibold leading-6 text-slate-900">
          {item.question}
        </span>

        <ChevronDown
          size={18}
          className={`shrink-0 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4 sm:px-6">
          <p className="pl-14 text-sm leading-7 text-slate-500">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function Help() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-[76px] max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            to="/dashboard"
            className="flex items-center gap-2.5"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <FileText size={20} strokeWidth={2.2} />

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
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Hero */}
        <section className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-700">
            <CircleHelp size={14} />
            Help &amp; Support
          </div>

          <h1 className="mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            How can we help?
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Find answers to common questions about
            ResumeIQ and how to use the resume
            analysis workflow.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
              Common Questions
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              Frequently asked questions
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Quick answers to the things users are
              most likely to need help with.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, index) => (
              <FAQItem
                key={item.question}
                item={item}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </section>

        {/* Contact section */}
        <section className="mt-10 overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                <Mail size={21} />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-indigo-600">
                  Need further assistance?
                </p>

                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  Contact the ResumeIQ team
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Could not find what you were
                  looking for? Contact the ResumeIQ
                  team with your question or describe
                  the issue you are experiencing. Please
                  include enough detail for us to
                  understand the problem.
                </p>

                <div className="mt-5 rounded-xl border border-white/80 bg-white/80 px-4 py-3.5">
                  <p className="text-sm leading-6 text-slate-600">
                    Support contact details can be added
                    here once the project's official
                    support email has been finalized.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
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
        </div>
      </main>
    </div>
  );
}