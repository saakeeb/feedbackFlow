import { NextResponse } from 'next/server';
import { feedbackService } from '@/services/feedback.service';
import { topicSchema } from '@/features/feedback/schemas';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || undefined;

  try {
    const topics = await feedbackService.getTopics(userId);
    return NextResponse.json({ success: true, data: topics });
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
    const validated = topicSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: validated.error.errors[0]?.message || 'Validation error' },
        { status: 400 }
      );
    }

    if (!body.userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: missing user ID' },
        { status: 401 }
      );
    }

    const topic = await feedbackService.createTopic({
      title: validated.data.title,
      description: validated.data.description,
      category: validated.data.category,
      userId: body.userId,
    });

    return NextResponse.json({ success: true, data: topic }, { status: 201 });
  } catch (error: unknown) {
    const e = error as Error;
    return NextResponse.json(
      { success: false, error: e.message || 'Failed to create topic' },
      { status: 500 }
    );
  }
}
