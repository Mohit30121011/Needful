-- Restaurants Providers for Needful
-- Run this in Supabase SQL Editor
-- This script safely handles Category creation and Provider insertion

-- 1. Ensure 'Restaurants' Category exists
INSERT INTO categories (name, slug, icon, display_order)
VALUES ('Restaurants', 'restaurants', 'UtensilsCrossed', 4)
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert 10 Restaurant Providers using the fetched Category ID
INSERT INTO providers (
    id, business_name, slug, category_id, description, 
    address, area, city, state, country, pincode,
    phone, whatsapp, email, website,
    is_verified, is_responsive, is_available, 
    operating_hours, rating, review_count, price_range,
    latitude, longitude, since_year, specialties, payment_modes,
    created_at
) VALUES

-- 1. Sharma's Kitchen
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 
 'Sharma''s Kitchen', 
 'sharmas-kitchen', 
 (SELECT id FROM categories WHERE slug = 'restaurants' LIMIT 1), 
 'Authentic North Indian cuisine with homestyle cooking. Famous for butter chicken, dal makhani, and fresh naans made in tandoor.', 
 'Shop 12, Lokhandwala Complex', 'Andheri West', 'Mumbai', 'Maharashtra', 'India', '400053',
 '+91 98765 43201', '+91 98765 43201', 'sharmas.kitchen@email.com', NULL,
 true, true, true, 
 'Mon-Sun: 11:00 AM - 11:00 PM', 4.6, 892, '₹400-800',
 19.1380, 72.8354, 2015, ARRAY['Butter Chicken', 'Dal Makhani', 'Tandoori Roti'], ARRAY['Cash', 'UPI', 'Card'],
 NOW()),

-- 2. Coastal Spice
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', 
 'Coastal Spice', 
 'coastal-spice', 
 (SELECT id FROM categories WHERE slug = 'restaurants' LIMIT 1), 
 'Fresh seafood and authentic coastal Maharashtrian dishes. Try our pomfret fry, koliwada prawns, and surmai curry.', 
 '45, Juhu Tara Road', 'Juhu', 'Mumbai', 'Maharashtra', 'India', '400049',
 '+91 98765 43202', '+91 98765 43202', 'coastalspice@email.com', 'www.coastalspice.in',
 true, true, true, 
 'Mon-Sun: 12:00 PM - 11:00 PM', 4.7, 1456, '₹600-1200',
 19.0896, 72.8259, 2012, ARRAY['Pomfret Fry', 'Prawns Koliwada', 'Fish Thali'], ARRAY['Cash', 'UPI', 'Card'],
 NOW()),

-- 3. Punjab Grill Express
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', 
 'Punjab Grill Express', 
 'punjab-grill-express', 
 (SELECT id FROM categories WHERE slug = 'restaurants' LIMIT 1), 
 'Quick service Punjabi restaurant. Best lassi and chole bhature in town. Perfect for a quick, filling meal.', 
 'Ground Floor, Infinity Mall', 'Malad West', 'Mumbai', 'Maharashtra', 'India', '400064',
 '+91 98765 43203', '+91 98765 43203', 'punjabgrill@email.com', NULL,
 true, true, true, 
 'Mon-Sun: 10:00 AM - 10:30 PM', 4.4, 2341, '₹200-500',
 19.1858, 72.8487, 2018, ARRAY['Chole Bhature', 'Lassi', 'Rajma Chawal'], ARRAY['Cash', 'UPI'],
 NOW()),

-- 4. Dragon House
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', 
 'Dragon House', 
 'dragon-house', 
 (SELECT id FROM categories WHERE slug = 'restaurants' LIMIT 1), 
 'Indo-Chinese fusion restaurant. Famous for Schezwan fried rice, manchurian, and hakka noodles.', 
 '23, Linking Road', 'Bandra West', 'Mumbai', 'Maharashtra', 'India', '400050',
 '+91 98765 43204', '+91 98765 43204', 'dragonhouse@email.com', NULL,
 true, true, true, 
 'Mon-Sun: 11:30 AM - 11:00 PM', 4.3, 1876, '₹350-700',
 19.0596, 72.8295, 2016, ARRAY['Schezwan Fried Rice', 'Manchurian', 'Spring Rolls'], ARRAY['Cash', 'UPI', 'Card'],
 NOW()),

-- 5. South Express
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a05', 
 'South Express', 
 'south-express', 
 (SELECT id FROM categories WHERE slug = 'restaurants' LIMIT 1), 
 'Authentic South Indian vegetarian cuisine. Best dosas, idlis, vadas and filter coffee in Mumbai.', 
 '78, SV Road', 'Kandivali West', 'Mumbai', 'Maharashtra', 'India', '400067',
 '+91 98765 43205', '+91 98765 43205', 'southexpress@email.com', NULL,
 true, true, true, 
 'Mon-Sun: 7:00 AM - 10:00 PM', 4.8, 3210, '₹150-400',
 19.2045, 72.8397, 2010, ARRAY['Masala Dosa', 'Filter Coffee', 'Idli Sambar'], ARRAY['Cash', 'UPI'],
 NOW()),

-- 6. Royal Biryani House
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a06', 
 'Royal Biryani House', 
 'royal-biryani-house', 
 (SELECT id FROM categories WHERE slug = 'restaurants' LIMIT 1), 
 'Hyderabadi dum biryani specialists. Serves the most authentic biryani in Mumbai with secret family recipes.', 
 '56, Hill Road', 'Bandra West', 'Mumbai', 'Maharashtra', 'India', '400050',
 '+91 98765 43206', '+91 98765 43206', 'royalbiryani@email.com', 'www.royalbiryani.in',
 true, true, true, 
 'Mon-Sun: 11:00 AM - 12:00 AM', 4.5, 4567, '₹300-600',
 19.0538, 72.8263, 2014, ARRAY['Chicken Biryani', 'Mutton Biryani', 'Phirni'], ARRAY['Cash', 'UPI', 'Card'],
 NOW()),

-- 7. Pizza Paradise
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a07', 
 'Pizza Paradise', 
 'pizza-paradise', 
 (SELECT id FROM categories WHERE slug = 'restaurants' LIMIT 1), 
 'Wood-fired pizzas and Italian cuisine. Best margherita and pepperoni pizza in the neighborhood.', 
 'Shop 3, Oshiwara Link Road', 'Andheri West', 'Mumbai', 'Maharashtra', 'India', '400053',
 '+91 98765 43207', '+91 98765 43207', 'pizzaparadise@email.com', NULL,
 true, false, true, 
 'Mon-Sun: 12:00 PM - 11:00 PM', 4.2, 1234, '₹400-900',
 19.1420, 72.8387, 2019, ARRAY['Margherita', 'Pepperoni', 'Pasta'], ARRAY['Cash', 'UPI', 'Card'],
 NOW()),

-- 8. Thali Junction
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a08', 
 'Thali Junction', 
 'thali-junction', 
 (SELECT id FROM categories WHERE slug = 'restaurants' LIMIT 1), 
 'Unlimited Gujarati and Rajasthani thali. Pure vegetarian family restaurant with authentic flavors.', 
 '12, Goregaon Link Road', 'Goregaon West', 'Mumbai', 'Maharashtra', 'India', '400062',
 '+91 98765 43208', '+91 98765 43208', 'thalijunction@email.com', NULL,
 true, true, true, 
 'Mon-Sun: 11:00 AM - 3:30 PM, 7:00 PM - 10:30 PM', 4.6, 2890, '₹300-500',
 19.1663, 72.8491, 2013, ARRAY['Gujarati Thali', 'Rajasthani Thali', 'Dal Baati'], ARRAY['Cash', 'UPI'],
 NOW()),

-- 9. Cafe Mocha
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a09', 
 'Cafe Mocha', 
 'cafe-mocha', 
 (SELECT id FROM categories WHERE slug = 'restaurants' LIMIT 1), 
 'Trendy cafe with continental cuisine and amazing desserts. Perfect for hangouts with great ambiance.', 
 '34, Waterfield Road', 'Bandra West', 'Mumbai', 'Maharashtra', 'India', '400050',
 '+91 98765 43209', '+91 98765 43209', 'cafemocha@email.com', 'www.cafemocha.in',
 true, true, true, 
 'Mon-Sun: 9:00 AM - 11:30 PM', 4.4, 1678, '₹500-1000',
 19.0587, 72.8311, 2017, ARRAY['Cold Coffee', 'Pasta', 'Brownie'], ARRAY['Cash', 'UPI', 'Card'],
 NOW()),

-- 10. Bombay Sandwich Corner
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', 
 'Bombay Sandwich Corner', 
 'bombay-sandwich-corner', 
 (SELECT id FROM categories WHERE slug = 'restaurants' LIMIT 1), 
 'Famous for Mumbai street food. Best vada pav, grilled sandwiches and pav bhaji in Dadar.', 
 'Near Dadar Station', 'Dadar West', 'Mumbai', 'Maharashtra', 'India', '400028',
 '+91 98765 43210', '+91 98765 43210', 'bombaysandwich@email.com', NULL,
 true, true, true, 
 'Mon-Sun: 8:00 AM - 11:00 PM', 4.7, 5432, '₹50-200',
 19.0176, 72.8427, 2008, ARRAY['Vada Pav', 'Grilled Sandwich', 'Pav Bhaji'], ARRAY['Cash', 'UPI'],
 NOW())
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert Images
INSERT INTO provider_images (id, provider_id, url, is_primary, display_order) VALUES
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b01', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500', true, 1),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b02', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=500', true, 1),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b03', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', 'https://images.unsplash.com/photo-1546833998-877b37c2e5f6?w=500', true, 1),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b04', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a04', 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=500', true, 1),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b05', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a05', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=500', true, 1),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b06', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a06', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500', true, 1),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b07', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a07', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500', true, 1),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b08', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a08', 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500', true, 1),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b09', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a09', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500', true, 1),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380b10', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500', true, 1)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Reviews
INSERT INTO reviews (id, provider_id, user_name, rating, comment, created_at) VALUES
('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380c01', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 'Rahul M.', 5, 'Best butter chicken I''ve ever had! Authentic North Indian taste.', NOW()),
('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380c02', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', 'Priya S.', 5, 'Fresh seafood and amazing coastal flavors. Must try!', NOW()),
('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380c03', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a05', 'Amit K.', 5, 'Crispy dosas and perfect filter coffee. Feels like Chennai!', NOW()),
('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380c04', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a06', 'Neha R.', 4, 'Authentic Hyderabadi biryani. Portion size is generous.', NOW()),
('c1eebc99-9c0b-4ef8-bb6d-6bb9bd380c05', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a10', 'Vikram P.', 5, 'Best vada pav in Mumbai! Street food at its finest.', NOW())
ON CONFLICT (id) DO NOTHING;

SELECT 'Successfully added 10 restaurants with images and full details!' as status;
