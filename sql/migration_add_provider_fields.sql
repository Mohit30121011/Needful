-- Database Migration: Add additional columns to providers and reviews tables
-- Run this in Supabase SQL Editor FIRST before adding restaurants

-- 1. Add new columns to 'providers' table
ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS area TEXT,
ADD COLUMN IF NOT EXISTS state TEXT DEFAULT 'Maharashtra',
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'India',
ADD COLUMN IF NOT EXISTS pincode TEXT,
ADD COLUMN IF NOT EXISTS price_range TEXT,
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 7),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(10, 7),
ADD COLUMN IF NOT EXISTS website TEXT,
ADD COLUMN IF NOT EXISTS since_year INTEGER,
ADD COLUMN IF NOT EXISTS specialties TEXT[],
ADD COLUMN IF NOT EXISTS payment_modes TEXT[] DEFAULT ARRAY['Cash', 'UPI'],
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create index for area verification
CREATE INDEX IF NOT EXISTS idx_providers_area ON providers(area);
CREATE INDEX IF NOT EXISTS idx_providers_pincode ON providers(pincode);

-- Update existing providers with default values for area if missing
UPDATE providers 
SET 
    area = SPLIT_PART(address, ',', 2),
    state = 'Maharashtra',
    country = 'India'
WHERE area IS NULL AND address IS NOT NULL;


-- 2. Add 'user_name' to 'reviews' table (for imported/seed reviews)
ALTER TABLE reviews
ADD COLUMN IF NOT EXISTS user_name TEXT;

-- Make user_id nullable if it isn't already (usually is, but ensuring just in case)
ALTER TABLE reviews
ALTER COLUMN user_id DROP NOT NULL;


SELECT 'Migration completed successfully: Added provider fields and reviewer name!' as status;
