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
      className="group block rounded-lg border border-white/10 bg-[#141414] p-5 hover:border-white/25 hover:bg-[#181818] transition-all duration-150"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-base font-semibold font-display text-[#f5f3ee] group-hover:text-[#d8ff3e] transition-colors truncate">
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
            <p className="text-sm text-[#9a9a95] line-clamp-2 leading-relaxed">
              {meeting.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs font-mono text-[#6f6f6a] pt-1 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[#f5f3ee]">
              <Calendar className="h-3.5 w-3.5 text-[#d8ff3e]" />
              {formatDate(meeting.scheduledAt)}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-[#9a9a95]">
              <Clock className="h-3.5 w-3.5 text-[#6f6f6a]" />
              {meeting.durationMinutes} mins
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-[#9a9a95]">
              <Users className="h-3.5 w-3.5 text-[#6f6f6a]" />
              {meeting.participants.length} participants
            </span>
            {totalActions > 0 && (
              <>
                <span>•</span>
                <span className="inline-flex items-center gap-1 text-[#d8ff3e]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#d8ff3e]" />
                  {completedActions}/{totalActions} action items
                </span>
              </>
            )}
          </div>
        </div>

        <ChevronRight className="h-5 w-5 text-[#6f6f6a] group-hover:text-[#d8ff3e] transition-colors shrink-0 mt-1" />
      </div>
    </Link>
  );
}

export default MeetingCard;
