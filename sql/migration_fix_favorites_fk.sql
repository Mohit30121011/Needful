-- Drop the existing foreign key constraint referencing auth.users
ALTER TABLE favorites DROP CONSTRAINT IF EXISTS favorites_user_id_fkey;

-- Add a new foreign key constraint referencing public.users
-- This ensures that if the user exists in our public users table (profile), the relation holds.
ALTER TABLE favorites
  ADD CONSTRAINT favorites_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES public.users(id)
  ON DELETE CASCADE;
