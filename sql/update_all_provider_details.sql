-- Comprehensive Update Script for All Demo Restaurants
-- Corrects Geolocation, Operating Hours, Contact Info, and Addresses

-- 1. Sharma's Kitchen (Andheri West)
UPDATE providers SET 
    latitude = 19.1380, 
    longitude = 72.8354,
    operating_hours = 'Mon-Sun: 11:00 AM - 11:00 PM',
    phone = '+91 98200 12341',
    address = 'Shop 12, Lokhandwala Complex, Andheri West'
WHERE slug = 'sharmas-kitchen';

-- 2. Coastal Spice (Juhu) - User corrected time (11:30 PM)
UPDATE providers SET 
    latitude = 19.0896, 
    longitude = 72.8259,
    operating_hours = 'Mon-Sun: 11:00 AM - 11:30 PM',
    phone = '+91 98200 12342',
    address = '45, Juhu Tara Road, Juhu'
WHERE slug = 'coastal-spice';

-- 3. Punjab Grill Express (Malad West)
UPDATE providers SET 
    latitude = 19.1858, 
    longitude = 72.8487,
    operating_hours = 'Mon-Sun: 10:00 AM - 10:30 PM',
    phone = '+91 98200 12343',
    address = 'Ground Floor, Infinity Mall, Malad West'
WHERE slug = 'punjab-grill-express';

-- 4. Dragon House (Bandra West)
UPDATE providers SET 
    latitude = 19.0596, 
    longitude = 72.8295,
    operating_hours = 'Mon-Sun: 11:30 AM - 11:00 PM',
    phone = '+91 98200 12344',
    address = '23, Linking Road, Bandra West'
WHERE slug = 'dragon-house';

-- 5. South Express (Kandivali West)
UPDATE providers SET 
    latitude = 19.2045, 
    longitude = 72.8397,
    operating_hours = 'Mon-Sun: 7:00 AM - 10:00 PM',
    phone = '+91 98200 12345',
    address = '78, SV Road, Kandivali West'
WHERE slug = 'south-express';

-- 6. Royal Biryani House (Bandra West)
UPDATE providers SET 
    latitude = 19.0538, 
    longitude = 72.8263,
    operating_hours = 'Mon-Sun: 11:00 AM - 12:00 AM',
    phone = '+91 98200 12346',
    address = '56, Hill Road, Bandra West'
WHERE slug = 'royal-biryani-house';

-- 7. Pizza Paradise (Andheri West)
UPDATE providers SET 
    latitude = 19.1420, 
    longitude = 72.8387,
    operating_hours = 'Mon-Sun: 12:00 PM - 11:00 PM',
    phone = '+91 98200 12347',
    address = 'Shop 3, Oshiwara Link Road, Andheri West'
WHERE slug = 'pizza-paradise';

-- 8. Thali Junction (Goregaon West)
UPDATE providers SET 
    latitude = 19.1663, 
    longitude = 72.8491,
    operating_hours = 'Mon-Sun: 11:00 AM - 3:30 PM, 7:00 PM - 10:30 PM',
    phone = '+91 98200 12348',
    address = '12, Goregaon Link Road, Goregaon West'
WHERE slug = 'thali-junction';

-- 9. Cafe Mocha (Bandra West)
UPDATE providers SET 
    latitude = 19.0587, 
    longitude = 72.8311,
    operating_hours = 'Mon-Sun: 9:00 AM - 11:30 PM',
    phone = '+91 98200 12349',
    address = '34, Waterfield Road, Bandra West'
WHERE slug = 'cafe-mocha';

-- 10. Bombay Sandwich Corner (Dadar West)
UPDATE providers SET 
    latitude = 19.0176, 
    longitude = 72.8427,
    operating_hours = 'Mon-Sun: 8:00 AM - 11:00 PM',
    phone = '+91 98200 12350',
    address = 'Near Dadar Station, Dadar West'
WHERE slug = 'bombay-sandwich-corner';
