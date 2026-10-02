import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  'https://qvewklosmiwoaoqvekwb.supabase.co';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2ZXdrbG9zbWl3b2FvcXZla3diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwODY0NTcsImV4cCI6MjA2MzY2MjQ1N30.P77waKk1mSWioOVYjcjlbDtsHCPIar0Pt8UnMdeABnU';

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = createClient();
export default supabase;
