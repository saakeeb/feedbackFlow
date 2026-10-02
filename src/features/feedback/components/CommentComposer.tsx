'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import Input from '@/components/ui/Input';
import { feedbackService } from '@/services/feedback.service';
import { useAuth } from '@/hooks/use-auth';
import type { Comment } from '@/types/common';
import toast from 'react-hot-toast';
import { ShieldCheck, UserCheck } from 'lucide-react';

interface CommentComposerProps {
  topicId: string;
  onCommentSubmitted: (comment: Comment) => void;
}

export function CommentComposer({
  topicId,
  onCommentSubmitted,
}: CommentComposerProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState(user?.fullName || '');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || content.trim().length < 5) {
      setError('Feedback must be at least 5 characters long.');
      return;
    }
    setError('');

    try {
      setIsSubmitting(true);
      const newComment = await feedbackService.submitComment({
        topicId,
        content,
        authorName: isAnonymous ? 'Anonymous' : authorName || user?.fullName || 'Teammate',
        isAnonymous,
        userId: isAnonymous ? null : (user?.id || null),
      });

      if (newComment) {
        setContent('');
        toast.success('Feedback submitted.');
        onCommentSubmitted(newComment);
      }
    } catch {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-5 space-y-4 shadow-subtle"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">
          Leave your response
        </h3>

        {/* Anonymity Badge Indicator */}
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          {isAnonymous ? (
            <span className="inline-flex items-center gap-1 text-slate-800 font-medium">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Anonymous mode active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-slate-600">
              <UserCheck className="h-4 w-4 text-slate-400" />
              Named mode
            </span>
          )}
        </div>
      </div>

      <Textarea
        label="Feedback content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your honest perspective, constructive observations, or proposed solutions..."
        rows={4}
        error={error}
        helperText="Be specific, constructive, and respectful of team collaboration."
      />

      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Anonymity Toggle */}
        <label className="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
          />
          <div className="text-xs">
            <span className="font-medium text-slate-900 block">
              Submit anonymously
            </span>
            <span className="text-slate-500 block">
              Your name and identity will not be attached to this feedback.
            </span>
          </div>
        </label>

        {/* Optional name if not anonymous and not signed in */}
        {!isAnonymous && !user && (
          <div className="w-full sm:w-48">
            <Input
              label="Your name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="e.g. Alex"
            />
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" isLoading={isSubmitting} size="sm">
            Submit feedback
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CommentComposer;
