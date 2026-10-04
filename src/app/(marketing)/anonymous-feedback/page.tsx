import Link from 'next/link';
import Button from '@/components/ui/Button';
import { constructMetadata } from '@/lib/seo/metadata';
import { ShieldCheck, Lock, CheckCircle, ArrowRight, Database, EyeOff, Terminal } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Anonymous Employee Feedback — Trust & Psychological Safety',
  description:
    'Collect honest, constructive employee feedback without compromising identities. Learn how FeedbackFlow implements architectural anonymity.',
  canonical: '/anonymous-feedback',
});

export default function AnonymousFeedbackPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24 sm:px-8 space-y-20">
      {/* Editorial Header */}
      <div className="space-y-6 border-b border-white/10 pb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95] block">
          Architecture & Psychological Safety
        </span>
        <h1 className="text-display font-display text-[#f5f3ee] tracking-tight uppercase leading-[0.98]">
          Fearless
          <br />
          Feedback.
        </h1>
        <p className="text-lg sm:text-xl text-[#9a9a95] leading-relaxed max-w-3xl">
          Why anonymity is necessary for truth, how power dynamics suppress candid feedback, and how FeedbackFlow enforces identity protection at the PostgreSQL layer.
        </p>
      </div>

      {/* 3 Core Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-white/15 bg-[#141414] p-6 space-y-4">
          <div className="h-9 w-9 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[#d8ff3e]">
            <Database className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-[#f5f3ee]">
            Zero Attribution
          </h3>
          <p className="text-xs text-[#9a9a95] leading-relaxed">
            When users check the anonymous toggle, the backend sets the <code className="text-[#d8ff3e] font-mono">user_id</code> column to null. No account references exist in database records.
          </p>
        </div>

        <div className="rounded-xl border border-white/15 bg-[#141414] p-6 space-y-4">
          <div className="h-9 w-9 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[#d8ff3e]">
            <EyeOff className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-[#f5f3ee]">
            Metadata Scrubbing
          </h3>
          <p className="text-xs text-[#9a9a95] leading-relaxed">
            Browser user-agent fingerprints and IP addresses are stripped from anonymous submission payloads to prevent network correlation attacks.
          </p>
        </div>

        <div className="rounded-xl border border-white/15 bg-[#141414] p-6 space-y-4">
          <div className="h-9 w-9 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[#d8ff3e]">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-[#f5f3ee]">
            Row-Level Security
          </h3>
          <p className="text-xs text-[#9a9a95] leading-relaxed">
            Enforced natively in PostgreSQL via Supabase RLS. No application administrator or team lead can query identities that were never stored.
          </p>
        </div>
      </div>

      {/* Editorial Essay / Analysis */}
      <div className="space-y-12 text-[#9a9a95] text-base leading-relaxed max-w-3xl">
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#f5f3ee] tracking-tight">
            Why Teams Need Anonymous Feedback
          </h2>
          <p>
            In any organization with hierarchy, employees naturally evaluate whether expressing an unpopular opinion or critiquing leadership will jeopardize their bonus, promotion, or day-to-day standing. Even with the best intentions, leaders cannot eliminate this hesitation solely by saying “my door is always open.”
          </p>
          <p>
            Anonymity allows the merit of an idea to speak for itself. It helps organizations detect:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[#f5f3ee]/80">
            <li>Unspoken burnout and unsustainable engineering deadlines.</li>
            <li>Tooling deficiencies that engineers complain about privately in DMs.</li>
            <li>Constructive suggestions from quiet team members who avoid public debate.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#f5f3ee] tracking-tight">
            Best Practices for Handling Anonymous Inputs
          </h2>
          <p>
            Collecting feedback is only half the battle. How leaders respond dictates whether employees will continue to trust the system:
          </p>
          <ol className="list-decimal pl-5 space-y-3 text-[#f5f3ee]/80">
            <li>
              <strong className="text-[#f5f3ee]">Acknowledge and Validate:</strong> Even if a suggestion cannot be implemented immediately, thank the team and explain the rationale.
            </li>
            <li>
              <strong className="text-[#f5f3ee]">Tie Feedback to Meeting Agendas:</strong> Review recurring topic comments in bi-weekly syncs using FeedbackFlow's integrated meeting notes.
            </li>
            <li>
              <strong className="text-[#f5f3ee]">Never Attempt to Hunt the Author:</strong> Speculating or analyzing linguistic patterns destroys trust instantly. Treat feedback as a gift from the collective team.
            </li>
          </ol>
        </section>
      </div>

      {/* Bottom CTA Card */}
      <div className="rounded-xl border border-white/15 bg-[#141414] p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <h3 className="font-bold font-display text-xl sm:text-2xl text-[#f5f3ee] tracking-tight">
            Create an anonymous feedback topic
          </h3>
          <p className="text-xs sm:text-sm text-[#9a9a95]">
            Invite your colleagues to share their thoughts safely in seconds.
          </p>
        </div>
        <Link href="/app/feedback">
          <Button size="lg" className="gap-2 shrink-0">
            Create feedback topic
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
