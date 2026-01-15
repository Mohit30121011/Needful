-- Final Data Pack: Remaining 12 Categories
-- Completes the Needful Ecosystem
-- Categories: Tiffin, Movers, Painters, Yoga, Lawyers, CA, Events, Photo, Gym, Pet, Interior, Laptop

-- 1. Ensure Categories Exist
INSERT INTO categories (name, slug, icon, display_order) VALUES 
('Tiffin Services', 'tiffin-service', 'Utensils', 10),
('Movers & Packers', 'movers', 'Truck', 11),
('Painters', 'painters', 'Paintbrush', 12),
('Yoga Tutors', 'yoga', 'Activity', 13),
('Legal Services', 'lawyers', 'Scale', 14),
('Chartered Accountant', 'ca', 'Calculator', 15),
('Event Planners', 'events', 'PartyPopper', 16),
('Photographers', 'photographers', 'Camera', 17),
('Gyms & Fitness', 'gym', 'Dumbbell', 18),
('Pet Grooming', 'pet-grooming', 'Dog', 19),
('Interior Designers', 'interior-designers', 'Layout', 20),
('Laptop Repair', 'laptop-repair', 'Laptop', 21)
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

-- === TIFFIN SERVICES ===
(gen_random_uuid(), 'Maa Ki Rasoi', 'maa-ki-rasoi', (SELECT id FROM categories WHERE slug = 'tiffin-service'), 
 'Home-cooked healthy tiffin service. Pure veg and non-veg options available. Monthly subscription plans.',
 'Flat 102, Gokul Dham', 'Goregaon East', 'Mumbai', 'Maharashtra', 'India', '400063',
 '+91 98200 91001', '+91 98200 91001', 'maakirasoi@email.com', NULL,
 true, true, true, 'Mon-Sat: 7:00 AM - 9:00 PM', 4.8, 450, '₹100-250',
 19.1690, 72.8550, 2018, ARRAY['Veg Thali', 'Non-Veg Thali', 'Healthy'], ARRAY['Cash', 'UPI', 'Monthly'], NOW()),

(gen_random_uuid(), 'Corporate Lunchbox', 'corporate-lunchbox', (SELECT id FROM categories WHERE slug = 'tiffin-service'), 
 'Premium tiffin delivery for offices in BKC and Andheri. Salad bowls and diet meals available.',
 'Unit 5, Industrial Estate', 'Andheri East', 'Mumbai', 'Maharashtra', 'India', '400093',
 '+91 98200 91002', '+91 98200 91002', 'corpbox@email.com', 'www.corplunch.in',
 true, true, true, 'Mon-Fri: 9:00 AM - 6:00 PM', 4.5, 320, '₹200-500',
 19.1150, 72.8680, 2020, ARRAY['Salads', 'Keto Meals', 'Office Lunch'], ARRAY['Online', 'Neobank'], NOW()),


-- === MOVERS & PACKERS ===
(gen_random_uuid(), 'SafeShift Movers', 'safeshift-movers', (SELECT id FROM categories WHERE slug = 'movers'), 
 'Hassle-free home and office relocation. Bubble wrap packing and insurance included.',
 'Shop 8, Transport Nagar', 'Vashi', 'Navi Mumbai', 'Maharashtra', 'India', '400703',
 '+91 98200 92001', '+91 98200 92001', 'safeshift@email.com', 'www.safeshift.com',
 true, true, true, 'Mon-Sun: 24 Hours', 4.7, 890, '₹5000-25000',
 19.0660, 72.9980, 2010, ARRAY['Home Shifting', 'Office Move', 'Storage'], ARRAY['Cash', 'Card'], NOW()),


-- === PAINTERS ===
(gen_random_uuid(), 'Colors of Mumbai', 'colors-mumbai', (SELECT id FROM categories WHERE slug = 'painters'), 
 'Professional house painting services. Texture painting, waterproofing, and stencil designs.',
 'Shop 3, Main Market', 'Chembur', 'Mumbai', 'Maharashtra', 'India', '400071',
 '+91 98200 93001', NULL, NULL, NULL,
 true, true, true, 'Mon-Sun: 9:00 AM - 7:00 PM', 4.4, 150, '₹12-25/sqft',
 19.0520, 72.9000, 2015, ARRAY['Interior', 'Exterior', 'Texture'], ARRAY['Cash', 'Cheque'], NOW()),


-- === YOGA TUTORS ===
(gen_random_uuid(), 'Yogic Life Studio', 'yogic-life', (SELECT id FROM categories WHERE slug = 'yoga'), 
 'Personal yoga trainer at home or online. Specialized in weight loss and prenatal yoga.',
 '12, Sea Breeze', 'Worli', 'Mumbai', 'Maharashtra', 'India', '400018',
 '+91 98200 94001', '+91 98200 94001', 'yogiclife@email.com', NULL,
 true, true, true, 'Mon-Sat: 6:00 AM - 11:00 AM, 4:00 PM - 8:00 PM', 4.9, 210, '₹1000-3000/session',
 19.0170, 72.8170, 2016, ARRAY['Hatha Yoga', 'Power Yoga', 'Meditation'], ARRAY['UPI', 'Cash'], NOW()),


-- === LAWYERS ===
(gen_random_uuid(), 'Advocate Suresh & Associates', 'adv-suresh', (SELECT id FROM categories WHERE slug = 'lawyers'), 
 'Expert legal consultation for property disputes, divorce, and corporate law.',
 'Office 402, Chambers', 'Fort', 'Mumbai', 'Maharashtra', 'India', '400001',
 '+91 98200 95001', NULL, 'suresh.law@email.com', NULL,
 true, false, true, 'Mon-Fri: 10:00 AM - 6:00 PM', 4.6, 95, '₹2000-5000/consult',
 18.9320, 72.8330, 2005, ARRAY['Property Law', 'Family Law', 'Notary'], ARRAY['Card', 'Cheque'], NOW()),


-- === CHARTERED ACCOUNTANTS ===
(gen_random_uuid(), 'FinTax Consultants', 'fintax-ca', (SELECT id FROM categories WHERE slug = 'ca'), 
 'GST filing, Income Tax Return, and company registration services for small businesses.',
 'B-22, Commercial Hub', 'Ghatkopar East', 'Mumbai', 'Maharashtra', 'India', '400077',
 '+91 98200 96001', '+91 98200 96001', 'contact@fintax.in', 'www.fintax.in',
 true, true, true, 'Mon-Sat: 10:00 AM - 7:00 PM', 4.8, 340, '₹1500-10000',
 19.0760, 72.9080, 2012, ARRAY['GST', 'ITR', 'Audit'], ARRAY['Online', 'Cheque'], NOW()),


-- === EVENT PLANNERS ===
(gen_random_uuid(), 'Celebrations Events', 'celebrations-events', (SELECT id FROM categories WHERE slug = 'events'), 
 'End-to-end event management for weddings, birthdays, and corporate parties.',
 'Plot 4, Juhu Scheme', 'Vile Parle West', 'Mumbai', 'Maharashtra', 'India', '400056',
 '+91 98200 97001', '+91 98200 97001', 'party@celebrations.com', 'www.celebrations.com',
 true, true, true, 'Mon-Sun: 10:00 AM - 9:00 PM', 4.7, 180, '₹25000+',
 19.1080, 72.8360, 2014, ARRAY['Weddings', 'Decor', 'Catering'], ARRAY['Cheque', 'Transfer'], NOW()),


-- === PHOTOGRAPHERS ===
(gen_random_uuid(), 'LensMagic Studio', 'lensmagic', (SELECT id FROM categories WHERE slug = 'photographers'), 
 'Professional photography for weddings, portfolios, and product shoots. Drone shots available.',
 'Shop 11, Linking Road', 'Bandra West', 'Mumbai', 'Maharashtra', 'India', '400050',
 '+91 98200 98001', '+91 98200 98001', 'magic@lens.com', NULL,
 true, true, true, 'Mon-Sun: 10:00 AM - 8:30 PM', 4.5, 230, '₹5000-50000',
 19.0600, 72.8330, 2017, ARRAY['Wedding', 'Portrait', 'Product'], ARRAY['Cash', 'UPI'], NOW()),


-- === GYMS ===
(gen_random_uuid(), 'Fitness First Gym', 'fitness-first', (SELECT id FROM categories WHERE slug = 'gym'), 
 'Modern equipment, air conditioned gym with certified personal trainers. Steam and sauna included.',
 'Level 3, Mall', 'Malad West', 'Mumbai', 'Maharashtra', 'India', '400064',
 '+91 98200 99001', '+91 98200 99001', 'join@fitnessfirst.in', 'www.fitnessfirst.in',
 true, true, true, 'Mon-Sat: 5:00 AM - 11:00 PM', 4.6, 560, '₹15000/year',
 19.1860, 72.8480, 2015, ARRAY['Weight Training', 'Cardio', 'Zumba'], ARRAY['Card', 'UPI', 'EMI'], NOW()),


-- === PET GROOMING ===
(gen_random_uuid(), 'Pawfect Groomers', 'pawfect-groomers', (SELECT id FROM categories WHERE slug = 'pet-grooming'), 
 'Mobile pet grooming van. We come to your home. Bath, haircut, and nail clipping for dogs and cats.',
 'Versova', 'Andheri West', 'Mumbai', 'Maharashtra', 'India', '400061',
 '+91 98200 00001', '+91 98200 00001', 'woof@pawfect.com', NULL,
 true, true, true, 'Tue-Sun: 10:00 AM - 6:00 PM', 4.9, 120, '₹800-2500',
 19.1350, 72.8140, 2021, ARRAY['Dog Bath', 'Haircut', 'Nail Trimming'], ARRAY['Cash', 'UPI'], NOW()),


-- === INTERIOR DESIGNERS ===
(gen_random_uuid(), 'SpaceCraft Interiors', 'spacecraft-int', (SELECT id FROM categories WHERE slug = 'interior-designers'), 
 'Turnkey interior design solutions for 2BHK and 3BHK flats. Modern and minimalist designs.',
 'Office 202, The Hub', 'Lower Parel', 'Mumbai', 'Maharashtra', 'India', '400013',
 '+91 98200 00002', NULL, 'design@spacecraft.in', 'www.spacecraft.in',
 true, true, true, 'Mon-Sat: 10:00 AM - 7:00 PM', 4.8, 90, '₹5L-50L',
 18.9950, 72.8290, 2013, ARRAY['Residential', 'Commercial', 'Decor'], ARRAY['Cheque', 'Transfer'], NOW()),


-- === LAPTOP REPAIR ===
(gen_random_uuid(), 'CompFix Center', 'compfix-center', (SELECT id FROM categories WHERE slug = 'laptop-repair'), 
 'Chip-level repair for Apple MacBook, Dell, HP, and Lenovo laptops. Screen replacement in 1 hour.',
 'Shop 10, Lamington Road', 'Grant Road', 'Mumbai', 'Maharashtra', 'India', '400007',
 '+91 98200 00003', '+91 98200 00003', 'support@compfix.in', NULL,
 true, true, true, 'Mon-Sat: 11:00 AM - 9:00 PM', 4.4, 670, '₹500-15000',
 18.9630, 72.8160, 2008, ARRAY['Screen Repair', 'Battery', 'Software'], ARRAY['Cash', 'Card'], NOW());
