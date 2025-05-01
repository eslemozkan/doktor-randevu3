-- Add updated_at column to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP; 