import Link from 'next/link';
import type { Meeting } from '@/types/common';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { Calendar, Clock, CheckCircle2, ChevronRight, Users } from 'lucide-react';

interface MeetingCardProps {
  meeting: Meeting;
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  const completedActions = meeting.actionItems.filter((a) => a.completed).length;
  const totalActions = meeting.actionItems.length;

  return (
    <Link
      href={`/app/meetings/${meeting.id}`}
      className="group block rounded-lg border border-slate-200 bg-white p-5 hover:border-slate-300 hover:bg-slate-50/50 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-slate-900 group-hover:text-slate-950 truncate">
              {meeting.title}
            </h3>
            <Badge
              variant={
                meeting.status === 'completed'
                  ? 'success'
                  : meeting.status === 'cancelled'
                  ? 'danger'
                  : 'secondary'
              }
              size="sm"
            >
              {meeting.status}
            </Badge>
          </div>

          {meeting.description && (
            <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {meeting.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {formatDate(meeting.scheduledAt)}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {meeting.durationMinutes} mins
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <Users className="h-3.5 w-3.5 text-slate-400" />
              {meeting.participants.length} participants
            </span>
            {totalActions > 0 && (
              <>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-slate-700">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  {completedActions}/{totalActions} action items
                </span>
              </>
            )}
          </div>
        </div>

        <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0 mt-1" />
      </div>
    </Link>
  );
}

export default MeetingCard;
