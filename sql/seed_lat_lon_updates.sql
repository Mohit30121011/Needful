-- Update script to populate latitude and longitude for existing providers
-- Run this after applying migration_add_lat_lon.sql

UPDATE providers SET latitude = 19.1380, longitude = 72.8354 WHERE slug = 'sharmas-kitchen';
UPDATE providers SET latitude = 19.0896, longitude = 72.8259 WHERE slug = 'coastal-spice';
UPDATE providers SET latitude = 19.1858, longitude = 72.8487 WHERE slug = 'punjab-grill-express';
UPDATE providers SET latitude = 19.0596, longitude = 72.8295 WHERE slug = 'dragon-house';
UPDATE providers SET latitude = 19.2045, longitude = 72.8397 WHERE slug = 'south-express';
UPDATE providers SET latitude = 19.0538, longitude = 72.8263 WHERE slug = 'royal-biryani-house';
UPDATE providers SET latitude = 19.1420, longitude = 72.8387 WHERE slug = 'pizza-paradise';
UPDATE providers SET latitude = 19.1663, longitude = 72.8491 WHERE slug = 'thali-junction';
UPDATE providers SET latitude = 19.0587, longitude = 72.8311 WHERE slug = 'cafe-mocha';
UPDATE providers SET latitude = 19.0176, longitude = 72.8427 WHERE slug = 'bombay-sandwich-corner';
