SET session_replication_role = 'replica';

-- WARNING: This will clear existing mock data
TRUNCATE TABLE provider_images CASCADE;
TRUNCATE TABLE providers CASCADE;
TRUNCATE TABLE users CASCADE;

-- Insert Categories
INSERT INTO categories (id, name, slug, icon, display_order)
VALUES 
    ('62bbf48d-1f06-4766-a0c9-3b70b803304a', 'Electricians', 'electricians', 'Zap', 1),
    ('09b1c8d9-0015-42fc-a04e-ccf380a11ce6', 'Plumbers', 'plumbers', 'Wrench', 2),
    ('2544d7f4-78ce-46ca-a002-4442fe063b86', 'AC Repair', 'ac-repair', 'AirVent', 3),
    ('12e7d915-17ce-4541-8bb3-5dc9c49866d7', 'Restaurants', 'restaurants', 'UtensilsCrossed', 4),
    ('25d8b778-9cd8-44fb-96d4-4d50e17d0ee5', 'Beauty & Spa', 'beauty-spa', 'Sparkles', 5),
    ('22a5337c-4103-438f-a692-07463d687ea2', 'Doctors', 'doctors', 'Stethoscope', 6),
    ('50210e59-fef2-4765-bd28-fe3bb38aa049', 'Contractors', 'contractors', 'HardHat', 7),
    ('79e6c2f9-3611-4ee6-91d7-f0e9fbf217b9', 'Hotels', 'hotels', 'Hotel', 8)
ON CONFLICT (slug) DO NOTHING;



SET session_replication_role = 'origin';
