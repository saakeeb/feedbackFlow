'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { FEEDBACK_CATEGORIES } from '@/lib/constants';
import { feedbackService } from '@/services/feedback.service';
import { useAuth } from '@/hooks/use-auth';
import type { Topic } from '@/types/common';
import toast from 'react-hot-toast';

interface FeedbackFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTopicCreated: (topic: Topic) => void;
}

export function FeedbackFormModal({
  isOpen,
  onClose,
  onTopicCreated,
}: FeedbackFormModalProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>(FEEDBACK_CATEGORIES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || title.trim().length < 3) {
      setErrors({ title: 'Please enter a title with at least 3 characters.' });
      return;
    }

    if (!user) {
      toast.error('You must be signed in to create a feedback topic.');
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const topic = await feedbackService.createTopic({
        title,
        description,
        category,
        userId: user.id,
      });

      if (topic) {
        toast.success('Feedback topic created.');
        setTitle('');
        setDescription('');
        setCategory(FEEDBACK_CATEGORIES[0]);
        onTopicCreated(topic);
        onClose();
      }
    } catch {
      toast.error('Failed to create topic. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Feedback Topic"
      description="Gather anonymous or named thoughts, questions, or ideas from your teammates."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Topic title"
          placeholder="e.g. Q4 Team Culture & Retrospective"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          required
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-900">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            {FEEDBACK_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <Textarea
          label="Context or prompting questions (optional)"
          placeholder="What specific aspects would you like feedback on? Any context that will help teammates respond?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm" isLoading={isLoading}>
            Create topic
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default FeedbackFormModal;
