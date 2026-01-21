-- Fix Database Schema for NeedFul App
-- Run this in your Supabase SQL Editor

-- 1. Ensure 'status' column exists in 'providers' table
ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'approved';

-- Update existing NULL status to approved
UPDATE providers SET status = 'approved' WHERE status IS NULL;

-- 2. Ensure 'provider_images' table exists
CREATE TABLE IF NOT EXISTS provider_images (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    provider_id uuid REFERENCES providers(id) ON DELETE CASCADE,
    url text NOT NULL,
    display_order integer DEFAULT 0,
    is_primary boolean DEFAULT false
);

-- 3. Enable RLS on provider_images (optional but recommended)
ALTER TABLE provider_images ENABLE ROW LEVEL SECURITY;

-- 4. Create policy to allow public read of images
DROP POLICY IF EXISTS "Public images are viewable by everyone" ON provider_images;
CREATE POLICY "Public images are viewable by everyone" 
ON provider_images FOR SELECT 
USING (true);
