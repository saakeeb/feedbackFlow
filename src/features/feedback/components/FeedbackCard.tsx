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
      className="group block rounded-lg border border-slate-200 bg-white p-5 hover:border-slate-300 hover:bg-slate-50/50 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-slate-900 group-hover:text-slate-950 truncate">
              {topic.title}
            </h3>
            {topic.category && (
              <Badge variant="secondary" size="sm">
                {topic.category}
              </Badge>
            )}
            {topic.isArchived && (
              <Badge variant="outline" size="sm">
                Archived
              </Badge>
            )}
          </div>

          {topic.description && (
            <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {topic.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
            <span>Created {formatRelativeTime(topic.createdAt)}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 font-medium text-slate-700">
              <MessageSquare className="h-3.5 w-3.5 text-slate-400" />
              {topic.commentCount || 0} {topic.commentCount === 1 ? 'response' : 'responses'}
            </span>
          </div>
        </div>

        <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0 mt-1" />
      </div>
    </Link>
  );
}

export default FeedbackCard;
