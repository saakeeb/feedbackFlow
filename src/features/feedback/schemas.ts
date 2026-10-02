import { z } from 'zod';

export const topicSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(120, 'Title cannot exceed 120 characters'),
  description: z.string().max(1000, 'Description cannot exceed 1000 characters').optional(),
  category: z.string().min(1, 'Please select a category'),
});

export const commentSchema = z.object({
  content: z
    .string()
    .min(5, 'Feedback must be at least 5 characters')
    .max(3000, 'Feedback cannot exceed 3000 characters'),
  authorName: z.string().max(60).optional(),
  isAnonymous: z.boolean().default(false),
});

export type TopicInput = z.infer<typeof topicSchema>;
export type CommentInput = z.infer<typeof commentSchema>;
