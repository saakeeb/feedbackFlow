import Link from 'next/link';
import Button from '@/components/ui/Button';
import { constructMetadata } from '@/lib/seo/metadata';
import { ArrowRight } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'About FeedbackFlow — Say What Needs to Be Said',
  description:
    'Learn why FeedbackFlow was built: to give people a fearless, anonymous way to give constructive feedback on any paragraph or idea.',
  canonical: '/about',
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24 sm:px-8 space-y-16">
      {/* Editorial Header */}
      <div className="space-y-6 border-b border-white/10 pb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95] block">
          Philosophy & Vision
        </span>
        <h1 className="text-display font-display text-[#f5f3ee] tracking-tight uppercase leading-[0.98]">
          Quiet.
          <br />
          Fearless.
        </h1>
        <p className="text-lg sm:text-xl text-[#9a9a95] leading-relaxed max-w-2xl">
          FeedbackFlow is built around a simple human problem: people often know what should be improved, but hesitate to say it because their identity is attached.
        </p>
      </div>

      <div className="space-y-10 text-[#9a9a95] text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#f5f3ee] tracking-tight">
            Say what needs to be said.
          </h2>
          <p>
            When someone opens FeedbackFlow, the immediate feeling should be: <span className="text-[#f5f3ee] font-medium">“I can finally say this without worrying about being exposed.”</span> Not: “This is another corporate feedback dashboard.”
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#f5f3ee] tracking-tight">
            Comment on the work. Not the person.
          </h2>
          <p>
            The feedback should feel attached directly to the content, not detached inside a generic comment box. FeedbackFlow allows anyone to read a document, select the relevant paragraph, and leave constructive feedback that remains anchored to that exact thought.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#f5f3ee] tracking-tight">
            Anonymous does not mean careless.
          </h2>
          <p>
            We reject the dopamine loops of infinite chat feeds and glowing badges. FeedbackFlow actively encourages actionable, respectful, and specific critique while protecting psychological safety through real database constraints.
          </p>
        </section>
      </div>

      {/* CTA Box */}
      <div className="rounded-xl border border-white/15 bg-[#141414] p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1">
          <h3 className="font-bold font-display text-xl text-[#f5f3ee]">
            Ready to give fearless feedback?
          </h3>
          <p className="text-xs text-[#9a9a95]">
            Start gathering constructive observations with your team today.
          </p>
        </div>
        <Link href="/app">
          <Button size="lg" className="gap-2">
            Open Workspace
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
