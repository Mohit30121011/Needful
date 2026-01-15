-- Add latitude and longitude columns to providers table
ALTER TABLE providers 
ADD COLUMN IF NOT EXISTS latitude double precision,
ADD COLUMN IF NOT EXISTS longitude double precision;

-- Create an index for faster spatial queries (optional but good practice)
CREATE INDEX IF NOT EXISTS idx_providers_lat_lon ON providers (latitude, longitude);
