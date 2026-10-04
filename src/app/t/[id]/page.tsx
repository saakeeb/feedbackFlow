import { notFound } from 'next/navigation';
import Link from 'next/link';
import { feedbackService } from '@/services/feedback.service';
import FeedbackDetail from '@/features/feedback/components/FeedbackDetail';
import { constructMetadata } from '@/lib/seo/metadata';
import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

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
    <div className="min-h-screen bg-[#0b0b0b] text-[#f5f3ee] py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Public brand banner */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display font-bold text-sm uppercase tracking-widest text-[#f5f3ee] hover:opacity-80 transition-opacity"
          >
            <div className="h-6 w-6 rounded bg-[#d8ff3e] flex items-center justify-center text-[#0b0b0b] text-xs font-black">
              F
            </div>
            <span>FeedbackFlow</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#d8ff3e]">
            <ShieldCheck className="h-4 w-4" />
            <span>Identity Protection Guaranteed</span>
          </div>
        </div>

        <FeedbackDetail topic={topic} initialComments={comments} isOwner={false} />
      </div>
    </div>
  );
}
