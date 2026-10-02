import { meetingService } from '@/services/meeting.service';
import MeetingList from '@/features/meetings/components/MeetingList';

export const dynamic = 'force-dynamic';

export default async function MeetingsPage() {
  const meetings = await meetingService.getMeetings();

  return <MeetingList initialMeetings={meetings} />;
}
