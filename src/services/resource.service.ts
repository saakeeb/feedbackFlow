import type { Resource } from '@/types/common';
import { nanoid } from 'nanoid';

const defaultResources: Resource[] = [
  {
    id: 'res-handbook',
    title: 'Workplace Feedback & Psychological Safety Handbook',
    description: 'Guidelines on offering constructive feedback, receiving criticism gracefully, and protecting team anonymity.',
    category: 'handbook',
    content: `# Feedback & Psychological Safety

Constructive workplace communication thrives on three pillars:
1. **Specificity**: Address concrete behaviors, not personhood.
2. **Actionability**: Offer a clear next step or suggested path forward.
3. **Safety**: Guarantee that honest critiques will not result in retaliation.

### Anonymous Feedback Etiquette
When submitting anonymous notes through FeedbackFlow:
- Aim to solve a shared problem or clarify confusion.
- Avoid unsubstantiated accusations or harassment.
- Understand that anonymous submissions cannot be responded to personally.`,
    tags: ['Safety', 'Culture', 'Core'],
    updatedAt: '2026-09-15',
  },
  {
    id: 'res-templates',
    title: '1-on-1 Meeting Agenda & Retrospective Template',
    description: 'A proven structured template for weekly 1-on-1s between managers and teammates, minimizing status updates and maximizing growth.',
    category: 'template',
    content: `# 1-on-1 Meeting Agenda Template

### Section 1: Wins & Energy (10 mins)
- What felt energizing or successful this past week?
- Any wins we should celebrate with the broader team?

### Section 2: Challenges & Blockers (15 mins)
- What is currently in your way?
- Is there a decision waiting on leadership or external dependencies?

### Section 3: Feedback & Alignment (10 mins)
- Do you feel you have clear expectations for next sprint?
- Is there anything I can start or stop doing to support you better?

### Section 4: Action Items (5 mins)
- Confirm explicit owners and deadlines.`,
    tags: ['1-on-1', 'Templates', 'Management'],
    updatedAt: '2026-09-20',
  },
  {
    id: 'res-policy',
    title: 'Data Privacy & Anonymous Reporting Policy',
    description: 'Technical and organizational guarantees regarding how anonymous submissions are sanitized and stored.',
    category: 'policy',
    content: `# Anonymous Submission Technical Policy

When a user flags a comment or feedback submission as "Anonymous":
1. **No User Identification**: The \`user_id\` column is set to null in database transactions.
2. **Metadata Scrubbing**: Network IP addresses and browser fingerprints are stripped from the submission record.
3. **Audit Trail**: Workspace administrators see the timestamp and author as "Anonymous Contributor".
4. **Permanent Separation**: Database logs decouple submission payload from authenticated session tokens.`,
    tags: ['Privacy', 'Security', 'Compliance'],
    updatedAt: '2026-09-28',
  },
  {
    id: 'res-checklist',
    title: 'Pre-Meeting Preparation Checklist',
    description: 'A 5-point checklist to ensure every meeting has a clear agenda, defined outcomes, and the minimum necessary attendees.',
    category: 'guideline',
    content: `# Pre-Meeting Checklist

Before sending a calendar invite:
- [ ] Is there an asynchronous alternative (e.g. FeedbackFlow topic or document)?
- [ ] Is there an explicit agenda with allocated time blocks?
- [ ] Are all attendees strictly required for decision-making?
- [ ] Have pre-read materials been distributed at least 24 hours in advance?
- [ ] Is a note-taker assigned for action items?`,
    tags: ['Meetings', 'Productivity', 'Checklist'],
    updatedAt: '2026-10-01',
  },
];

const STORAGE_KEY = 'feedbackflow_resources';

function getStoredResources(): Resource[] {
  if (typeof window === 'undefined') return defaultResources;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultResources));
      return defaultResources;
    }
    return JSON.parse(raw);
  } catch {
    return defaultResources;
  }
}

export const resourceService = {
  async getResources(category?: string): Promise<Resource[]> {
    const resources = getStoredResources();
    if (!category || category === 'all') return resources;
    return resources.filter((r) => r.category === category);
  },

  async getResourceById(id: string): Promise<Resource | null> {
    const resources = getStoredResources();
    return resources.find((r) => r.id === id) || null;
  },

  async createResource(input: {
    title: string;
    description: string;
    category: Resource['category'];
    content?: string;
    tags: string[];
  }): Promise<Resource> {
    const resources = getStoredResources();
    const newResource: Resource = {
      id: `res-${nanoid(6)}`,
      title: input.title.trim(),
      description: input.description.trim(),
      category: input.category,
      content: input.content || '',
      tags: input.tags,
      updatedAt: new Date().toISOString().split('T')[0],
    };

    const updated = [newResource, ...resources];
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
    return newResource;
  },
};
