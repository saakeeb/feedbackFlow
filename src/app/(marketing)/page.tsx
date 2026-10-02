import Link from 'next/link';
import Button from '@/components/ui/Button';
import {
  MessageSquare,
  ShieldCheck,
  Calendar,
  BookOpen,
  ArrowRight,
  CheckCircle,
  FileText,
  Lock,
} from 'lucide-react';
import { constructMetadata } from '@/lib/seo/metadata';
import { getSoftwareApplicationSchema } from '@/lib/seo/structured-data';

export const metadata = constructMetadata({
  title: 'Calm Workplace Feedback, Meeting Notes & Team Collaboration',
  description:
    'A quiet workplace communication platform for honest anonymous feedback, productive meetings, and accountable team clarity.',
  canonical: '/',
});

export default function HomePage() {
  const jsonLd = getSoftwareApplicationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="space-y-24 py-12 sm:py-20">
        {/* Hero Section */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Designed for thoughtful workplace communication
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12]">
            Honest feedback. Clear meetings. Less friction.
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            FeedbackFlow gives engineering and product teams a dedicated, quiet space
            to surface anonymous reflections, coordinate syncs with living notes,
            and document shared operating guidelines.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/app">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Open Workspace
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Features
              </Button>
            </Link>
          </div>
        </section>

        {/* Product Interactive Preview Box */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-xl border border-slate-200 bg-white shadow-card overflow-hidden">
            {/* Window bar */}
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-slate-300" />
                <div className="h-3 w-3 rounded-full bg-slate-300" />
                <div className="h-3 w-3 rounded-full bg-slate-300" />
              </div>
              <span className="text-xs font-mono text-slate-400">
                app.feedbackflow.com/app/feedback
              </span>
              <div className="w-12" />
            </div>

            {/* Mock workspace view */}
            <div className="p-6 sm:p-8 space-y-6 bg-slate-50/30">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 flex-wrap gap-2">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    Q4 Engineering Culture & Retrospective
                  </h3>
                  <p className="text-xs text-slate-500">
                    Topic created for asynchronous team reflection
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-medium">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Anonymous mode enabled
                </div>
              </div>

              {/* Sample Responses */}
              <div className="space-y-3">
                <div className="rounded-md border border-slate-200 bg-white p-4 space-y-1.5 shadow-subtle">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-900 flex items-center gap-1">
                      <Lock className="h-3 w-3 text-slate-400" />
                      Anonymous Contributor
                    </span>
                    <span>2 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    "Our PR review turnaround times improved dramatically after the new bot was introduced, but our staging environment flakiness is still causing Friday deployment stress. We should prioritize environment stability next sprint."
                  </p>
                </div>

                <div className="rounded-md border border-slate-200 bg-white p-4 space-y-1.5 shadow-subtle">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-medium text-slate-900">
                      David Kim (Staff Architect)
                    </span>
                    <span>Yesterday</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    "Agreed with the staging feedback. Let's carve out 3 days in the upcoming sprint dedicated specifically to reproducible integration tests."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Three pillars for serene team execution
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
              Everything teams need to collaborate transparently without the noise of fragmented chat threads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg border border-slate-200 bg-white p-6 space-y-3 shadow-subtle">
              <div className="h-9 w-9 rounded-md bg-slate-100 flex items-center justify-center text-slate-900">
                <MessageSquare className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Anonymous & Named Feedback
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Provide psychological safety for sensitive observations while supporting public team dialogue on roadmap items.
              </p>
              <Link
                href="/anonymous-feedback"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:underline pt-2"
              >
                Learn about anonymity guarantees →
              </Link>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 space-y-3 shadow-subtle">
              <div className="h-9 w-9 rounded-md bg-slate-100 flex items-center justify-center text-slate-900">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Purposeful Meeting Notes
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Replace status meetings with concise agendas, pre-reads, and actionable tasks with assigned owners.
              </p>
              <Link
                href="/meeting-notes"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:underline pt-2"
              >
                Explore meeting note frameworks →
              </Link>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 space-y-3 shadow-subtle">
              <div className="h-9 w-9 rounded-md bg-slate-100 flex items-center justify-center text-slate-900">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">
                Living Team Resources
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A shared repository for retrospectives, 1-on-1 templates, feedback etiquette handbooks, and team policies.
              </p>
              <Link
                href="/resources"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:underline pt-2"
              >
                Browse verified templates →
              </Link>
            </div>
          </div>
        </section>

        {/* Trust & Privacy Principles */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-8 sm:p-10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Architectural Integrity
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Privacy claims that match the actual codebase
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We never make claims like "completely untraceable" without architectural backing. Our backend Row Level Security strictly decouples anonymous submissions from authenticated user identifiers at the database layer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">
                  Author ID scrubbed to null for anonymous submissions
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">
                  Supabase Row Level Security enforced on all endpoints
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">
                  Clean shareable links for cross-functional participation
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">
                  Full keyboard navigation and accessible touch targets
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-5">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Start collecting honest team feedback today
          </h2>
          <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base">
            Join forward-thinking product and engineering teams using FeedbackFlow for constructive workplace communication.
          </p>
          <div className="pt-2">
            <Link href="/signup">
              <Button size="lg">Create your account</Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
