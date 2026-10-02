import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { BLOG_POSTS } from '@/features/content/data';
import { constructMetadata } from '@/lib/seo/metadata';
import { getArticleSchema, getBreadcrumbSchema } from '@/lib/seo/structured-data';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import { siteConfig } from '@/config/site';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};

  return constructMetadata({
    title: post.title,
    description: post.description,
    canonical: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const articleSchema = getArticleSchema({
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    authorName: post.author.name,
    url: `${siteConfig.url}/blog/${post.slug}`,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Blog', item: '/blog' },
    { name: post.title, item: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 space-y-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all articles
        </Link>

        {/* Article Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <Badge variant="secondary" size="md">
            {post.category}
          </Badge>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
              <User className="h-3.5 w-3.5 text-slate-400" />
              {post.author.name} ({post.author.role})
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {formatDate(post.publishedAt)}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              {post.readingTime}
            </span>
          </div>
        </header>

        {/* Content Body */}
        <div className="prose prose-slate max-w-none text-base text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
          {post.content}
        </div>

        {/* Call to action footer */}
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 space-y-3">
          <h3 className="font-semibold text-slate-900 text-base">
            Put these principles into practice
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            FeedbackFlow combines anonymous feedback streams, purposeful meeting agendas, and team operating handbooks in one quiet workspace.
          </p>
          <div className="pt-1">
            <Link
              href="/app"
              className="inline-flex items-center text-xs font-semibold text-slate-900 hover:underline"
            >
              Open FeedbackFlow Workspace →
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
