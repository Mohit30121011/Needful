-- Add JSONB column for dynamic details
ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS details JSONB DEFAULT '{}'::jsonb;

-- Ensure RLS allows insert for authenticated users (already in schema but verifying)
DROP POLICY IF EXISTS "Users can create provider listing" ON providers;
CREATE POLICY "Users can create provider listing" ON providers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Verify policy for updates
DROP POLICY IF EXISTS "Providers can update own listing" ON providers;
CREATE POLICY "Providers can update own listing" ON providers
  FOR UPDATE USING (auth.uid() = user_id);
