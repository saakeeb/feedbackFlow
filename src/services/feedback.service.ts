import supabase from '@/lib/supabase/client';
import type { Topic, Comment } from '@/types/common';
import { nanoid } from 'nanoid';

export const feedbackService = {
  async getTopics(userId?: string): Promise<Topic[]> {
    try {
      let query = supabase
        .from('topics')
        .select(`
          *,
          comments:comments(count)
        `)
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;
      if (error) throw error;

      return ((data as any[]) || []).map((topic) => ({
        id: topic.id,
        title: topic.title,
        description: topic.description,
        userId: topic.user_id,
        isArchived: topic.is_archived,
        category: topic.category,
        createdAt: topic.created_at,
        updatedAt: topic.updated_at,
        commentCount: topic.comments?.[0]?.count ?? 0,
      }));
    } catch (error) {
      console.error('feedbackService.getTopics error:', error);
      return [];
    }
  },

  async getTopicById(topicId: string): Promise<Topic | null> {
    try {
      const { data, error } = await supabase
        .from('topics')
        .select(`
          *,
          comments:comments(count)
        `)
        .eq('id', topicId)
        .single();

      if (error || !data) return null;

      const raw = data as any;
      return {
        id: raw.id,
        title: raw.title,
        description: raw.description,
        userId: raw.user_id,
        isArchived: raw.is_archived,
        category: raw.category,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        commentCount: raw.comments?.[0]?.count ?? 0,
      };
    } catch (error) {
      console.error('feedbackService.getTopicById error:', error);
      return null;
    }
  },

  async createTopic(input: {
    title: string;
    description?: string | null;
    category?: string | null;
    userId: string;
  }): Promise<Topic | null> {
    try {
      const id = nanoid(10);
      const { data, error } = await supabase
        .from('topics')
        .insert([
          {
            id,
            title: input.title.trim(),
            description: input.description?.trim() || null,
            category: input.category || 'General',
            user_id: input.userId,
            is_archived: false,
          },
        ] as any)
        .select()
        .single();

      if (error) throw error;

      const raw = data as any;
      return {
        id: raw.id,
        title: raw.title,
        description: raw.description,
        userId: raw.user_id,
        isArchived: raw.is_archived,
        category: raw.category,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
        commentCount: 0,
      };
    } catch (error) {
      console.error('feedbackService.createTopic error:', error);
      throw new Error('Failed to create topic');
    }
  },

  async updateTopic(
    topicId: string,
    updates: {
      title?: string;
      description?: string | null;
      category?: string | null;
      isArchived?: boolean;
    }
  ): Promise<boolean> {
    try {
      const payload: Record<string, any> = {
        updated_at: new Date().toISOString(),
      };
      if (updates.title !== undefined) payload.title = updates.title.trim();
      if (updates.description !== undefined) payload.description = updates.description;
      if (updates.category !== undefined) payload.category = updates.category;
      if (updates.isArchived !== undefined) payload.is_archived = updates.isArchived;

      const { error } = await supabase
        .from('topics')
        .update(payload as any)
        .eq('id', topicId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('feedbackService.updateTopic error:', error);
      throw new Error('Failed to update topic');
    }
  },

  async deleteTopic(topicId: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('topics').delete().eq('id', topicId);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('feedbackService.deleteTopic error:', error);
      throw new Error('Failed to delete topic');
    }
  },

  async getComments(topicId: string): Promise<Comment[]> {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('topic_id', topicId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return ((data as any[]) || []).map((comment) => ({
        id: comment.id,
        content: comment.content,
        topicId: comment.topic_id,
        userId: comment.user_id,
        authorName: comment.author_name,
        isAnonymous: comment.is_anonymous,
        createdAt: comment.created_at,
      }));
    } catch (error) {
      console.error('feedbackService.getComments error:', error);
      return [];
    }
  },

  async submitComment(input: {
    topicId: string;
    content: string;
    authorName?: string;
    isAnonymous: boolean;
    userId?: string | null;
  }): Promise<Comment | null> {
    try {
      const id = nanoid(10);
      const authorName = input.isAnonymous
        ? 'Anonymous Contributor'
        : (input.authorName || 'Teammate');

      const { data, error } = await supabase
        .from('comments')
        .insert([
          {
            id,
            topic_id: input.topicId,
            content: input.content.trim(),
            author_name: authorName,
            is_anonymous: input.isAnonymous,
            user_id: input.isAnonymous ? null : (input.userId || null),
          },
        ] as any)
        .select()
        .single();

      if (error) throw error;

      const raw = data as any;
      return {
        id: raw.id,
        content: raw.content,
        topicId: raw.topic_id,
        userId: raw.user_id,
        authorName: raw.author_name,
        isAnonymous: raw.is_anonymous,
        createdAt: raw.created_at,
      };
    } catch (error) {
      console.error('feedbackService.submitComment error:', error);
      throw new Error('Failed to submit comment');
    }
  },
};
