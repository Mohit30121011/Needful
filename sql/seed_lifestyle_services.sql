-- Lifestyle & Essential Services Providers
-- Salons, Mechanics, Cleaning, Doctors
-- Optimized for Chatbot Geolocation & Details

-- 1. Ensure Categories Exist
INSERT INTO categories (name, slug, icon, display_order) VALUES 
('Beauty & Salon', 'salon', 'Scissors', 6),
('Mechanics', 'mechanics', 'Wrench', 7),
('Cleaning & Pest', 'cleaning', 'SprayCan', 8),
('Doctors', 'doctors', 'Stethoscope', 9)
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Providers
INSERT INTO providers (
    id, business_name, slug, category_id, description, 
    address, area, city, state, country, pincode,
    phone, whatsapp, email, website,
    is_verified, is_responsive, is_available, 
    operating_hours, rating, review_count, price_range,
    latitude, longitude, since_year, specialties, payment_modes,
    created_at
) VALUES

-- === BEAUTY & SALON ===
(gen_random_uuid(), 'Glamour Unisex Salon', 'glamour-salon', (SELECT id FROM categories WHERE slug = 'salon'), 
 'Premium hair and skin care services. Specialists in bridal makeup, hair coloring, and keratin treatment.',
 'Shop 2, Elite Square', 'Bandra West', 'Mumbai', 'Maharashtra', 'India', '400050',
 '+91 98200 60001', '+91 98200 60001', 'glamour@email.com', 'www.glamourmumbai.in',
 true, true, true, 'Mon-Sun: 10:00 AM - 9:00 PM', 4.7, 340, '₹500-5000',
 19.0550, 72.8300, 2018, ARRAY['Haircut', 'Bridal', 'Facial'], ARRAY['Cash', 'Card', 'UPI'], NOW()),

(gen_random_uuid(), 'StyleX Barbers', 'stylex-barbers', (SELECT id FROM categories WHERE slug = 'salon'), 
 'Modern barber shop for men. Beard grooming, fading, and head message available.',
 'Opposite Station', 'Andheri West', 'Mumbai', 'Maharashtra', 'India', '400058',
 '+91 98200 60002', NULL, NULL, NULL,
 true, false, true, 'Tue-Sun: 9:00 AM - 10:00 PM', 4.3, 150, '₹200-500',
 19.1200, 72.8450, 2020, ARRAY['Men Haircut', 'Beard Trim'], ARRAY['Cash', 'UPI'], NOW()),


-- === MECHANICS ===
(gen_random_uuid(), 'Speedy Car Care', 'speedy-car-care', (SELECT id FROM categories WHERE slug = 'mechanics'), 
 'Multi-brand car workshop. Denting, painting, engine repair and detailing. 24/7 towing available.',
 'Plot 88, MIDC', 'Andheri East', 'Mumbai', 'Maharashtra', 'India', '400093',
 '+91 98200 70001', '+91 98200 70001', 'speedy@email.com', NULL,
 true, true, true, 'Mon-Sun: 24 Hours', 4.5, 600, '₹1000-15000',
 19.1150, 72.8650, 2011, ARRAY['Car Service', 'Breakdown', 'Towing'], ARRAY['Cash', 'Card', 'UPI'], NOW()),

(gen_random_uuid(), 'Bike Doctor Raju', 'bike-doctor-raju', (SELECT id FROM categories WHERE slug = 'mechanics'), 
 'Expert bike mechanic for Royal Enfield, KTM and scooters. Genuine parts only.',
 'Service Road', 'Malad West', 'Mumbai', 'Maharashtra', 'India', '400064',
 '+91 98200 70002', NULL, NULL, NULL,
 true, true, true, 'Mon-Sat: 10:00 AM - 8:30 PM', 4.8, 210, '₹300-2000',
 19.1840, 72.8430, 2014, ARRAY['Bike Repair', 'Puncture', 'Servicing'], ARRAY['Cash', 'UPI'], NOW()),


-- === CLEANING & PEST ===
(gen_random_uuid(), 'Sparkle Cleaners', 'sparkle-cleaners', (SELECT id FROM categories WHERE slug = 'cleaning'), 
 'Professional home deep cleaning and sofa shampooing. We use eco-friendly chemicals.',
 'Office 401, Business Park', 'Powai', 'Mumbai', 'Maharashtra', 'India', '400076',
 '+91 98200 80001', '+91 98200 80001', 'sparkle@email.com', 'www.sparkleclean.in',
 true, true, true, 'Mon-Sun: 9:00 AM - 6:00 PM', 4.6, 120, '₹1500-8000',
 19.1176, 72.9060, 2019, ARRAY['Deep Cleaning', 'Sofa Cleaning', 'Sanitization'], ARRAY['Cash', 'UPI'], NOW()),

(gen_random_uuid(), 'Pest Control Experts', 'pest-control-experts', (SELECT id FROM categories WHERE slug = 'cleaning'), 
 'Guaranteed cockroach and termite treatment. Herbal gel treatment safe for kids and pets.',
 'Shop 5', 'Kandivali East', 'Mumbai', 'Maharashtra', 'India', '400101',
 '+91 98200 80002', NULL, NULL, NULL,
 true, false, true, 'Mon-Sat: 10:00 AM - 7:00 PM', 4.1, 80, '₹800-4000',
 19.2080, 72.8600, 2016, ARRAY['Cockroach', 'Bedbugs', 'Termite'], ARRAY['Cash', 'UPI'], NOW()),


-- === DOCTORS ===
(gen_random_uuid(), 'Dr. Mehta Dental Clinic', 'dr-mehta-dental', (SELECT id FROM categories WHERE slug = 'doctors'), 
 'Advanced dental care center. Root canal, implants, and teeth whitening. Painless treatment.',
 '1st Floor, Sunshine Plaza', 'Dadar West', 'Mumbai', 'Maharashtra', 'India', '400028',
 '+91 98200 90001', '+91 98200 90001', 'mehta.dental@email.com', NULL,
 true, true, true, 'Mon-Sat: 10:00 AM - 2:00 PM, 5:00 PM - 9:00 PM', 4.9, 450, '₹500-15000',
 19.0190, 72.8460, 2008, ARRAY['Dentist', 'Root Canal', 'Implants'], ARRAY['Cash', 'Card'], NOW()),

(gen_random_uuid(), 'City Care Clinic', 'city-care-clinic', (SELECT id FROM categories WHERE slug = 'doctors'), 
 'General Physician and Family Doctor. Fever, cold, diabetes management, and routine checkups.',
 'Near Market', 'Santacruz West', 'Mumbai', 'Maharashtra', 'India', '400054',
 '+91 98200 90002', NULL, NULL, NULL,
 true, true, true, 'Mon-Sat: 6:00 PM - 10:00 PM', 4.4, 230, '₹400-800',
 19.0830, 72.8350, 1998, ARRAY['General Physician', 'Fever', 'Consultation'], ARRAY['Cash'], NOW());
