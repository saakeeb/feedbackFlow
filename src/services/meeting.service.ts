import type { Meeting } from '@/types/common';
import { nanoid } from 'nanoid';

// Sample initial meetings for new workspaces, stored in localStorage on client
const defaultMeetings: Meeting[] = [
  {
    id: 'meet-1',
    title: 'Product & Design Sync: Q4 Feedback Review',
    description: 'Reviewing employee feedback on onboarding friction and prioritization.',
    scheduledAt: new Date(Date.now() + 86400000 * 2).toISOString(),
    durationMinutes: 45,
    participants: ['Alex Morgan', 'Sarah Chen', 'David Kim'],
    notes: '### Agenda\n1. Review top recurring comments on feedback board\n2. Discuss privacy concerns on anonymous mode\n3. Action item assignments',
    actionItems: [
      { id: 'act-1', title: 'Update anonymous toggle copy on feedback form', assignee: 'Alex Morgan', completed: true },
      { id: 'act-2', title: 'Schedule follow-up with engineering leads', assignee: 'Sarah Chen', completed: false },
    ],
    status: 'upcoming',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'meet-2',
    title: 'Engineering All-Hands: Retrospective',
    description: 'Bi-weekly retrospective on sprint delivery and tooling bottlenecks.',
    scheduledAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    durationMinutes: 60,
    participants: ['Engineering Team', 'DevOps Team'],
    notes: '### Takeaways\n- CI pipeline speed improved by 40% after cache fixes.\n- Need clearer documentation on Supabase RLS security policies.',
    actionItems: [
      { id: 'act-3', title: 'Publish RLS security guidelines in Resources handbook', assignee: 'David Kim', completed: true },
    ],
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

const STORAGE_KEY = 'feedbackflow_meetings';

function getStoredMeetings(): Meeting[] {
  if (typeof window === 'undefined') return defaultMeetings;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultMeetings));
      return defaultMeetings;
    }
    return JSON.parse(raw);
  } catch {
    return defaultMeetings;
  }
}

function saveMeetings(meetings: Meeting[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings));
  } catch (e) {
    console.error('Error saving meetings:', e);
  }
}

export const meetingService = {
  async getMeetings(): Promise<Meeting[]> {
    return getStoredMeetings();
  },

  async getMeetingById(id: string): Promise<Meeting | null> {
    const meetings = getStoredMeetings();
    return meetings.find((m) => m.id === id) || null;
  },

  async createMeeting(input: {
    title: string;
    description?: string;
    scheduledAt: string;
    durationMinutes?: number;
    participants?: string[];
  }): Promise<Meeting> {
    const meetings = getStoredMeetings();
    const newMeeting: Meeting = {
      id: nanoid(8),
      title: input.title.trim(),
      description: input.description?.trim() || null,
      scheduledAt: input.scheduledAt,
      durationMinutes: input.durationMinutes || 30,
      participants: input.participants || ['Workspace Team'],
      notes: '',
      actionItems: [],
      status: 'upcoming',
      createdAt: new Date().toISOString(),
    };

    const updated = [newMeeting, ...meetings];
    saveMeetings(updated);
    return newMeeting;
  },

  async updateMeeting(id: string, updates: Partial<Meeting>): Promise<Meeting | null> {
    const meetings = getStoredMeetings();
    const index = meetings.findIndex((m) => m.id === id);
    if (index === -1) return null;

    meetings[index] = { ...meetings[index], ...updates };
    saveMeetings(meetings);
    return meetings[index];
  },

  async toggleActionItem(meetingId: string, actionId: string): Promise<boolean> {
    const meetings = getStoredMeetings();
    const meeting = meetings.find((m) => m.id === meetingId);
    if (!meeting) return false;

    const item = meeting.actionItems.find((a) => a.id === actionId);
    if (!item) return false;

    item.completed = !item.completed;
    saveMeetings(meetings);
    return true;
  },

  async addActionItem(meetingId: string, title: string, assignee?: string): Promise<boolean> {
    const meetings = getStoredMeetings();
    const meeting = meetings.find((m) => m.id === meetingId);
    if (!meeting) return false;

    meeting.actionItems.push({
      id: nanoid(6),
      title: title.trim(),
      assignee: assignee?.trim() || undefined,
      completed: false,
    });

    saveMeetings(meetings);
    return true;
  },

  async deleteMeeting(id: string): Promise<boolean> {
    const meetings = getStoredMeetings();
    const filtered = meetings.filter((m) => m.id !== id);
    saveMeetings(filtered);
    return true;
  },
};
