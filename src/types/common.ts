export interface User {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string | null;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkAuth: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

export interface Topic {
  id: string;
  title: string;
  description: string | null;
  userId: string;
  isArchived: boolean;
  category: string | null;
  createdAt: string;
  updatedAt: string;
  commentCount?: number;
}

export interface Comment {
  id: string;
  content: string;
  topicId: string;
  userId: string | null;
  authorName: string;
  isAnonymous: boolean;
  createdAt: string;
}

export interface Meeting {
  id: string;
  title: string;
  description?: string | null;
  scheduledAt: string;
  durationMinutes: number;
  participants: string[];
  notes?: string;
  actionItems: ActionItem[];
  status: 'upcoming' | 'completed' | 'cancelled';
  userId?: string;
  createdAt: string;
}

export interface ActionItem {
  id: string;
  title: string;
  assignee?: string;
  completed: boolean;
  dueDate?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'handbook' | 'template' | 'guideline' | 'policy' | 'tool';
  content?: string;
  url?: string;
  tags: string[];
  updatedAt: string;
}

export interface AnalyticsOverview {
  totalTopics: number;
  totalFeedback: number;
  avgResponsesPerTopic: number;
  anonymousRatio: number;
  activeContributors: number;
  categoryBreakdown: { category: string; count: number }[];
  recentActivityTrends: { date: string; submissions: number }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  author: {
    name: string;
    role: string;
  };
  content: string;
}
