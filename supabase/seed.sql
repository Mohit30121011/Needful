-- Needful Seed Data
-- Run this after schema.sql

-- Insert Categories
INSERT INTO categories (id, name, slug, icon, display_order) VALUES
  ('c1000001-0000-0000-0000-000000000001', 'Restaurants', 'restaurants', 'UtensilsCrossed', 1),
  ('c1000002-0000-0000-0000-000000000002', 'Hotels', 'hotels', 'Hotel', 2),
  ('c1000003-0000-0000-0000-000000000003', 'Beauty & Spa', 'beauty-spa', 'Sparkles', 3),
  ('c1000004-0000-0000-0000-000000000004', 'Home Decor', 'home-decor', 'Sofa', 4),
  ('c1000005-0000-0000-0000-000000000005', 'Wedding Planning', 'wedding-planning', 'Heart', 5),
  ('c1000006-0000-0000-0000-000000000006', 'Education', 'education', 'GraduationCap', 6),
  ('c1000007-0000-0000-0000-000000000007', 'Rent & Hire', 'rent-hire', 'Car', 7),
  ('c1000008-0000-0000-0000-000000000008', 'Hospitals', 'hospitals', 'Hospital', 8),
  ('c1000009-0000-0000-0000-000000000009', 'Contractors', 'contractors', 'HardHat', 9),
  ('c100000a-0000-0000-0000-00000000000a', 'Pet Shops', 'pet-shops', 'PawPrint', 10),
  ('c100000b-0000-0000-0000-00000000000b', 'Electricians', 'electricians', 'Zap', 11),
  ('c100000c-0000-0000-0000-00000000000c', 'Plumbers', 'plumbers', 'Wrench', 12),
  ('c100000d-0000-0000-0000-00000000000d', 'AC Repair', 'ac-repair', 'AirVent', 13),
  ('c100000e-0000-0000-0000-00000000000e', 'Carpenters', 'carpenters', 'Hammer', 14),
  ('c100000f-0000-0000-0000-00000000000f', 'Painters', 'painters', 'Paintbrush', 15),
  ('c1000010-0000-0000-0000-000000000010', 'Doctors', 'doctors', 'Stethoscope', 16),
  ('c1000011-0000-0000-0000-000000000011', 'Real Estate', 'real-estate', 'Building', 17),
  ('c1000012-0000-0000-0000-000000000012', 'Gyms & Fitness', 'gyms-fitness', 'Dumbbell', 18),
  ('c1000013-0000-0000-0000-000000000013', 'Lawyers', 'lawyers', 'Scale', 19),
  ('c1000014-0000-0000-0000-000000000014', 'Packers & Movers', 'packers-movers', 'Truck', 20);

-- Insert Sample Providers
INSERT INTO providers (id, user_id, business_name, slug, description, address, city, phone, whatsapp, email, category_id, is_verified, is_responsive, is_available, operating_hours, rating, review_count, views) VALUES
  -- Electricians
  ('a1000001-0000-0000-0000-000000000001', NULL, 'P K Enterprises', 'pk-enterprises', 'Professional electrical services for residential and commercial properties. 24/7 emergency service available. Specializing in wiring, installation, and maintenance.', 'Indira Nagar Turbhe Midc', 'Mumbai', '08511341677', '08511341677', 'pk.enterprises@email.com', 'c100000b-0000-0000-0000-00000000000b', true, true, true, '24 Hours Open', 4.1, 62, 1250),
  ('a1000002-0000-0000-0000-000000000002', NULL, 'Shri Electricals', 'shri-electricals', 'Expert electrical contractors with 15+ years of experience. We handle office electrical work, building wiring, and maintenance contracts.', 'Sector 11 Vashi', 'Mumbai', '09845266810', '09845266810', 'shri.electricals@email.com', 'c100000b-0000-0000-0000-00000000000b', true, true, true, '9 AM - 8 PM', 4.1, 40, 890),
  ('a1000003-0000-0000-0000-000000000003', NULL, 'MK Electronic', 'mk-electronic', 'Trending electrical service provider in Navi Mumbai. Quick response time and quality workmanship guaranteed.', 'Panvel Road Panvel', 'Mumbai', '08460473558', '08460473558', 'mk.electronic@email.com', 'c100000b-0000-0000-0000-00000000000b', false, true, true, '8 AM - 9 PM', 4.8, 14, 456),
  ('a1000004-0000-0000-0000-000000000004', NULL, 'Omkar Power Point', 'omkar-power-point', 'Reliable electrical services for all your power needs. Industrial and residential expertise.', 'Andheri East', 'Mumbai', '09876543210', '09876543210', 'omkar.power@email.com', 'c100000b-0000-0000-0000-00000000000b', false, true, true, '10 AM - 7 PM', 4.2, 7, 234),
  
  -- Plumbers
  ('a1000005-0000-0000-0000-000000000005', NULL, 'Quick Fix Plumbing', 'quick-fix-plumbing', 'Fast and reliable plumbing services. We fix leaks, install fixtures, and handle all plumbing emergencies.', 'Bandra West', 'Mumbai', '09988776655', '09988776655', 'quickfix@email.com', 'c100000c-0000-0000-0000-00000000000c', true, true, true, '24 Hours Open', 4.5, 89, 2100),
  ('a1000006-0000-0000-0000-000000000006', NULL, 'Mumbai Plumbers Hub', 'mumbai-plumbers-hub', 'Your one-stop solution for all plumbing needs. Licensed and insured professionals.', 'Dadar', 'Mumbai', '09123456789', '09123456789', 'mumbai.plumbers@email.com', 'c100000c-0000-0000-0000-00000000000c', true, false, true, '8 AM - 10 PM', 4.3, 156, 3200),
  
  -- AC Repair
  ('a1000007-0000-0000-0000-000000000007', NULL, 'Cool Breeze AC Services', 'cool-breeze-ac', 'Expert AC repair and maintenance. All brands serviced. Annual maintenance contracts available.', 'Powai', 'Mumbai', '08877665544', '08877665544', 'coolbreeze@email.com', 'c100000d-0000-0000-0000-00000000000d', true, true, true, '9 AM - 9 PM', 4.6, 234, 4500),
  ('a1000008-0000-0000-0000-000000000008', NULL, 'Arctic Cooling Solutions', 'arctic-cooling', 'Premium AC services with genuine spare parts. Installation, repair, and gas refilling.', 'Malad West', 'Mumbai', '09556677889', '09556677889', 'arctic@email.com', 'c100000d-0000-0000-0000-00000000000d', true, true, true, '8 AM - 8 PM', 4.4, 78, 1890),
  
  -- Restaurants
  ('a1000009-0000-0000-0000-000000000009', NULL, 'Spice Garden Restaurant', 'spice-garden', 'Authentic Indian cuisine with a modern twist. Family-friendly ambiance with outdoor seating.', 'Juhu Beach', 'Mumbai', '02226543210', '09334455667', 'spicegarden@email.com', 'c1000001-0000-0000-0000-000000000001', true, true, true, '11 AM - 11 PM', 4.7, 456, 8900),
  ('a100000a-0000-0000-0000-00000000000a', NULL, 'The Urban Cafe', 'urban-cafe', 'Trendy cafe serving continental dishes, artisan coffee, and fresh baked goods.', 'Lower Parel', 'Mumbai', '02227654321', '09445566778', 'urbancafe@email.com', 'c1000001-0000-0000-0000-000000000001', true, false, true, '8 AM - 10 PM', 4.5, 312, 6700),
  
  -- Beauty & Spa
  ('a100000b-0000-0000-0000-00000000000b', NULL, 'Glow Beauty Salon', 'glow-beauty-salon', 'Premium beauty services including haircuts, coloring, makeup, and bridal packages.', 'Linking Road', 'Mumbai', '09887766554', '09887766554', 'glowbeauty@email.com', 'c1000003-0000-0000-0000-000000000003', true, true, true, '10 AM - 9 PM', 4.8, 289, 5600),
  ('a100000c-0000-0000-0000-00000000000c', NULL, 'Zen Spa & Wellness', 'zen-spa-wellness', 'Relaxing spa treatments, massages, and wellness therapies. Escape the city stress.', 'Worli', 'Mumbai', '09776655443', '09776655443', 'zenspa@email.com', 'c1000003-0000-0000-0000-000000000003', true, true, true, '9 AM - 10 PM', 4.9, 178, 4200),
  
  -- Doctors
  ('a100000d-0000-0000-0000-00000000000d', NULL, 'Dr. Sharma Clinic', 'dr-sharma-clinic', 'General physician with 20+ years experience. Specializing in family medicine and preventive care.', 'Thane West', 'Mumbai', '09665544332', '09665544332', 'drsharma@email.com', 'c1000010-0000-0000-0000-000000000010', true, true, true, '9 AM - 1 PM, 5 PM - 9 PM', 4.6, 567, 12000),
  ('a100000e-0000-0000-0000-00000000000e', NULL, 'Apollo Dental Care', 'apollo-dental', 'Modern dental clinic offering all dental services. Painless treatments with latest technology.', 'Andheri West', 'Mumbai', '09554433221', '09554433221', 'apollodental@email.com', 'c1000010-0000-0000-0000-000000000010', true, true, true, '10 AM - 8 PM', 4.7, 234, 5600),
  
  -- Contractors
  ('a100000f-0000-0000-0000-00000000000f', NULL, 'BuildRight Construction', 'buildright-construction', 'Complete construction solutions from foundation to finishing. Residential and commercial projects.', 'Goregaon East', 'Mumbai', '09443322110', '09443322110', 'buildright@email.com', 'c1000009-0000-0000-0000-000000000009', true, false, true, '9 AM - 6 PM', 4.3, 45, 890),
  
  -- Delhi Providers  
  ('a1000010-0000-0000-0000-000000000010', NULL, 'Delhi Electric Works', 'delhi-electric-works', 'Top-rated electrical services in Delhi NCR. Commercial and residential expertise.', 'Connaught Place', 'Delhi', '09112233445', '09112233445', 'delhielectric@email.com', 'c100000b-0000-0000-0000-00000000000b', true, true, true, '24 Hours Open', 4.4, 234, 5600),
  ('a1000011-0000-0000-0000-000000000011', NULL, 'Royal Plumbing Services', 'royal-plumbing', 'Premium plumbing solutions for homes and offices. Emergency services available.', 'Karol Bagh', 'Delhi', '09223344556', '09223344556', 'royalplumbing@email.com', 'c100000c-0000-0000-0000-00000000000c', true, true, true, '8 AM - 8 PM', 4.5, 167, 3400),
  
  -- Bangalore Providers
  ('a1000012-0000-0000-0000-000000000012', NULL, 'Tech City Electricians', 'tech-city-electricians', 'Smart home installation and electrical services. Serving IT corridor.', 'Whitefield', 'Bangalore', '09334455667', '09334455667', 'techcity@email.com', 'c100000b-0000-0000-0000-00000000000b', true, true, true, '9 AM - 7 PM', 4.6, 189, 4200),
  ('a1000013-0000-0000-0000-000000000013', NULL, 'Garden City Spa', 'garden-city-spa', 'Luxurious spa experience with Ayurvedic and modern treatments.', 'Koramangala', 'Bangalore', '09445566778', '09445566778', 'gardencityspa@email.com', 'c1000003-0000-0000-0000-000000000003', true, true, true, '10 AM - 10 PM', 4.8, 345, 7800),
  ('a1000014-0000-0000-0000-000000000014', NULL, 'Bangalore Foodies Restaurant', 'bangalore-foodies', 'Multi-cuisine restaurant with rooftop dining. Live music on weekends.', 'Indiranagar', 'Bangalore', '09556677889', '09556677889', 'blrfoodies@email.com', 'c1000001-0000-0000-0000-000000000001', true, false, true, '12 PM - 12 AM', 4.5, 567, 12000);

-- Insert Services for providers
INSERT INTO services (id, provider_id, title, description, price, price_unit, is_active) VALUES
  -- P K Enterprises services
  ('b1000001-0000-0000-0000-000000000001', 'a1000001-0000-0000-0000-000000000001', 'Office Electrical Contractor', 'Complete office electrical setup and maintenance', 5000, 'session', true),
  ('b1000002-0000-0000-0000-000000000002', 'a1000001-0000-0000-0000-000000000001', 'Electrical Contractor For Building', 'Full building wiring and electrical work', 25000, 'project', true),
  ('b1000003-0000-0000-0000-000000000003', 'a1000001-0000-0000-0000-000000000001', 'Office Electrical Maintenance', 'Regular maintenance and repair services', 3000, 'month', true),
  ('b1000004-0000-0000-0000-000000000004', 'a1000001-0000-0000-0000-000000000001', 'Emergency Repair', '24/7 emergency electrical repair', 1500, 'visit', true),
  
  -- Shri Electricals services
  ('b1000005-0000-0000-0000-000000000005', 'a1000002-0000-0000-0000-000000000002', 'Home Wiring', 'Complete home wiring solutions', 8000, 'BHK', true),
  ('b1000006-0000-0000-0000-000000000006', 'a1000002-0000-0000-0000-000000000002', 'Industrial Electrical Work', 'Factory and industrial electrical setup', 50000, 'project', true),
  
  -- Quick Fix Plumbing services
  ('b1000007-0000-0000-0000-000000000007', 'a1000005-0000-0000-0000-000000000005', 'Leak Repair', 'Fix all types of water leaks', 500, 'visit', true),
  ('b1000008-0000-0000-0000-000000000008', 'a1000005-0000-0000-0000-000000000005', 'Bathroom Fitting', 'Complete bathroom fixture installation', 3000, 'bathroom', true),
  ('b1000009-0000-0000-0000-000000000009', 'a1000005-0000-0000-0000-000000000005', 'Pipeline Installation', 'New water pipeline installation', 150, 'meter', true),
  
  -- Cool Breeze AC services
  ('b100000a-0000-0000-0000-00000000000a', 'a1000007-0000-0000-0000-000000000007', 'AC Servicing', 'Complete AC cleaning and servicing', 600, 'unit', true),
  ('b100000b-0000-0000-0000-00000000000b', 'a1000007-0000-0000-0000-000000000007', 'AC Installation', 'New AC installation with pipe fitting', 2500, 'unit', true),
  ('b100000c-0000-0000-0000-00000000000c', 'a1000007-0000-0000-0000-000000000007', 'Gas Refilling', 'AC gas top-up and refilling', 2000, 'unit', true),
  
  -- Glow Beauty Salon services
  ('b100000d-0000-0000-0000-00000000000d', 'a100000b-0000-0000-0000-00000000000b', 'Haircut & Styling', 'Professional haircut with styling', 500, 'session', true),
  ('b100000e-0000-0000-0000-00000000000e', 'a100000b-0000-0000-0000-00000000000b', 'Bridal Makeup', 'Complete bridal makeup package', 15000, 'session', true),
  ('b100000f-0000-0000-0000-00000000000f', 'a100000b-0000-0000-0000-00000000000b', 'Hair Coloring', 'Global and highlight coloring', 3000, 'session', true);

-- Insert sample provider images
INSERT INTO provider_images (id, provider_id, url, display_order, is_primary) VALUES
  ('d1000001-0000-0000-0000-000000000001', 'a1000001-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400', 0, true),
  ('d1000002-0000-0000-0000-000000000002', 'a1000002-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 0, true),
  ('d1000003-0000-0000-0000-000000000003', 'a1000003-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', 0, true),
  ('d1000004-0000-0000-0000-000000000004', 'a1000005-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400', 0, true),
  ('d1000005-0000-0000-0000-000000000005', 'a1000007-0000-0000-0000-000000000007', 'https://images.unsplash.com/photo-1631545806609-42e5de7fd587?w=400', 0, true),
  ('d1000006-0000-0000-0000-000000000006', 'a1000009-0000-0000-0000-000000000009', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', 0, true),
  ('d1000007-0000-0000-0000-000000000007', 'a100000b-0000-0000-0000-00000000000b', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400', 0, true),
  ('d1000008-0000-0000-0000-000000000008', 'a100000c-0000-0000-0000-00000000000c', 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400', 0, true);
