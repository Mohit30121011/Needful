-- ============================================
-- Supabase Storage Bucket: business-images
-- ============================================
-- Run this script in Supabase SQL Editor to create the storage bucket
-- and set up the required policies for image uploads.

-- Step 1: Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('business-images', 'business-images', true)
ON CONFLICT (id) DO NOTHING;

-- Step 2: Enable RLS on the storage.objects table (if not already enabled)
-- Note: This is usually already enabled by default

-- Step 3: Create policy to allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload business images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'business-images');

-- Step 4: Create policy to allow public read access to business images
CREATE POLICY "Allow public read access to business images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'business-images');

-- Step 5: Create policy to allow authenticated users to update their uploads
CREATE POLICY "Allow authenticated users to update business images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'business-images');

-- Step 6: Create policy to allow authenticated users to delete their uploads
CREATE POLICY "Allow authenticated users to delete business images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'business-images');
