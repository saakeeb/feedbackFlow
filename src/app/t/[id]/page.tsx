import { notFound } from 'next/navigation';
import Link from 'next/link';
import { feedbackService } from '@/services/feedback.service';
import FeedbackDetail from '@/features/feedback/components/FeedbackDetail';
import { constructMetadata } from '@/lib/seo/metadata';
import { Metadata } from 'next';

interface PublicTopicPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PublicTopicPageProps): Promise<Metadata> {
  const { id } = await params;
  const topic = await feedbackService.getTopicById(id);
  if (!topic) return {};

  return constructMetadata({
    title: `Feedback: ${topic.title}`,
    description: topic.description || 'Submit your anonymous or named perspective.',
    canonical: `/t/${id}`,
  });
}

export const dynamic = 'force-dynamic';

export default async function PublicTopicPage({ params }: PublicTopicPageProps) {
  const { id } = await params;
  const [topic, comments] = await Promise.all([
    feedbackService.getTopicById(id),
    feedbackService.getComments(id),
  ]);

  if (!topic) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Public brand banner */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-slate-900 text-sm"
          >
            <div className="h-6 w-6 rounded bg-slate-900 flex items-center justify-center text-white text-xs font-bold">
              F
            </div>
            <span>FeedbackFlow</span>
          </Link>
          <span className="text-xs text-slate-500">
            Secure feedback stream
          </span>
        </div>

        <FeedbackDetail topic={topic} initialComments={comments} isOwner={false} />
      </div>
    </div>
  );
}
