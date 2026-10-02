import { notFound } from 'next/navigation';
import { meetingService } from '@/services/meeting.service';
import MeetingDetail from '@/features/meetings/components/MeetingDetail';

interface MeetingDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export default async function MeetingDetailPage({
  params,
}: MeetingDetailPageProps) {
  const { id } = await params;
  const meeting = await meetingService.getMeetingById(id);

  if (!meeting) {
    notFound();
  }

  return <MeetingDetail meeting={meeting} />;
}
