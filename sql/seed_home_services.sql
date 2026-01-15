-- Home Services Providers for Needful
-- Electricians, Plumbers, AC Repair, Carpenters
-- Includes Lat/Lon, Phone, Hours for Chatbot Compatibility

-- 1. Ensure Categories Exist
INSERT INTO categories (name, slug, icon, display_order) VALUES 
('Electrician', 'electrician', 'Zap', 1),
('Plumber', 'plumber', 'Droplets', 2),
('AC Repair', 'ac-repair', 'ThermometerSnowflake', 5),
('Carpenter', 'carpenter', 'Hammer', 3)
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

-- === ELECTRICIANS ===
(gen_random_uuid(), 'PowerUp Electricals', 'powerup-electricals', (SELECT id FROM categories WHERE slug = 'electrician'), 
 'Expert licensed electricians for home wiring, inverter installation, and fuse repairs. 24/7 emergency support.',
 'Shop 4, Star Colony', 'Andheri East', 'Mumbai', 'Maharashtra', 'India', '400069',
 '+91 98200 20001', '+91 98200 20001', 'powerup@email.com', NULL,
 true, true, true, 'Mon-Sun: 24 Hours', 4.8, 450, '₹500-2000',
 19.1136, 72.8697, 2010, ARRAY['Wiring', 'Inverter', 'Emergency'], ARRAY['Cash', 'UPI'], NOW()),

(gen_random_uuid(), 'QuickFix Electric', 'quickfix-electric', (SELECT id FROM categories WHERE slug = 'electrician'), 
 'Affordable electrical repairs and maintenance. We fix fans, lights, and switchboards quickly.',
 '12, Bazaar Road', 'Bandra West', 'Mumbai', 'Maharashtra', 'India', '400050',
 '+91 98200 20002', '+91 98200 20002', 'quickfix@email.com', NULL,
 true, false, true, 'Mon-Sat: 9:00 AM - 9:00 PM', 4.2, 120, '₹200-500',
 19.0544, 72.8402, 2018, ARRAY['Fan Repair', 'Switchboard', 'Lights'], ARRAY['Cash', 'UPI'], NOW()),

(gen_random_uuid(), 'Sharma Electrics', 'sharma-electrics', (SELECT id FROM categories WHERE slug = 'electrician'), 
 'Trusted local electrician for 20 years. Specializes in full home wiring and heavy load setup.',
 'Near Station', 'Malad West', 'Mumbai', 'Maharashtra', 'India', '400064',
 '+91 98200 20003', NULL, NULL, NULL,
 true, true, true, 'Mon-Sun: 10:00 AM - 8:00 PM', 4.5, 310, '₹300-1000',
 19.1874, 72.8484, 2003, ARRAY['House Wiring', 'MCB Installing'], ARRAY['Cash'], NOW()),


-- === PLUMBERS ===
(gen_random_uuid(), 'LeakProof Plumbing', 'leakproof-plumbing', (SELECT id FROM categories WHERE slug = 'plumber'), 
 'Professional plumbing services. We fix leaks, install taps, and clear clogged drains using modern tools.',
 'Flat 3, Sunshine Apts', 'Juhu', 'Mumbai', 'Maharashtra', 'India', '400049',
 '+91 98200 30001', '+91 98200 30001', 'leakproof@email.com', 'www.leakproof.in',
 true, true, true, 'Mon-Sun: 8:00 AM - 8:00 PM', 4.7, 560, '₹500-1500',
 19.1075, 72.8263, 2015, ARRAY['Leak Repair', 'Drain Cleaning', 'Fitting'], ARRAY['Cash', 'UPI', 'Genie'], NOW()),

(gen_random_uuid(), 'Mumbai Plumbers Association', 'mumbai-plumbers', (SELECT id FROM categories WHERE slug = 'plumber'), 
 'Certified plumbers available for contracts and urgent repairs. Reliable and standard rates.',
 'Office 10, Dadar Market', 'Dadar West', 'Mumbai', 'Maharashtra', 'India', '400028',
 '+91 98200 30002', NULL, 'contact@mumbaiplumbers.org', NULL,
 true, false, true, 'Mon-Sat: 10:00 AM - 7:00 PM', 4.0, 89, '₹400-800',
 19.0178, 72.8478, 2000, ARRAY['General Plumbing', 'Contract Work'], ARRAY['Cash', 'UPI'], NOW()),


-- === AC REPAIR ===
(gen_random_uuid(), 'CoolBreeze AC Services', 'coolbreeze-ac', (SELECT id FROM categories WHERE slug = 'ac-repair'), 
 'Expert AC installation, servicing, and gas filling. We service all brands including Voltas, LG, and Daikin.',
 'Shop 9, Link Road', 'Goregaon West', 'Mumbai', 'Maharashtra', 'India', '400104',
 '+91 98200 40001', '+91 98200 40001', 'coolbreeze@email.com', NULL,
 true, true, true, 'Mon-Sun: 9:00 AM - 10:00 PM', 4.6, 890, '₹600-2500',
 19.1688, 72.8415, 2012, ARRAY['AC Service', 'Gas Filling', 'Installation'], ARRAY['Cash', 'UPI', 'Card'], NOW()),

(gen_random_uuid(), 'Fast Cool Technicians', 'fast-cool-tech', (SELECT id FROM categories WHERE slug = 'ac-repair'), 
 'Urgent AC repair visits within 2 hours. Reasonable rates for seasonal servicing.',
 'Sector 4', 'Kandivali West', 'Mumbai', 'Maharashtra', 'India', '400067',
 '+91 98200 40002', '+91 98200 40002', NULL, NULL,
 false, true, true, 'Mon-Sun: 8:00 AM - 11:00 PM', 4.3, 230, '₹500-1200',
 19.2100, 72.8300, 2019, ARRAY['Quick Repair', 'Cleaning'], ARRAY['Cash', 'UPI'], NOW()),


-- === CARPENTERS ===
(gen_random_uuid(), 'Wooden Artistry', 'wooden-artistry', (SELECT id FROM categories WHERE slug = 'carpenter'), 
 'Premium furniture making and repair. Custom cabinets, wardrobes, and antique restoration.',
 'Plot 55, Turner Road', 'Bandra West', 'Mumbai', 'Maharashtra', 'India', '400050',
 '+91 98200 50001', '+91 98200 50001', 'woodart@email.com', 'www.woodenartistry.com',
 true, true, false, 'Mon-Sat: 10:00 AM - 7:00 PM', 4.9, 120, '₹2000-50000',
 19.0590, 72.8330, 2005, ARRAY['Custom Furniture', 'Polishing', 'Repair'], ARRAY['Cash', 'UPI', 'Cheque'], NOW()),

(gen_random_uuid(), 'Local Carpenter Javed', 'local-carpenter-javed', (SELECT id FROM categories WHERE slug = 'carpenter'), 
 'Small repair works, door hinges, latch repair, and shelf installation. Affordable daily rates.',
 'Chawl 3', 'Andheri East', 'Mumbai', 'Maharashtra', 'India', '400069',
 '+91 98200 50002', NULL, NULL, NULL,
 true, true, true, 'Mon-Sun: 9:00 AM - 8:00 PM', 4.4, 45, '₹200-1000',
 19.1150, 72.8600, 2015, ARRAY['Door Repair', 'Shelf Fix'], ARRAY['Cash'], NOW());
