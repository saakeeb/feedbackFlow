import { feedbackService } from '@/services/feedback.service';
import FeedbackList from '@/features/feedback/components/FeedbackList';

export const dynamic = 'force-dynamic';

export default async function FeedbackPage() {
  const topics = await feedbackService.getTopics();

  return <FeedbackList initialTopics={topics} />;
}
