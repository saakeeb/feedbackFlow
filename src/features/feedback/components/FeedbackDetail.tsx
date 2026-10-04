'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Topic, Comment } from '@/types/common';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import CommentComposer from './CommentComposer';
import { formatRelativeTime } from '@/lib/utils';
import { feedbackService } from '@/services/feedback.service';
import {
  ArrowLeft,
  Share2,
  Check,
  Archive,
  Trash2,
  ShieldCheck,
  User,
  MessageSquare,
  Sparkles,
  CornerDownRight,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface FeedbackDetailProps {
  topic: Topic;
  initialComments: Comment[];
  isOwner?: boolean;
}

export function FeedbackDetail({
  topic,
  initialComments,
  isOwner = true,
}: FeedbackDetailProps) {
  const router = useRouter();
  const [currentTopic, setCurrentTopic] = useState<Topic>(topic);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isCopied, setIsCopied] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Selected paragraph state
  const [selectedParagraphIndex, setSelectedParagraphIndex] = useState<number | null>(null);

  // Parse paragraphs from topic description
  const paragraphs = useMemo(() => {
    if (!currentTopic.description) return [];
    return currentTopic.description
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
  }, [currentTopic.description]);

  const selectedParagraphText =
    selectedParagraphIndex !== null && paragraphs[selectedParagraphIndex]
      ? paragraphs[selectedParagraphIndex]
      : null;

  const handleCopyShareLink = () => {
    if (typeof window === 'undefined') return;
    const shareUrl = `${window.location.origin}/t/${currentTopic.id}`;
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    toast.success('Share link copied to clipboard.');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleToggleArchive = async () => {
    try {
      setIsArchiving(true);
      const newStatus = !currentTopic.isArchived;
      await feedbackService.updateTopic(currentTopic.id, {
        isArchived: newStatus,
      });
      setCurrentTopic((prev) => ({ ...prev, isArchived: newStatus }));
      toast.success(newStatus ? 'Topic archived.' : 'Topic unarchived.');
    } catch {
      toast.error('Failed to update topic status.');
    } finally {
      setIsArchiving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this topic and all its responses?')) {
      return;
    }
    try {
      setIsDeleting(true);
      await feedbackService.deleteTopic(currentTopic.id);
      toast.success('Topic deleted.');
      router.push('/app/feedback');
    } catch {
      toast.error('Failed to delete topic.');
      setIsDeleting(false);
    }
  };

  const handleCommentAdded = (comment: Comment) => {
    setComments((prev) => [comment, ...prev]);
    setCurrentTopic((prev) => ({
      ...prev,
      commentCount: (prev.commentCount || 0) + 1,
    }));
  };

  // Helper to extract paragraph reference from comment content if present
  const parseCommentContext = (rawContent: string) => {
    const match = rawContent.match(/^\[Regarding § (\d+): "(.*?)"\]\n\n([\s\S]*)$/);
    if (match) {
      return {
        sectionNum: match[1],
        quote: match[2],
        body: match[3],
      };
    }
    return {
      sectionNum: null,
      quote: null,
      body: rawContent,
    };
  };

  return (
    <div className="space-y-10 max-w-4xl pb-16">
      {/* Navigation and Top Actions */}
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <Link
          href="/app/feedback"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#9a9a95] hover:text-[#f5f3ee] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to feedback
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyShareLink}
            className="gap-1.5 text-xs uppercase tracking-wider"
          >
            {isCopied ? (
              <Check className="h-3.5 w-3.5 text-[#d8ff3e]" />
            ) : (
              <Share2 className="h-3.5 w-3.5 text-[#9a9a95]" />
            )}
            {isCopied ? 'Link copied' : 'Share link'}
          </Button>

          {isOwner && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleArchive}
                isLoading={isArchiving}
                title={currentTopic.isArchived ? 'Restore topic' : 'Archive topic'}
                className="text-xs uppercase tracking-wider"
              >
                <Archive className="h-3.5 w-3.5 text-[#9a9a95]" />
                <span className="hidden sm:inline">
                  {currentTopic.isArchived ? 'Unarchive' : 'Archive'}
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                isLoading={isDeleting}
                className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                title="Delete topic"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Editorial Document Header */}
      <div className="rounded-xl border border-white/15 bg-[#141414] p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-mono text-xs uppercase tracking-widest text-[#9a9a95]">
              Document / Feedback Stream
            </span>
            {currentTopic.category && (
              <Badge variant="secondary" size="sm">
                {currentTopic.category}
              </Badge>
            )}
            {currentTopic.isArchived && (
              <Badge variant="warning" size="sm">
                Archived
              </Badge>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold font-display tracking-tight text-[#f5f3ee]">
            {currentTopic.title}
          </h1>

          <div className="flex items-center gap-4 text-xs font-mono text-[#6f6f6a] pt-1">
            <span>Created {formatRelativeTime(currentTopic.createdAt)}</span>
            <span>•</span>
            <span className="text-[#d8ff3e] flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" />
              Anonymous Responses Protected
            </span>
          </div>
        </div>

        {/* Interactive Paragraph Document Reader (Section 18 & 19) */}
        {paragraphs.length > 0 ? (
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#9a9a95]">
              <span>Interactive paragraphs (click any paragraph to attach feedback)</span>
              {selectedParagraphIndex !== null && (
                <button
                  onClick={() => setSelectedParagraphIndex(null)}
                  className="text-[#d8ff3e] hover:underline"
                >
                  Clear selection
                </button>
              )}
            </div>

            <div className="space-y-3">
              {paragraphs.map((p, idx) => {
                const isSelected = selectedParagraphIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() =>
                      setSelectedParagraphIndex(isSelected ? null : idx)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedParagraphIndex(isSelected ? null : idx);
                      }
                    }}
                    className={`group relative p-4 rounded-lg cursor-pointer transition-all duration-150 border ${
                      isSelected
                        ? 'border-[#d8ff3e] bg-[#1a1a14] shadow-lg'
                        : 'border-white/5 bg-[#0f0f0f] hover:border-white/20 hover:bg-[#161616]'
                    }`}
                  >
                    <p className={`text-sm sm:text-base leading-relaxed ${isSelected ? 'text-[#f5f3ee]' : 'text-[#f5f3ee]/85'}`}>
                      {p}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-white/5">
                      <span className="font-mono text-[11px] text-[#6f6f6a]">
                        § 0{idx + 1}
                      </span>
                      <span
                        className={`text-[11px] transition-colors ${
                          isSelected
                            ? 'text-[#d8ff3e] font-semibold'
                            : 'text-[#9a9a95] group-hover:text-[#d8ff3e]'
                        }`}
                      >
                        {isSelected ? '✓ Selected for feedback' : 'Suggest an improvement →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          currentTopic.description && (
            <div className="pt-4 border-t border-white/10 text-sm text-[#f5f3ee]/90 leading-relaxed whitespace-pre-line">
              {currentTopic.description}
            </div>
          )
        )}
      </div>

      {/* Feedback Composer */}
      {!currentTopic.isArchived ? (
        <CommentComposer
          topicId={currentTopic.id}
          selectedParagraphText={selectedParagraphText}
          selectedParagraphIndex={selectedParagraphIndex}
          onClearSelectedParagraph={() => setSelectedParagraphIndex(null)}
          onCommentSubmitted={handleCommentAdded}
        />
      ) : (
        <div className="rounded-lg border border-amber-500/30 bg-amber-950/40 p-4 text-xs font-mono text-amber-300">
          This topic has been archived. New responses can no longer be submitted unless restored.
        </div>
      )}

      {/* Responses List (Section 24 Thread Structure) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-base font-bold font-display uppercase tracking-wider text-[#f5f3ee] flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-[#d8ff3e]" />
            Constructive Responses ({comments.length})
          </h2>
          <span className="text-xs font-mono text-[#9a9a95]">
            Decoupled identities verified
          </span>
        </div>

        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => {
              const { sectionNum, quote, body } = parseCommentContext(comment.content);

              return (
                <div
                  key={comment.id}
                  className="rounded-xl border border-white/10 bg-[#141414] p-5 sm:p-6 space-y-3 shadow-lg"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      {comment.isAnonymous ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#d8ff3e] bg-[#d8ff3e]/10 border border-[#d8ff3e]/30 rounded-full px-2.5 py-0.5 font-mono font-medium">
                          <ShieldCheck className="h-3 w-3" />
                          Anonymous contributor
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs text-[#f5f3ee] bg-white/10 rounded-full px-2.5 py-0.5 font-medium">
                          <User className="h-3 w-3 text-[#9a9a95]" />
                          {comment.authorName}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-[#6f6f6a]">
                      {formatRelativeTime(comment.createdAt)}
                    </span>
                  </div>

                  {/* Original paragraph context if attached (Section 24) */}
                  {sectionNum && quote && (
                    <div className="rounded border-l-2 border-[#d8ff3e] bg-[#1a1a14] p-3 text-xs space-y-1">
                      <span className="font-mono text-[10px] text-[#d8ff3e] uppercase">
                        Regarding § {sectionNum}
                      </span>
                      <p className="text-[#9a9a95] italic leading-relaxed">
                        “{quote}”
                      </p>
                    </div>
                  )}

                  <p className="text-sm text-[#f5f3ee]/90 leading-relaxed whitespace-pre-wrap">
                    {body}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/15 p-12 text-center text-xs text-[#9a9a95] bg-[#141414]/40 space-y-2">
            <Sparkles className="h-5 w-5 text-[#d8ff3e] mx-auto opacity-70" />
            <p className="text-sm font-semibold text-[#f5f3ee]">
              Nothing to review yet.
            </p>
            <p className="max-w-sm mx-auto">
              Share the public link with your team to invite honest, anonymous observations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackDetail;
