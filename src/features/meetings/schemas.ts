import { z } from 'zod';

export const meetingSchema = z.object({
  title: z.string().min(3, 'Meeting title must be at least 3 characters'),
  description: z.string().optional(),
  scheduledAt: z.string().min(1, 'Please select date and time'),
  durationMinutes: z.number().min(15).max(240).default(30),
  participants: z.string().optional(),
});

export type MeetingInput = z.infer<typeof meetingSchema>;
