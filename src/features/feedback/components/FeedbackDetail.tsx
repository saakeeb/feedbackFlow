'use client';

import React, { useState } from 'react';
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

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Navigation and Actions */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/app/feedback"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to feedback
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyShareLink}
            className="gap-1.5"
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-emerald-600" />
            ) : (
              <Share2 className="h-4 w-4 text-slate-500" />
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
              >
                <Archive className="h-4 w-4 text-slate-500" />
                <span className="hidden sm:inline">
                  {currentTopic.isArchived ? 'Unarchive' : 'Archive'}
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                isLoading={isDeleting}
                className="text-red-600 hover:bg-red-50 hover:text-red-700"
                title="Delete topic"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Topic Card & Header */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 space-y-4 shadow-subtle">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {currentTopic.title}
              </h1>
              {currentTopic.category && (
                <Badge variant="secondary" size="md">
                  {currentTopic.category}
                </Badge>
              )}
              {currentTopic.isArchived && (
                <Badge variant="warning" size="md">
                  Archived
                </Badge>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Created {formatRelativeTime(currentTopic.createdAt)}
            </p>
          </div>
        </div>

        {currentTopic.description && (
          <div className="pt-2 border-t border-slate-100 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {currentTopic.description}
          </div>
        )}
      </div>

      {/* Write Response / Comment Composer */}
      {!currentTopic.isArchived ? (
        <CommentComposer
          topicId={currentTopic.id}
          onCommentSubmitted={handleCommentAdded}
        />
      ) : (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          This topic has been archived. New responses can no longer be submitted unless unarchived.
        </div>
      )}

      {/* Responses List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-slate-500" />
            Responses ({comments.length})
          </h2>
        </div>

        {comments.length > 0 ? (
          <div className="space-y-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="rounded-lg border border-slate-200 bg-white p-5 space-y-2.5 shadow-subtle"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-medium">
                    {comment.isAnonymous ? (
                      <span className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                        <ShieldCheck className="h-3 w-3 text-emerald-600" />
                        Anonymous Contributor
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-slate-800 bg-slate-100 rounded-full px-2 py-0.5">
                        <User className="h-3 w-3 text-slate-500" />
                        {comment.authorName}
                      </span>
                    )}
                  </div>
                  <span>{formatRelativeTime(comment.createdAt)}</span>
                </div>

                <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500 bg-slate-50/50">
            No responses submitted yet. Share the public link with your team to invite feedback.
          </div>
        )}
      </div>
    </div>
  );
}

export default FeedbackDetail;
