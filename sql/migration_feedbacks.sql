-- Feedbacks table for contact form submissions
-- Run this in Supabase SQL Editor

-- Drop existing table if you need to recreate (CAREFUL - this deletes data!)
-- DROP TABLE IF EXISTS feedbacks;

-- Create feedbacks table
CREATE TABLE IF NOT EXISTS feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'general',
  status TEXT DEFAULT 'pending',
  admin_reply TEXT,
  admin_replied_at TIMESTAMPTZ,
  user_viewed BOOLEAN DEFAULT FALSE,  -- Track if user has seen the reply
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_feedbacks_user ON feedbacks(user_id);
CREATE INDEX IF NOT EXISTS idx_feedbacks_status ON feedbacks(status);
CREATE INDEX IF NOT EXISTS idx_feedbacks_created ON feedbacks(created_at DESC);

-- Enable RLS
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can create feedback" ON feedbacks;
DROP POLICY IF EXISTS "Users can view own feedback" ON feedbacks;
DROP POLICY IF EXISTS "Users can update own feedback viewed status" ON feedbacks;
DROP POLICY IF EXISTS "Admins can view all feedbacks" ON feedbacks;
DROP POLICY IF EXISTS "Admins can update feedbacks" ON feedbacks;
DROP POLICY IF EXISTS "Admins can delete feedbacks" ON feedbacks;

-- Policy: Anyone can create feedback (even anonymous users)
CREATE POLICY "Anyone can create feedback" ON feedbacks 
  FOR INSERT WITH CHECK (true);

-- Policy: Users can view their own feedback
CREATE POLICY "Users can view own feedback" ON feedbacks 
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can update their own feedback (specifically for marking as viewed)
CREATE POLICY "Users can update own feedback viewed status" ON feedbacks 
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Admins can view all feedbacks
CREATE POLICY "Admins can view all feedbacks" ON feedbacks 
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Policy: Admins can update feedbacks (for replying)
CREATE POLICY "Admins can update feedbacks" ON feedbacks 
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );

-- Policy: Admins can delete feedbacks
CREATE POLICY "Admins can delete feedbacks" ON feedbacks 
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
  );
