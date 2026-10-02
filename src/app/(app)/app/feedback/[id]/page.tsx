import { notFound } from 'next/navigation';
import { feedbackService } from '@/services/feedback.service';
import FeedbackDetail from '@/features/feedback/components/FeedbackDetail';

interface FeedbackDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function FeedbackDetailPage({
  params,
}: FeedbackDetailPageProps) {
  const { id } = await params;
  const [topic, comments] = await Promise.all([
    feedbackService.getTopicById(id),
    feedbackService.getComments(id),
  ]);

  if (!topic) {
    notFound();
  }

  return <FeedbackDetail topic={topic} initialComments={comments} isOwner={true} />;
}
