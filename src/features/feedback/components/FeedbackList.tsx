'use client';

import React, { useState, useMemo } from 'react';
import type { Topic } from '@/types/common';
import FeedbackCard from './FeedbackCard';
import FeedbackFilters from './FeedbackFilters';
import FeedbackFormModal from './FeedbackFormModal';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { Plus, MessageSquare } from 'lucide-react';

interface FeedbackListProps {
  initialTopics: Topic[];
}

export function FeedbackList({ initialTopics }: FeedbackListProps) {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'archived'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.description && t.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'all' || t.category === selectedCategory;

      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'active' && !t.isArchived) ||
        (selectedStatus === 'archived' && t.isArchived);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [topics, searchQuery, selectedCategory, selectedStatus]);

  const handleTopicCreated = (newTopic: Topic) => {
    setTopics((prev) => [newTopic, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Header with Title, Context, and Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Feedback Topics
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create feedback streams, collect anonymous team reflections, and track constructive conversations.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} size="sm" className="shrink-0">
          <Plus className="h-4 w-4" />
          Create topic
        </Button>
      </div>

      {/* Filter Bar */}
      <FeedbackFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {/* Topics List or Empty State */}
      {filteredTopics.length > 0 ? (
        <div className="space-y-3">
          {filteredTopics.map((topic) => (
            <FeedbackCard key={topic.id} topic={topic} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<MessageSquare className="h-8 w-8" />}
          title={searchQuery ? 'No matching topics found' : 'No feedback topics yet'}
          description={
            searchQuery
              ? 'Try adjusting your search terms or category filters.'
              : 'Create your first topic to start gathering anonymous and identified thoughts from your colleagues.'
          }
          actionLabel={searchQuery ? undefined : 'Create topic'}
          onAction={searchQuery ? undefined : () => setIsModalOpen(true)}
        />
      )}

      {/* Create Topic Modal */}
      <FeedbackFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTopicCreated={handleTopicCreated}
      />
    </div>
  );
}

export default FeedbackList;
