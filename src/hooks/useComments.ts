import { useState, useCallback } from 'react';
import { Comment } from '../types';
import supabase from '../lib/supabase';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';
import { useAuth } from './useAuth';

export const useComments = (topicId?: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const fetchComments = useCallback(async (id?: string) => {
    const targetTopicId = id || topicId;
    if (!targetTopicId) return;
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('topic_id', targetTopicId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const formattedComments = data.map(comment => ({
        id: comment.id,
        content: comment.content,
        topicId: comment.topic_id,
        userId: comment.user_id,
        authorName: comment.author_name,
        isAnonymous: comment.is_anonymous,
        createdAt: comment.created_at,
      }));
      
      setComments(formattedComments);
      return formattedComments;
    } catch (error) {
      console.error('Error fetching comments:', error);
      toast.error('Failed to load comments');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [topicId]);

  const addComment = useCallback(async (
    content: string,
    authorName: string,
    isAnonymous: boolean,
    targetTopicId?: string
  ) => {
    const id = targetTopicId || topicId;
    if (!id) {
      toast.error('Topic ID is required');
      return null;
    }
    
    try {
      setIsLoading(true);
      
      const commentId = nanoid(10);
      const { data, error } = await supabase
        .from('comments')
        .insert({
          id: commentId,
          content,
          topic_id: id,
          user_id: isAnonymous ? null : user?.id,
          author_name: authorName,
          is_anonymous: isAnonymous,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      const newComment: Comment = {
        id: data.id,
        content: data.content,
        topicId: data.topic_id,
        userId: data.user_id,
        authorName: data.author_name,
        isAnonymous: data.is_anonymous,
        createdAt: data.created_at,
      };
      
      setComments(prev => [newComment, ...prev]);
      toast.success('Comment added successfully!');
      return newComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [topicId, user?.id]);

  return {
    comments,
    isLoading,
    fetchComments,
    addComment,
  };
};