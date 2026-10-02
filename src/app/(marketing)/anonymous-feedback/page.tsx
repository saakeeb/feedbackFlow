import Link from 'next/link';
import Button from '@/components/ui/Button';
import { constructMetadata } from '@/lib/seo/metadata';
import { ShieldCheck, Lock, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Anonymous Employee Feedback — Trust & Psychological Safety',
  description:
    'Collect honest, constructive employee feedback without compromising identities. Learn how FeedbackFlow implements architectural anonymity.',
  canonical: '/anonymous-feedback',
});

export default function AnonymousFeedbackPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 space-y-16">
      <div className="space-y-4 border-b border-slate-200 pb-8 text-center sm:text-left">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Psychological Safety Guide
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
          How to collect anonymous employee feedback safely
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
          Learn why anonymity is critical for candid communication, how power dynamics suppress truth, and how to implement authentic identity protection in software.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-2">
          <div className="text-emerald-700 font-semibold text-sm flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" />
            Zero Attribution
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            When users check the anonymous toggle, the backend sets the user ID column to null. No account references exist in database rows.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-2">
          <div className="text-emerald-700 font-semibold text-sm flex items-center gap-1.5">
            <Lock className="h-4 w-4" />
            Metadata Scrubbing
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Browser user-agent fingerprints and IP addresses are stripped from anonymous submission payloads to prevent correlation attacks.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-2">
          <div className="text-emerald-700 font-semibold text-sm flex items-center gap-1.5">
            <CheckCircle className="h-4 w-4" />
            Verified Guarantees
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            We avoid fake marketing promises like "untraceable blockchain." We implement verifiable database constraints and Row Level Security.
          </p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            Why Teams Need Anonymous Feedback
          </h2>
          <p>
            In any organization with hierarchy, employees naturally evaluate whether expressing an unpopular opinion or critiquing leadership will jeopardize their bonus, promotion, or day-to-day standing. Even with the best intentions, leaders cannot eliminate this hesitation solely by saying "my door is always open."
          </p>
          <p>
            Anonymity allows the merit of an idea to speak for itself. It helps organizations detect:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Unspoken burnout and unsustainable engineering deadlines.</li>
            <li>Tooling deficiencies that engineers complain about privately in DMs.</li>
            <li>Constructive suggestions from quiet team members who avoid public debate.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            Best Practices for Handling Anonymous Inputs
          </h2>
          <p>
            Collecting feedback is only half the battle. How leaders respond dictates whether employees will continue to trust the system:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-600">
            <li>
              <strong>Acknowledge and Validate:</strong> Even if a suggestion cannot be implemented immediately, thank the team and explain the rationale.
            </li>
            <li>
              <strong>Tie Feedback to Meeting Agendas:</strong> Review recurring topic comments in bi-weekly syncs using FeedbackFlow's integrated meeting notes.
            </li>
            <li>
              <strong>Never Attempt to Hunt the Author:</strong> Speculating or analyzing linguistic patterns destroys trust instantly. Treat feedback as a gift from the collective team.
            </li>
          </ol>
        </section>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900 text-base">
            Create an anonymous feedback topic
          </h3>
          <p className="text-xs text-slate-500">
            Invite your colleagues to share their thoughts safely in seconds.
          </p>
        </div>
        <Link href="/app/feedback">
          <Button size="sm" className="gap-2 shrink-0">
            Create feedback topic
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
