import Link from 'next/link';
import Button from '@/components/ui/Button';
import { constructMetadata } from '@/lib/seo/metadata';

export const metadata = constructMetadata({
  title: 'About FeedbackFlow — Our Philosophy on Workplace Communication',
  description:
    'Learn why FeedbackFlow was built to prioritize quiet productivity, psychological safety, and honest asynchronous team feedback.',
  canonical: '/about',
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 space-y-12">
      <div className="space-y-4 border-b border-slate-200 pb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Our Story & Philosophy
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          A calm interface for honest feedback
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          FeedbackFlow was created to fix a simple problem: most workplace communication tools prioritize noise, urgency, and superficial reactions over thoughtful deliberation and genuine psychological safety.
        </p>
      </div>

      <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Quiet Productivity</h2>
          <p>
            We reject the dopamine loops of infinite chat streams, glowing badges, and gamified animations in software meant for work. When dealing with sensitive team issues, product trade-offs, or retrospective observations, developers and managers deserve software that respects their focus.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">
            Psychological Safety Through Real Architecture
          </h2>
          <p>
            Anonymity is not a marketing buzzword—it is an architectural contract. Many tools pretend to be anonymous while storing user IDs in unindexed database records or tracking IP addresses. In FeedbackFlow, anonymous submissions set user ID to null at the database level and strip tracking fingerprints, ensuring privacy promises are verifiable in code.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Actionable Outcomes</h2>
          <p>
            Feedback without action breeds cynicism. FeedbackFlow pairs open feedback streams directly with structured meeting agendas and assigned action items, closing the loop between team critiques and real organizational progress.
          </p>
        </section>
      </div>

      <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900 text-base">
            Ready to try FeedbackFlow?
          </h3>
          <p className="text-xs text-slate-500">
            Start gathering constructive feedback with your team today.
          </p>
        </div>
        <Link href="/app">
          <Button size="sm">Open Workspace</Button>
        </Link>
      </div>
    </div>
  );
}
