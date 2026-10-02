'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Meeting } from '@/types/common';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Textarea from '@/components/ui/Textarea';
import Input from '@/components/ui/Input';
import { formatDate } from '@/lib/utils';
import { meetingService } from '@/services/meeting.service';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Save,
} from 'lucide-react';
import toast from 'react-hot-toast';

interface MeetingDetailProps {
  meeting: Meeting;
}

export function MeetingDetail({ meeting }: MeetingDetailProps) {
  const router = useRouter();
  const [currentMeeting, setCurrentMeeting] = useState<Meeting>(meeting);
  const [notes, setNotes] = useState(meeting.notes || '');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [newActionTitle, setNewActionTitle] = useState('');
  const [newActionAssignee, setNewActionAssignee] = useState('');

  const handleSaveNotes = async () => {
    try {
      setIsSavingNotes(true);
      await meetingService.updateMeeting(currentMeeting.id, { notes });
      setCurrentMeeting((prev) => ({ ...prev, notes }));
      toast.success('Notes saved.');
    } catch {
      toast.error('Failed to save notes.');
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleToggleAction = async (actionId: string) => {
    try {
      await meetingService.toggleActionItem(currentMeeting.id, actionId);
      setCurrentMeeting((prev) => ({
        ...prev,
        actionItems: prev.actionItems.map((item) =>
          item.id === actionId ? { ...item, completed: !item.completed } : item
        ),
      }));
    } catch {
      toast.error('Failed to update action item.');
    }
  };

  const handleAddAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionTitle.trim()) return;

    try {
      await meetingService.addActionItem(
        currentMeeting.id,
        newActionTitle,
        newActionAssignee
      );
      const updated = await meetingService.getMeetingById(currentMeeting.id);
      if (updated) {
        setCurrentMeeting(updated);
        setNewActionTitle('');
        setNewActionAssignee('');
        toast.success('Action item added.');
      }
    } catch {
      toast.error('Failed to add action item.');
    }
  };

  const handleDeleteMeeting = async () => {
    if (!window.confirm('Are you sure you want to delete this meeting?')) return;
    try {
      await meetingService.deleteMeeting(currentMeeting.id);
      toast.success('Meeting deleted.');
      router.push('/app/meetings');
    } catch {
      toast.error('Failed to delete meeting.');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/app/meetings"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to meetings
        </Link>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleDeleteMeeting}
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
          Delete meeting
        </Button>
      </div>

      {/* Header and metadata */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 space-y-4 shadow-subtle">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {currentMeeting.title}
            </h1>
            <Badge
              variant={
                currentMeeting.status === 'completed'
                  ? 'success'
                  : currentMeeting.status === 'cancelled'
                  ? 'danger'
                  : 'secondary'
              }
              size="md"
            >
              {currentMeeting.status}
            </Badge>
          </div>

          {currentMeeting.description && (
            <p className="text-sm text-slate-600 leading-relaxed">
              {currentMeeting.description}
            </p>
          )}

          <div className="flex items-center gap-5 text-xs text-slate-500 pt-2 flex-wrap border-t border-slate-100">
            <span className="inline-flex items-center gap-1.5 font-medium text-slate-800">
              <Calendar className="h-4 w-4 text-slate-400" />
              {formatDate(currentMeeting.scheduledAt)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <Clock className="h-4 w-4 text-slate-400" />
              {currentMeeting.durationMinutes} minutes
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-600">
              <Users className="h-4 w-4 text-slate-400" />
              {currentMeeting.participants.join(', ')}
            </span>
          </div>
        </div>
      </div>

      {/* Action Items Section */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 space-y-4 shadow-subtle">
        <h2 className="text-base font-semibold text-slate-900 flex items-center justify-between">
          <span>Action Items</span>
          <span className="text-xs font-normal text-slate-500">
            {currentMeeting.actionItems.filter((a) => a.completed).length}/
            {currentMeeting.actionItems.length} completed
          </span>
        </h2>

        {/* Existing Action Items */}
        {currentMeeting.actionItems.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {currentMeeting.actionItems.map((action) => (
              <div
                key={action.id}
                onClick={() => handleToggleAction(action.id)}
                className="py-3 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/50 px-2 rounded transition-colors"
              >
                <div className="flex items-center gap-3">
                  {action.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-slate-300 shrink-0" />
                  )}
                  <span
                    className={`text-sm ${
                      action.completed
                        ? 'line-through text-slate-400'
                        : 'text-slate-800'
                    }`}
                  >
                    {action.title}
                  </span>
                </div>
                {action.assignee && (
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {action.assignee}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 py-1">
            No action items assigned yet.
          </p>
        )}

        {/* Add action item form */}
        <form onSubmit={handleAddAction} className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <Input
              placeholder="Add next action item..."
              value={newActionTitle}
              onChange={(e) => setNewActionTitle(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-40">
            <Input
              placeholder="Assignee (optional)"
              value={newActionAssignee}
              onChange={(e) => setNewActionAssignee(e.target.value)}
            />
          </div>
          <Button type="submit" size="sm" variant="secondary" className="shrink-0">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </form>
      </div>

      {/* Meeting Notes Editor */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 space-y-4 shadow-subtle">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">
            Meeting Notes & Takeaways
          </h2>
          <Button
            size="sm"
            onClick={handleSaveNotes}
            isLoading={isSavingNotes}
            className="gap-1.5"
          >
            <Save className="h-3.5 w-3.5" />
            Save notes
          </Button>
        </div>

        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Record key discussions, decisions, and agreements..."
          rows={10}
          className="font-mono text-sm leading-relaxed"
          helperText="Supports markdown formatting."
        />
      </div>
    </div>
  );
}

export default MeetingDetail;
