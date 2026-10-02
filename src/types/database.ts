export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          full_name: string | null;
          avatar_url: string | null;
          email?: string | null;
          browser?: string | null;
          operating_system?: string | null;
          device_type?: string | null;
          referrer?: string | null;
          language?: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          browser?: string | null;
          operating_system?: string | null;
          device_type?: string | null;
          referrer?: string | null;
          language?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          browser?: string | null;
          operating_system?: string | null;
          device_type?: string | null;
          referrer?: string | null;
          language?: string | null;
        };
      };
      topics: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          description: string | null;
          user_id: string;
          is_archived: boolean;
          category: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          description?: string | null;
          user_id: string;
          is_archived?: boolean;
          category?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          description?: string | null;
          user_id?: string;
          is_archived?: boolean;
          category?: string | null;
        };
      };
      comments: {
        Row: {
          id: string;
          created_at: string;
          content: string;
          topic_id: string;
          user_id: string | null;
          author_name: string;
          is_anonymous: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          content: string;
          topic_id: string;
          user_id?: string | null;
          author_name: string;
          is_anonymous?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          content?: string;
          topic_id?: string;
          user_id?: string | null;
          author_name?: string;
          is_anonymous?: boolean;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
