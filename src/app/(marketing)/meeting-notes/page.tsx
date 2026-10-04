import Link from 'next/link';
import Button from '@/components/ui/Button';
import { constructMetadata } from '@/lib/seo/metadata';
import { Calendar, CheckCircle2, Clock, Users, ArrowRight } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Living Meeting Notes & Team Syncs — FeedbackFlow',
  description:
    'Turn wasteful status meetings into crisp, asynchronous pre-reads and accountable action items with living markdown meeting notes.',
  canonical: '/meeting-notes',
});

export default function MeetingNotesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24 sm:px-8 space-y-20">
      {/* Editorial Header */}
      <div className="space-y-6 border-b border-white/10 pb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95] block">
          Cadence & Meeting Philosophy
        </span>
        <h1 className="text-display font-display text-[#f5f3ee] tracking-tight uppercase leading-[0.98]">
          Keep Syncs
          <br />
          Sacred.
        </h1>
        <p className="text-lg sm:text-xl text-[#9a9a95] leading-relaxed max-w-3xl">
          Feedback shouldn't disappear when the meeting ends. Transform syncs into living records with pre-reads, clear takeaways, and asynchronous follow-up reflections.
        </p>
      </div>

      {/* 3 Principles Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-white/15 bg-[#141414] p-6 space-y-4">
          <div className="h-9 w-9 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[#d8ff3e]">
            <Clock className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-[#f5f3ee]">
            30-Minute Caps
          </h3>
          <p className="text-xs text-[#9a9a95] leading-relaxed">
            Default to shorter, high-intensity discussions. Long syncs dilute focus and encourage passive attendance.
          </p>
        </div>

        <div className="rounded-xl border border-white/15 bg-[#141414] p-6 space-y-4">
          <div className="h-9 w-9 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[#d8ff3e]">
            <Users className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-[#f5f3ee]">
            Essential Attendees
          </h3>
          <p className="text-xs text-[#9a9a95] leading-relaxed">
            Invite only direct decision-makers. Inform the broader team asynchronously by sharing living meeting notes.
          </p>
        </div>

        <div className="rounded-xl border border-white/15 bg-[#141414] p-6 space-y-4">
          <div className="h-9 w-9 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[#d8ff3e]">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold font-display text-[#f5f3ee]">
            Accountable Actions
          </h3>
          <p className="text-xs text-[#9a9a95] leading-relaxed">
            Every discussion must conclude with explicit owners and completion deadlines recorded in the integrated checklist.
          </p>
        </div>
      </div>

      {/* Editorial Content */}
      <div className="space-y-10 text-[#9a9a95] text-base leading-relaxed max-w-3xl">
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#f5f3ee] tracking-tight">
            The Death of the Status Update Meeting
          </h2>
          <p>
            One of the greatest productivity drains in modern engineering and product teams is the round-robin status update. When ten people spend an hour reciting what they did yesterday, fifty percent of attendees tune out while waiting for their turn.
          </p>
          <p>
            Status updates belong in written text. Live syncs should be reserved exclusively for:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[#f5f3ee]/85">
            <li>Unblocking architectural disputes.</li>
            <li>Aligning on cross-functional product roadmap changes.</li>
            <li>Conducting blameless retrospectives on customer feedback and incidents.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#f5f3ee] tracking-tight">
            The Living Document Method
          </h2>
          <p>
            FeedbackFlow treats meeting notes as living organizational knowledge. Instead of notes vanishing into personal notebooks or ephemeral chat channels, they reside in a searchable team hub alongside feedback and resources.
          </p>
        </section>
      </div>

      {/* Bottom CTA Card */}
      <div className="rounded-xl border border-white/15 bg-[#141414] p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <h3 className="font-bold font-display text-xl sm:text-2xl text-[#f5f3ee] tracking-tight">
            Try FeedbackFlow Meetings
          </h3>
          <p className="text-xs sm:text-sm text-[#9a9a95]">
            Schedule a sync and test our living note-taking system.
          </p>
        </div>
        <Link href="/app/meetings">
          <Button size="lg" className="gap-2 shrink-0">
            Schedule a meeting
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
