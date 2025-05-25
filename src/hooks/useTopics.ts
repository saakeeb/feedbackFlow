import { useState, useCallback } from 'react';
import { Topic } from '../types';
import supabase from '../lib/supabase';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';

export const useTopics = (userId?: string) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);

  const fetchTopics = useCallback(async () => {
    if (!userId) return;
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('topics')
        .select(`
          *,
          comments:comments(count)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const formattedTopics = data.map(topic => ({
        id: topic.id,
        title: topic.title,
        description: topic.description,
        userId: topic.user_id,
        isArchived: topic.is_archived,
        category: topic.category,
        createdAt: topic.created_at,
        updatedAt: topic.updated_at,
        commentCount: topic.comments[0]?.count ?? 0,
      }));
      
      setTopics(formattedTopics);
    } catch (error) {
      console.error('Error fetching topics:', error);
      toast.error('Failed to load topics');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const fetchTopic = useCallback(async (topicId: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('topics')
        .select(`
          *,
          comments:comments(count)
        `)
        .eq('id', topicId)
        .single();
      
      if (error) throw error;
      
      const formattedTopic = {
        id: data.id,
        title: data.title,
        description: data.description,
        userId: data.user_id,
        isArchived: data.is_archived,
        category: data.category,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        commentCount: data.comments[0]?.count ?? 0,
      };
      
      setCurrentTopic(formattedTopic);
      return formattedTopic;
    } catch (error) {
      console.error('Error fetching topic:', error);
      toast.error('Failed to load topic');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTopic = useCallback(async (
    topicData: { 
      title: string; 
      description?: string; 
      category?: string;
    }
  ) => {
    if (!userId) {
      toast.error('You must be logged in to create a topic');
      return null;
    }
    
    try {
      setIsLoading(true);
      
      const id = nanoid(10);
      const { data, error } = await supabase
        .from('topics')
        .insert({
          id,
          title: topicData.title,
          description: topicData.description || null,
          category: topicData.category || null,
          user_id: userId,
          is_archived: false,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      const newTopic: Topic = {
        id: data.id,
        title: data.title,
        description: data.description,
        userId: data.user_id,
        isArchived: data.is_archived,
        category: data.category,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        commentCount: 0,
      };
      
      setTopics(prev => [newTopic, ...prev]);
      toast.success('Topic created successfully!');
      return newTopic;
    } catch (error) {
      console.error('Error creating topic:', error);
      toast.error('Failed to create topic');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const updateTopic = useCallback(async (
    topicId: string,
    topicData: {
      title?: string;
      description?: string;
      category?: string;
      isArchived?: boolean;
    }
  ) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('topics')
        .update({
          title: topicData.title,
          description: topicData.description,
          category: topicData.category,
          is_archived: topicData.isArchived,
          updated_at: new Date().toISOString(),
        })
        .eq('id', topicId)
        .select()
        .single();
      
      if (error) throw error;
      
      const updatedTopic: Topic = {
        id: data.id,
        title: data.title,
        description: data.description,
        userId: data.user_id,
        isArchived: data.is_archived,
        category: data.category,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        commentCount: currentTopic?.commentCount || 0,
      };
      
      setTopics(prev => prev.map(topic => (
        topic.id === topicId ? updatedTopic : topic
      )));
      
      if (currentTopic?.id === topicId) {
        setCurrentTopic(updatedTopic);
      }
      
      toast.success('Topic updated successfully!');
      return updatedTopic;
    } catch (error) {
      console.error('Error updating topic:', error);
      toast.error('Failed to update topic');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [currentTopic]);

  const deleteTopic = useCallback(async (topicId: string) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('topics')
        .delete()
        .eq('id', topicId);
      
      if (error) throw error;
      
      setTopics(prev => prev.filter(topic => topic.id !== topicId));
      
      if (currentTopic?.id === topicId) {
        setCurrentTopic(null);
      }
      
      toast.success('Topic deleted successfully!');
      return true;
    } catch (error) {
      console.error('Error deleting topic:', error);
      toast.error('Failed to delete topic');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [currentTopic]);

  return {
    topics,
    currentTopic,
    isLoading,
    fetchTopics,
    fetchTopic,
    createTopic,
    updateTopic,
    deleteTopic,
  };
};