'use client';

import React, { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { meetingService } from '@/services/meeting.service';
import type { Meeting } from '@/types/common';
import toast from 'react-hot-toast';

interface MeetingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMeetingCreated: (meeting: Meeting) => void;
}

export function MeetingFormModal({
  isOpen,
  onClose,
  onMeetingCreated,
}: MeetingFormModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [participants, setParticipants] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; scheduledAt?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { title?: string; scheduledAt?: string } = {};
    if (!title.trim()) newErrors.title = 'Please enter a meeting title.';
    if (!scheduledAt) newErrors.scheduledAt = 'Please select a date and time.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const participantList = participants
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean);

      const meeting = await meetingService.createMeeting({
        title,
        description,
        scheduledAt,
        durationMinutes,
        participants: participantList.length > 0 ? participantList : ['Team Members'],
      });

      toast.success('Meeting created.');
      onMeetingCreated(meeting);
      setTitle('');
      setDescription('');
      setScheduledAt('');
      setParticipants('');
      onClose();
    } catch {
      toast.error('Failed to create meeting.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Schedule Meeting"
      description="Set an explicit agenda, clear duration, and attendee alignment."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Meeting title"
          placeholder="e.g. Sprint Retrospective & Priority Review"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Date & Time"
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            error={errors.scheduledAt}
            required
          />

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-900">
              Duration
            </label>
            <select
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
              <option value={90}>90 minutes</option>
            </select>
          </div>
        </div>

        <Input
          label="Participants (comma separated)"
          placeholder="e.g. Alex, Sarah, David"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
          helperText="List attendees who are directly responsible for decisions or action items."
        />

        <Textarea
          label="Description or context"
          placeholder="Objectives of this meeting and what decisions need to be reached..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" size="sm" isLoading={isLoading}>
            Create meeting
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default MeetingFormModal;
