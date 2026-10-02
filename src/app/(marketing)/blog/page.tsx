import Link from 'next/link';
import { BLOG_POSTS } from '@/features/content/data';
import { constructMetadata } from '@/lib/seo/metadata';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { ArrowRight, Clock } from 'lucide-react';

export const metadata = constructMetadata({
  title: 'Workplace Communication Blog — FeedbackFlow',
  description:
    'Insights, essays, and operational tactics on psychological safety, anonymous feedback, engineering retrospectives, and async meetings.',
  canonical: '/blog',
});

export default function BlogIndexPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 space-y-12">
      <div className="space-y-4 border-b border-slate-200 pb-8 text-center sm:text-left">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Editorial & Insights
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Workplace Communication & Feedback Culture
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
          Deep dives into psychological safety, eliminating calendar bloat, and building high-trust distributed teams.
        </p>
      </div>

      <div className="space-y-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-subtle hover:border-slate-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Badge variant="secondary" size="sm">
                {post.category}
              </Badge>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">{formatDate(post.publishedAt)}</span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readingTime}
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {post.description}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
              <span className="text-slate-700 font-medium">
                By {post.author.name}, {post.author.role}
              </span>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 font-semibold text-slate-900 hover:underline"
              >
                Read article <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
