import Link from 'next/link';
import type { Topic } from '@/types/common';
import Badge from '@/components/ui/Badge';
import { formatRelativeTime } from '@/lib/utils';
import { MessageSquare, ChevronRight } from 'lucide-react';

interface FeedbackCardProps {
  topic: Topic;
}

export function FeedbackCard({ topic }: FeedbackCardProps) {
  return (
    <Link
      href={`/app/feedback/${topic.id}`}
      className="group block rounded-lg border border-white/10 bg-[#141414] p-5 hover:border-white/25 hover:bg-[#181818] transition-all duration-150"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-base font-semibold font-display text-[#f5f3ee] group-hover:text-[#d8ff3e] transition-colors truncate">
              {topic.title}
            </h3>
            {topic.category && (
              <Badge variant="secondary" size="sm">
                {topic.category}
              </Badge>
            )}
            {topic.isArchived && (
              <Badge variant="warning" size="sm">
                Archived
              </Badge>
            )}
          </div>

          {topic.description && (
            <p className="text-sm text-[#9a9a95] line-clamp-2 leading-relaxed">
              {topic.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs font-mono text-[#6f6f6a] pt-1">
            <span>{formatRelativeTime(topic.createdAt)}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 font-medium text-[#f5f3ee]">
              <MessageSquare className="h-3.5 w-3.5 text-[#d8ff3e]" />
              {topic.commentCount || 0} {topic.commentCount === 1 ? 'response' : 'responses'}
            </span>
          </div>
        </div>

        <ChevronRight className="h-5 w-5 text-[#6f6f6a] group-hover:text-[#d8ff3e] transition-colors shrink-0 mt-1" />
      </div>
    </Link>
  );
}

export default FeedbackCard;
