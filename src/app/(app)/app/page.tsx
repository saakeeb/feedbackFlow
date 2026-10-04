import Link from 'next/link';
import Button from '@/components/ui/Button';
import { feedbackService } from '@/services/feedback.service';
import { meetingService } from '@/services/meeting.service';
import FeedbackCard from '@/features/feedback/components/FeedbackCard';
import MeetingCard from '@/features/meetings/components/MeetingCard';
import { MessageSquare, Calendar, Plus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default async function AppOverviewPage() {
  const [topics, meetings] = await Promise.all([
    feedbackService.getTopics(),
    meetingService.getMeetings(),
  ]);

  const recentTopics = topics.slice(0, 4);
  const upcomingMeetings = meetings
    .filter((m) => m.status === 'upcoming')
    .slice(0, 2);

  const totalResponses = topics.reduce(
    (sum, t) => sum + (t.commentCount || 0),
    0
  );

  return (
    <div className="space-y-12 pb-16">
      {/* Editorial Greeting Header */}
      <div className="space-y-4 border-b border-white/10 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95]">
              Workspace / Team Cadence
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display uppercase tracking-tight text-[#f5f3ee]">
              Your Feedback Space
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/app/feedback">
              <Button size="sm" className="gap-1.5 text-xs font-semibold uppercase tracking-wider">
                <Plus className="h-3.5 w-3.5" />
                New topic
              </Button>
            </Link>
            <Link href="/app/meetings">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs uppercase tracking-wider">
                <Calendar className="h-3.5 w-3.5 text-[#d8ff3e]" />
                Schedule sync
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-sm sm:text-base text-[#9a9a95] max-w-2xl leading-relaxed">
          Honest observations, asynchronous reflections, and purposeful discussions — collected fearlessly without personal exposure.
        </p>
      </div>

      {/* Restrained Editorial Stats (Section 34) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border border-white/10 bg-[#141414] space-y-1">
          <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95] block">
            Conversations
          </span>
          <div className="text-3xl sm:text-4xl font-display font-bold text-[#f5f3ee]">
            {topics.length}
          </div>
          <p className="text-xs text-[#6f6f6a] pt-1">
            Open & archived discussion topics
          </p>
        </div>

        <div className="p-6 rounded-lg border border-white/10 bg-[#141414] space-y-1">
          <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95] block">
            Responses Collected
          </span>
          <div className="text-3xl sm:text-4xl font-display font-bold text-[#d8ff3e]">
            {totalResponses}
          </div>
          <p className="text-xs text-[#6f6f6a] pt-1">
            Perspectives shared anonymously
          </p>
        </div>

        <div className="p-6 rounded-lg border border-white/10 bg-[#141414] space-y-1">
          <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95] block">
            Upcoming Syncs
          </span>
          <div className="text-3xl sm:text-4xl font-display font-bold text-[#f5f3ee]">
            {upcomingMeetings.length}
          </div>
          <p className="text-xs text-[#6f6f6a] pt-1">
            Living agendas with action items
          </p>
        </div>
      </div>

      {/* Two Column Layout: Recent Feedback + Upcoming Meetings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Recent Feedback Column */}
        <section className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-lg font-bold font-display uppercase tracking-wider text-[#f5f3ee] flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#d8ff3e]" />
              Recent Feedback Streams
            </h2>
            <Link
              href="/app/feedback"
              className="text-xs font-mono uppercase tracking-wider text-[#9a9a95] hover:text-[#d8ff3e] flex items-center gap-1 transition-colors"
            >
              View all ({topics.length}) <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {recentTopics.length > 0 ? (
            <div className="space-y-4">
              {recentTopics.map((topic) => (
                <FeedbackCard key={topic.id} topic={topic} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-white/15 p-10 text-center space-y-3 bg-[#141414]/50">
              <Sparkles className="h-6 w-6 text-[#d8ff3e] mx-auto opacity-70" />
              <h3 className="text-sm font-semibold text-[#f5f3ee]">
                Nothing to review yet.
              </h3>
              <p className="text-xs text-[#9a9a95] max-w-sm mx-auto">
                Start the conversation. Share something worth discussing and let people respond without worrying about being exposed.
              </p>
              <div className="pt-2">
                <Link href="/app/feedback">
                  <Button size="sm">Create first topic</Button>
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Upcoming Meetings Column */}
        <section className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-lg font-bold font-display uppercase tracking-wider text-[#f5f3ee] flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#d8ff3e]" />
              Team Syncs
            </h2>
            <Link
              href="/app/meetings"
              className="text-xs font-mono uppercase tracking-wider text-[#9a9a95] hover:text-[#d8ff3e] flex items-center gap-1 transition-colors"
            >
              All syncs <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {upcomingMeetings.length > 0 ? (
            <div className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-white/15 p-6 text-center text-xs text-[#9a9a95] bg-[#141414]/50 space-y-2">
              <p>No meetings scheduled.</p>
              <Link href="/app/meetings" className="text-[#d8ff3e] hover:underline font-medium block">
                Schedule a meeting
              </Link>
            </div>
          )}

          {/* Privacy reminder callout */}
          <div className="p-4 rounded-lg border border-white/10 bg-[#121212] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#d8ff3e]">
              <ShieldCheck className="h-4 w-4" />
              <span>Decoupled Storage</span>
            </div>
            <p className="text-xs text-[#9a9a95] leading-relaxed">
              When teammates submit feedback with the anonymous toggle, no user ID is written to the comments table. Trust is architectural.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
