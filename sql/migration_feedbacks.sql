-- Feedbacks table for contact form submissions
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS feedbacks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'general', -- general, bug, feature, praise
  status TEXT DEFAULT 'pending', -- pending, read, resolved
  admin_reply TEXT,
  admin_replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_feedbacks_user ON feedbacks(user_id);
CREATE INDEX IF NOT EXISTS idx_feedbacks_status ON feedbacks(status);
CREATE INDEX IF NOT EXISTS idx_feedbacks_created ON feedbacks(created_at DESC);

-- Enable RLS
ALTER TABLE feedbacks ENABLE ROW LEVEL SECURITY;

-- Policies
-- Anyone can create feedback (even anonymous users)
CREATE POLICY "Anyone can create feedback" ON feedbacks 
  FOR INSERT WITH CHECK (true);

-- Users can view their own feedback
CREATE POLICY "Users can view own feedback" ON feedbacks 
  FOR SELECT USING (auth.uid() = user_id);

-- Admins can view all feedbacks
CREATE POLICY "Admins can view all feedbacks" ON feedbacks 
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can update feedbacks (for replying)
CREATE POLICY "Admins can update feedbacks" ON feedbacks 
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Admins can delete feedbacks
CREATE POLICY "Admins can delete feedbacks" ON feedbacks 
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );
