import Link from 'next/link';
import Button from '@/components/ui/Button';
import { constructMetadata } from '@/lib/seo/metadata';
import { Calendar, CheckCircle2, Clock, Users, ArrowRight } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Effective Meeting Notes & Agendas — The FeedbackFlow Framework',
  description:
    'Turn wasteful status meetings into crisp, asynchronous pre-reads and accountable action items with living markdown meeting notes.',
  canonical: '/meeting-notes',
});

export default function MeetingNotesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 space-y-16">
      <div className="space-y-4 border-b border-slate-200 pb-8 text-center sm:text-left">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Workplace Productivity
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
          How to run purposeful meetings with living notes
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
          A proven framework for cutting unnecessary syncs, documenting decisions in real time, and holding teams accountable with clear action items.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-2">
          <div className="text-slate-900 font-semibold text-sm flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-slate-500" />
            30-Minute Caps
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Default to shorter, high-intensity discussions. Long meetings dilute focus and invite passive attendance.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-2">
          <div className="text-slate-900 font-semibold text-sm flex items-center gap-1.5">
            <Users className="h-4 w-4 text-slate-500" />
            Essential Attendees Only
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Invite only direct decision-makers. Inform others asynchronously by sharing the final meeting notes document.
          </p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-2">
          <div className="text-slate-900 font-semibold text-sm flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Accountable Action Items
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every discussion must conclude with explicit owners and completion deadlines recorded in the integrated checklist.
          </p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            The Death of the Status Update Meeting
          </h2>
          <p>
            One of the greatest productivity drains in tech companies is the round-robin status update. When ten engineers spend an hour reciting what they did yesterday, fifty percent of attendees zone out while waiting for their turn.
          </p>
          <p>
            Status updates belong in written text. Live syncs should be reserved exclusively for:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Unblocking architectural disputes.</li>
            <li>Aligning on cross-team dependencies.</li>
            <li>Conducting blameless retrospectives on post-mortems and feedback.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold text-slate-900">
            The Living Document Method
          </h2>
          <p>
            FeedbackFlow treats meeting notes as living organizational knowledge. Instead of notes vanishing into personal notebooks or ephemeral chat channels, they reside in a searchable team hub alongside feedback and resources.
          </p>
        </section>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-slate-900 text-base">
            Try FeedbackFlow Meetings
          </h3>
          <p className="text-xs text-slate-500">
            Schedule a meeting and test our living note-taking system.
          </p>
        </div>
        <Link href="/app/meetings">
          <Button size="sm" className="gap-2 shrink-0">
            Schedule a meeting
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
