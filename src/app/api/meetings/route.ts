import { NextResponse } from 'next/server';
import { meetingService } from '@/services/meeting.service';
import { meetingSchema } from '@/features/meetings/schemas';

export async function GET() {
  try {
    const meetings = await meetingService.getMeetings();
    return NextResponse.json({ success: true, data: meetings });
  } catch (error: unknown) {
    const e = error as Error;
    return NextResponse.json(
      { success: false, error: e.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = meetingSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: validated.error.errors[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }

    const meeting = await meetingService.createMeeting({
      title: validated.data.title,
      description: validated.data.description,
      scheduledAt: validated.data.scheduledAt,
      durationMinutes: validated.data.durationMinutes,
      participants: body.participants || [],
    });

    return NextResponse.json({ success: true, data: meeting }, { status: 201 });
  } catch (error: unknown) {
    const e = error as Error;
    return NextResponse.json(
      { success: false, error: e.message || 'Failed to create meeting' },
      { status: 500 }
    );
  }
}
