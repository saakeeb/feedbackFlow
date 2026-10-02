'use client';

import React, { useState, useMemo } from 'react';
import type { Meeting } from '@/types/common';
import MeetingCard from './MeetingCard';
import MeetingFormModal from './MeetingFormModal';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import { Plus, Calendar, Search } from 'lucide-react';

interface MeetingListProps {
  initialMeetings: Meeting[];
}

export function MeetingList({ initialMeetings }: MeetingListProps) {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredMeetings = useMemo(() => {
    return meetings.filter((m) => {
      const matchesSearch =
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.description && m.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        selectedStatus === 'all' || m.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [meetings, searchQuery, selectedStatus]);

  const handleMeetingCreated = (newMeeting: Meeting) => {
    setMeetings((prev) => [newMeeting, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Meetings & Agendas
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Structure purposeful syncs, document clear outcomes, and track accountability through action items.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} size="sm" className="shrink-0">
          <Plus className="h-4 w-4" />
          Schedule meeting
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search meetings or notes..."
            className="h-9 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          />
        </div>

        <div className="inline-flex rounded-md border border-slate-200 bg-slate-100 p-0.5 text-xs">
          {(['all', 'upcoming', 'completed'] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1 font-medium capitalize rounded transition-colors ${
                selectedStatus === status
                  ? 'bg-white text-slate-900 shadow-subtle'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Meeting list */}
      {filteredMeetings.length > 0 ? (
        <div className="space-y-3">
          {filteredMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Calendar className="h-8 w-8" />}
          title={searchQuery ? 'No matching meetings found' : 'No meetings scheduled'}
          description={
            searchQuery
              ? 'Try modifying your search filter.'
              : 'Keep meetings intentional with clear objectives and recorded action items.'
          }
          actionLabel={searchQuery ? undefined : 'Schedule meeting'}
          onAction={searchQuery ? undefined : () => setIsModalOpen(true)}
        />
      )}

      {/* Modal */}
      <MeetingFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMeetingCreated={handleMeetingCreated}
      />
    </div>
  );
}

export default MeetingList;
