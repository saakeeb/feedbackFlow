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
      className="group block rounded-lg border border-white/10 bg-[#141414] p-5 hover:border-white/25 hover:bg-[#181818] transition-all duration-150"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h3 className="text-base font-semibold font-display text-[#f5f3ee] group-hover:text-[#d8ff3e] transition-colors truncate">
              {resource.title}
            </h3>
            <Badge variant="secondary" size="sm">
              {resource.category}
            </Badge>
          </div>

          <p className="text-sm text-[#9a9a95] line-clamp-2 leading-relaxed">
            {resource.description}
          </p>

          <div className="flex items-center gap-2 pt-1 flex-wrap">
            {resource.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono text-[#6f6f6a] bg-white/5 border border-white/10 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
            <span className="text-xs font-mono text-[#6f6f6a] ml-auto">
              Updated {resource.updatedAt}
            </span>
          </div>
        </div>

        <ChevronRight className="h-5 w-5 text-[#6f6f6a] group-hover:text-[#d8ff3e] transition-colors shrink-0 mt-1" />
      </div>
    </Link>
  );
}

export default ResourceCard;
