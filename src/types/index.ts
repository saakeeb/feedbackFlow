export interface User {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string | null;
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
}