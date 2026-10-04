'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import Input from '@/components/ui/Input';
import { feedbackService } from '@/services/feedback.service';
import { useAuth } from '@/hooks/use-auth';
import type { Comment } from '@/types/common';
import toast from 'react-hot-toast';
import { ShieldCheck, UserCheck, Sparkles, X, ArrowRight } from 'lucide-react';

interface CommentComposerProps {
  topicId: string;
  selectedParagraphText?: string | null;
  selectedParagraphIndex?: number | null;
  onClearSelectedParagraph?: () => void;
  onCommentSubmitted: (comment: Comment) => void;
}

export function CommentComposer({
  topicId,
  selectedParagraphText,
  selectedParagraphIndex,
  onClearSelectedParagraph,
  onCommentSubmitted,
}: CommentComposerProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState(user?.fullName || '');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() || content.trim().length < 5) {
      setError('Constructive feedback should be at least 5 characters long.');
      return;
    }
    setError('');

    // Prepend paragraph context if selected
    let fullCommentContent = content.trim();
    if (selectedParagraphText && selectedParagraphIndex !== null && selectedParagraphIndex !== undefined) {
      const truncated = selectedParagraphText.length > 120 
        ? `${selectedParagraphText.slice(0, 120)}...` 
        : selectedParagraphText;
      fullCommentContent = `[Regarding § 0${selectedParagraphIndex + 1}: "${truncated}"]\n\n${content.trim()}`;
    }

    try {
      setIsSubmitting(true);
      const newComment = await feedbackService.submitComment({
        topicId,
        content: fullCommentContent,
        authorName: isAnonymous ? 'Anonymous' : authorName || user?.fullName || 'Teammate',
        isAnonymous,
        userId: isAnonymous ? null : (user?.id || null),
      });

      if (newComment) {
        setContent('');
        if (onClearSelectedParagraph) onClearSelectedParagraph();
        toast.success(isAnonymous ? 'Feedback sent anonymously.' : 'Feedback submitted.');
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
      className="rounded-xl border border-white/15 bg-[#141414] p-6 space-y-5 shadow-2xl"
    >
      {/* Header with Anonymity Status (Section 20 & 21) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#9a9a95] block">
            Constructive Channel
          </span>
          <h3 className="text-base font-bold font-display uppercase tracking-tight text-[#f5f3ee]">
            What would make this better?
          </h3>
        </div>

        {/* Anonymity Indicator Badge */}
        <div className="flex items-center gap-2">
          {isAnonymous ? (
            <div className="inline-flex items-center gap-1.5 text-xs text-[#d8ff3e] bg-[#d8ff3e]/10 border border-[#d8ff3e]/30 px-2.5 py-1 rounded-full font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d8ff3e] animate-pulse" />
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Anonymous mode active</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 text-xs text-[#9a9a95] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full font-mono">
              <UserCheck className="h-3.5 w-3.5" />
              <span>Named mode</span>
            </div>
          )}
        </div>
      </div>

      {/* Selected paragraph preview if applicable */}
      {selectedParagraphText && (
        <div className="relative rounded-lg border border-[#d8ff3e] bg-[#1a1a14] p-4 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-[#d8ff3e] font-mono">
            <span>Attached to § 0{(selectedParagraphIndex ?? 0) + 1}</span>
            {onClearSelectedParagraph && (
              <button
                type="button"
                onClick={onClearSelectedParagraph}
                className="text-[#9a9a95] hover:text-[#f5f3ee] flex items-center gap-1"
              >
                <X className="h-3 w-3" /> Detach from paragraph
              </button>
            )}
          </div>
          <p className="text-[#f5f3ee] line-clamp-2 italic">
            “{selectedParagraphText}”
          </p>
        </div>
      )}

      {/* Constructive Guidance Tips (Section 22) */}
      <div className="rounded-md border border-white/5 bg-[#0e0e0e] p-3 text-xs text-[#9a9a95] space-y-1">
        <div className="flex items-center gap-1.5 text-[#f5f3ee] font-semibold text-[11px] uppercase tracking-wider">
          <Sparkles className="h-3 w-3 text-[#d8ff3e]" />
          Constructive Feedback Guide:
        </div>
        <p className="text-[11px]">
          • Explain what isn't working &nbsp;• Suggest an alternative &nbsp;• Focus on the work, not the person
        </p>
      </div>

      <Textarea
        label="Your observation or suggestion"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Explain what is unclear, notice what could be improved, or suggest a concrete alternative..."
        rows={4}
        error={error}
      />

      <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Anonymity Toggle with explicit privacy note */}
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => setIsAnonymous(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-white/30 text-[#d8ff3e] focus:ring-[#d8ff3e] accent-[#d8ff3e]"
          />
          <div className="text-xs">
            <span className="font-semibold text-[#f5f3ee] block">
              Send anonymously
            </span>
            <span className="text-[#9a9a95] block text-[11px]">
              Your name and identity will not be attached to this feedback.
            </span>
          </div>
        </label>

        {/* Optional name if not anonymous and not logged in */}
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
          <Button
            type="submit"
            isLoading={isSubmitting}
            size="md"
            className="text-xs uppercase tracking-wider font-semibold gap-1.5"
          >
            {isAnonymous ? 'Send anonymously' : 'Send feedback'}
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CommentComposer;
