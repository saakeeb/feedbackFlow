-- Add analytics columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS ip_address inet,
ADD COLUMN IF NOT EXISTS browser text,
ADD COLUMN IF NOT EXISTS operating_system text,
ADD COLUMN IF NOT EXISTS device_type text,
ADD COLUMN IF NOT EXISTS referrer text,
ADD COLUMN IF NOT EXISTS pages_visited text[],
ADD COLUMN IF NOT EXISTS screen_resolution text,
ADD COLUMN IF NOT EXISTS time_of_visit timestamptz,
ADD COLUMN IF NOT EXISTS time_spent integer,
ADD COLUMN IF NOT EXISTS language text;