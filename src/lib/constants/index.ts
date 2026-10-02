export const FEEDBACK_CATEGORIES = [
  'General',
  'Product & UX',
  'Engineering',
  'Team Culture',
  'Leadership',
  'Operations',
  'Customer Support',
] as const;

export const MEETING_STATUSES = ['upcoming', 'completed', 'cancelled'] as const;

export const RESOURCE_CATEGORIES = [
  { id: 'all', label: 'All Resources' },
  { id: 'handbook', label: 'Handbook & Culture' },
  { id: 'template', label: 'Templates & Checklists' },
  { id: 'guideline', label: 'Feedback Guidelines' },
  { id: 'policy', label: 'Policies' },
  { id: 'tool', label: 'Tools & Workflows' },
] as const;
