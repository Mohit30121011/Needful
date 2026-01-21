-- 1. Add 'status' column to 'providers' table (if not exists)
ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';

-- 2. Mark all existing providers as 'approved' to prevent breaking current site
UPDATE providers SET status = 'approved' WHERE status IS NULL OR status = 'pending';

-- 3. Create a secure function to handle status updates (optional rpc but good practice)
-- or just use direct update if RLS allows.

-- 4. INSTRUCTIONS TO CREATE ADMIN USER:
-- Run the following Steps in Supabase Dashboard -> Authentication -> Users:
-- 1. Click "Add User"
-- 2. Email: admin@needful.com
-- 3. Password: NeedfulAdmin123
-- 4. Auto-confirm email: Yes

-- 5. AFTER Creating the user, run this SQL to make them an admin:
-- Replace 'admin@needful.com' with the actual email if different.

UPDATE users AS u
SET role = 'admin'
FROM auth.users AS au
WHERE u.id = au.id
AND au.email = 'admin@needful.com';

-- Verify the update
SELECT * FROM users WHERE role = 'admin';
