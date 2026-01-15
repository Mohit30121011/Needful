-- Correction for Coastal Spice operating hours
UPDATE providers 
SET operating_hours = 'Mon-Sun: 11:00 AM - 11:30 PM'
WHERE slug = 'coastal-spice';
