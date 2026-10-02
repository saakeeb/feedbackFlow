import Link from 'next/link';
import type { Resource } from '@/types/common';
import Badge from '@/components/ui/Badge';
import { ArrowLeft, BookOpen, Clock } from 'lucide-react';

interface ResourceDetailProps {
  resource: Resource;
}

export function ResourceDetail({ resource }: ResourceDetailProps) {
  return (
    <div className="space-y-6 max-w-3xl">
      <Link
        href="/app/resources"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to resources
      </Link>

      <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-subtle">
        <div className="space-y-3 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" size="md">
              {resource.category}
            </Badge>
            <span className="text-xs text-slate-400 inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              Updated {resource.updatedAt}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {resource.title}
          </h1>

          <p className="text-base text-slate-600 leading-relaxed">
            {resource.description}
          </p>

          <div className="flex items-center gap-1.5 pt-1">
            {resource.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Content body with clean typography */}
        <div className="prose prose-slate max-w-none text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
          {resource.content}
        </div>
      </div>
    </div>
  );
}

export default ResourceDetail;
