import Link from 'next/link';
import type { Resource } from '@/types/common';
import Badge from '@/components/ui/Badge';
import { BookOpen, ChevronRight } from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Link
      href={`/app/resources/${resource.id}`}
      className="group block rounded-lg border border-slate-200 bg-white p-5 hover:border-slate-300 hover:bg-slate-50/50 transition-colors"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-slate-900 group-hover:text-slate-950 truncate">
              {resource.title}
            </h3>
            <Badge variant="secondary" size="sm">
              {resource.category}
            </Badge>
          </div>

          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {resource.description}
          </p>

          <div className="flex items-center gap-2 pt-1 flex-wrap">
            {resource.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
            <span className="text-xs text-slate-400 ml-auto">
              Updated {resource.updatedAt}
            </span>
          </div>
        </div>

        <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0 mt-1" />
      </div>
    </Link>
  );
}

export default ResourceCard;
