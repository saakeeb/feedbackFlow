import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { feedbackService } from '@/services/feedback.service';
import { meetingService } from '@/services/meeting.service';
import FeedbackCard from '@/features/feedback/components/FeedbackCard';
import MeetingCard from '@/features/meetings/components/MeetingCard';
import { MessageSquare, Calendar, Plus, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default async function AppOverviewPage() {
  const [topics, meetings] = await Promise.all([
    feedbackService.getTopics(),
    meetingService.getMeetings(),
  ]);

  const recentTopics = topics.slice(0, 3);
  const upcomingMeetings = meetings
    .filter((m) => m.status === 'upcoming')
    .slice(0, 2);

  const totalResponses = topics.reduce(
    (sum, t) => sum + (t.commentCount || 0),
    0
  );

  return (
    <div className="space-y-8">
      {/* Welcome context header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Workspace Overview
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Current feedback activity, scheduled team discussions, and pending action items.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link href="/app/feedback">
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              New topic
            </Button>
          </Link>
          <Link href="/app/meetings">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Calendar className="h-4 w-4" />
              Schedule sync
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-xs uppercase tracking-wider font-semibold text-slate-500">
              Active Topics
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-slate-900 pt-1">
              {topics.filter((t) => !t.isArchived).length}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <p className="text-xs text-slate-500">
              Open discussion streams welcoming responses.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-xs uppercase tracking-wider font-semibold text-slate-500">
              Feedback Responses
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-slate-900 pt-1">
              {totalResponses}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <p className="text-xs text-slate-500">
              Total candid perspectives and reflections collected.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-xs uppercase tracking-wider font-semibold text-slate-500">
              Upcoming Syncs
            </CardDescription>
            <CardTitle className="text-2xl font-bold text-slate-900 pt-1">
              {upcomingMeetings.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-1">
            <p className="text-xs text-slate-500">
              Structured meetings with defined agendas.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout: Recent Feedback + Upcoming Meetings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Feedback Column */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-slate-500" />
              Recent Feedback Topics
            </h2>
            <Link
              href="/app/feedback"
              className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {recentTopics.length > 0 ? (
            <div className="space-y-3">
              {recentTopics.map((topic) => (
                <FeedbackCard key={topic.id} topic={topic} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 bg-white">
              No feedback topics created yet.{' '}
              <Link href="/app/feedback" className="text-slate-900 font-semibold underline">
                Create one now
              </Link>
            </div>
          )}
        </section>

        {/* Upcoming Meetings Column */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-500" />
              Upcoming Meetings
            </h2>
            <Link
              href="/app/meetings"
              className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {upcomingMeetings.length > 0 ? (
            <div className="space-y-3">
              {upcomingMeetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 bg-white">
              No meetings scheduled.{' '}
              <Link href="/app/meetings" className="text-slate-900 font-semibold underline">
                Schedule a meeting
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
