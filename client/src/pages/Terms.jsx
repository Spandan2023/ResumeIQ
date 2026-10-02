
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  ShieldCheck,
  UserCheck,
  AlertTriangle,
  Scale,
  LockKeyhole,
  Ban,
  Mail,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    icon: CheckCircle2,
    content: [
      "By accessing or using ResumeIQ, you agree to these Terms of Service. If you do not agree with these terms, please do not use the platform.",
      "These terms apply to all users, including visitors, guest users, and registered account holders.",
    ],
  },
  {
    id: "services",
    title: "2. About ResumeIQ",
    icon: Sparkles,
    content: [
      "ResumeIQ is a resume analysis and career preparation platform designed to help users understand how their resumes align with job descriptions.",
      "The platform may provide resume and job description comparisons, skill matching, identification of missing skills, and suggestions for improving resume content.",
      "Features may change, be added, or be discontinued as the platform evolves.",
    ],
  },
  {
    id: "accounts",
    title: "3. User Accounts",
    icon: UserCheck,
    content: [
      "Certain features, such as saving analysis history, may require you to create an account.",
      "You agree to provide accurate information when registering and to keep your account information up to date.",
      "You are responsible for maintaining the confidentiality of your login credentials and for activities performed through your account.",
      "You should notify the ResumeIQ team if you become aware of unauthorized access to your account.",
    ],
  },
  {
    id: "uploads",
    title: "4. Resume Uploads and User Content",
    icon: FileText,
    content: [
      "You may upload resumes and provide job descriptions for analysis. You must have the right and permission to submit any content you upload.",
      "Do not upload documents containing another person's personal information unless you have appropriate authorization.",
      "You retain ownership of the content you provide. By submitting content, you authorize ResumeIQ to process it to provide the requested features, subject to the applicable Privacy Policy.",
      "You are responsible for reviewing your documents before uploading them and for ensuring that your use of the platform complies with applicable laws.",
    ],
  },
  {
    id: "ai",
    title: "5. AI-Generated Analysis and Disclaimer",
    icon: Sparkles,
    content: [
      "ResumeIQ may use automated algorithms, machine learning, and artificial intelligence to analyze resumes and job descriptions.",
      "Analysis results, match scores, skill classifications, and recommendations are generated estimates based on the information provided and the capabilities of the system.",
      "A resume match score is an indication of alignment between a resume and a job description. It is not a probability of getting hired, an interview guarantee, or a prediction of recruitment outcomes.",
      "AI-generated results may contain inaccuracies, omissions, or outdated information. You should independently review all results before relying on them.",
      "ResumeIQ does not guarantee employment, interviews, salary increases, or any specific career outcome.",
    ],
  },
  {
    id: "acceptable-use",
    title: "6. Acceptable Use",
    icon: ShieldCheck,
    content: [
      "You agree to use ResumeIQ only for lawful purposes and in accordance with these terms.",
      "You must not:",
    ],
    bullets: [
      "Use the platform to upload unlawful, fraudulent, or unauthorized content.",
      "Attempt to gain unauthorized access to accounts, servers, or systems.",
      "Interfere with the security, availability, or operation of the platform.",
      "Use automated tools to overload, scrape, or abuse the service without permission.",
      "Reverse engineer or attempt to exploit the platform except where permitted by applicable law.",
      "Use ResumeIQ to misrepresent your qualifications, experience, or professional credentials.",
    ],
  },
  {
    id: "privacy",
    title: "7. Privacy and Data Handling",
    icon: LockKeyhole,
    content: [
      "Your use of ResumeIQ is also governed by our Privacy Policy, which describes how personal information and uploaded documents may be collected, processed, stored, and handled.",
      "Please review the Privacy Policy before submitting resumes or other personal information.",
      "You should avoid uploading sensitive personal information that is not necessary for the requested analysis.",
    ],
  },
  {
    id: "availability",
    title: "8. Availability and Changes",
    icon: AlertTriangle,
    content: [
      "ResumeIQ is under development. Some features may be experimental, incomplete, unavailable, or subject to change.",
      "We do not guarantee uninterrupted access, error-free operation, or continuous availability of the platform.",
      "We may update, modify, suspend, or discontinue features as the service develops, subject to applicable law.",
    ],
  },
  {
    id: "liability",
    title: "9. Limitation of Liability",
    icon: Scale,
    content: [
      "To the extent permitted by applicable law, ResumeIQ is provided on an 'as is' and 'as available' basis.",
      "ResumeIQ is a decision-support tool and does not replace your own judgment, professional advice, or verification of information.",
      "To the extent permitted by law, the ResumeIQ team shall not be liable for indirect, incidental, special, or consequential losses arising from your use of the platform, reliance on generated results, or inability to access the service.",
      "Nothing in these terms excludes or limits liability that cannot legally be excluded or limited under applicable law.",
    ],
  },
  {
    id: "termination",
    title: "10. Suspension and Termination",
    icon: Ban,
    content: [
      "We may restrict or suspend access to the platform if we reasonably believe that a user has violated these terms, misused the service, or created a security risk.",
      "You may stop using ResumeIQ at any time. Account deletion and associated data handling will be subject to the available account features and our Privacy Policy.",
    ],
  },
  {
    id: "changes",
    title: "11. Changes to These Terms",
    icon: FileText,
    content: [
      "These terms may be updated as ResumeIQ develops or as legal and operational requirements change.",
      "Updated terms will be published on this page with a revised effective date. Your continued use of the platform after changes take effect constitutes acceptance of the updated terms, to the extent permitted by applicable law.",
    ],
  },
  {
    id: "contact",
    title: "12. Contact",
    icon: Mail,
    content: [
      "If you have questions about these Terms of Service, please contact the ResumeIQ team through the official contact channel provided on the platform.",
      "A verified contact email or support address should be added here before the platform is publicly launched.",
    ],
  },
];

function TermsSection({ section }) {
  const Icon = section.icon;

  return (
    <section
      id={section.id}
      className="scroll-mt-28 border-b border-slate-100 py-8 last:border-0"
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={19} />
        </div>

        <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          {section.title}
        </h2>
      </div>

      <div className="space-y-4 pl-0 text-sm leading-7 text-slate-600 sm:pl-[52px]">
        {section.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {section.bullets && (
          <ul className="space-y-3">
            {section.bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <FileText size={19} />
            </div>

            <span className="text-lg font-bold tracking-tight text-slate-900">
              Resume<span className="text-blue-600">IQ</span>
            </span>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-slate-100 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <Scale size={14} />
              Legal information
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Terms of Service
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500">
              Please read these terms carefully before using ResumeIQ. They
              explain the conditions of using our resume analysis and career
              preparation platform.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                Effective date: September 26, 2026
              </span>

              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                Version 1.0
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto grid max-w-7xl gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 lg:py-16">
        {/* Table of Contents */}
        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-sm font-bold text-slate-900">
              On this page
            </h2>

            <nav className="space-y-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-lg px-3 py-2 text-xs leading-5 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-600">
              <ShieldCheck size={18} />
            </div>

            <h3 className="text-sm font-bold text-slate-900">
              Your privacy matters
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Learn how ResumeIQ handles your personal information and uploaded
              documents.
            </p>

            <Link
              to="/privacy"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Read Privacy Policy
              <ArrowLeft className="rotate-180" size={14} />
            </Link>
          </div>
        </aside>

        {/* Terms Sections */}
        <article className="min-w-0">
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle
                size={20}
                className="mt-0.5 shrink-0 text-amber-600"
              />

              <div>
                <h2 className="text-sm font-bold text-amber-900">
                  Development-stage notice
                </h2>

                <p className="mt-2 text-sm leading-6 text-amber-800">
                  ResumeIQ is currently under development. These terms are a
                  preliminary template for the project and have not been
                  reviewed by a legal professional. They must be checked
                  against the actual service, data practices, and applicable
                  laws before public launch.
                </p>
              </div>
            </div>
          </div>

          {sections.map((section) => (
            <TermsSection key={section.id} section={section} />
          ))}

          {/* Bottom CTA */}
          <div className="mt-8 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold">
                  Have questions about these terms?
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Visit ResumeIQ or review our Privacy Policy for more
                  information.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/privacy"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Privacy Policy
                </Link>

                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Go to ResumeIQ
                  <ArrowLeft className="rotate-180" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <Link to="/" className="flex items-center gap-2">
            <FileText size={18} className="text-blue-600" />

            <span className="text-sm font-bold text-slate-900">
              Resume<span className="text-blue-600">IQ</span>
            </span>
          </Link>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} ResumeIQ. All rights reserved.
          </p>

          <div className="flex gap-5 text-xs font-medium text-slate-500">
            <Link to="/privacy" className="hover:text-blue-600">
              Privacy
            </Link>

            <Link to="/terms" className="hover:text-blue-600">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}