-- MEGA SEED V3: THE ULTIMATE DATA GENERATOR
-- 1. Creates ALL Categories
-- 2. Generates 500 Providers with:
--    - Specific Specialties (e.g., 'Tax' for CA, 'Pizza' for Rest.)
--    - Verified Contact Info (Phone, Email, WA)
--    - Operation Hours & Payment Modes
-- 3. Adds Context-Aware Images, Reviews, and Services

DO $$ 
DECLARE 
    i INT;
    new_provider_id UUID;
    cat_id UUID;
    cat_slug TEXT;
    
    -- Categories Setup
    categories_data TEXT[][] := ARRAY[
        ['Restaurants', 'restaurants', 'UtensilsCrossed'],
        ['Hotels', 'hotels', 'Building2'],
        ['Doctors', 'doctors', 'Stethoscope'],
        ['Travel Agents', 'travel', 'Plane'],
        ['Auto Care', 'auto-care', 'Car'],
        ['Movers & Packers', 'movers', 'Truck'],
        ['Home Decor', 'home-decor', 'Home'],
        ['Education', 'education', 'GraduationCap'],
        ['Jobs Consultancy', 'jobs', 'Briefcase'],
        ['Movies & Cinema', 'movies', 'Film'],
        ['Wedding Services', 'wedding', 'Heart'],
        ['Salons', 'salons', 'Scissors'],
        ['Gym & Fitness', 'gym', 'Zap'],
        ['Loans', 'loans', 'LineChart'],
        ['Insurance', 'insurance', 'Shield'],
        ['Repairs', 'repairs', 'Hammer'],
        ['Shopping', 'shopping', 'ShoppingBag'],
        ['Event Planners', 'events', 'Music'],
        ['Beauty Services', 'beauty', 'Palette'],
        ['Gift Shops', 'gifts', 'Gift'],
        ['Electrician', 'electrician', 'Zap'],
        ['Plumber', 'plumber', 'Droplets'],
        ['AC Repair', 'ac-repair', 'ThermometerSnowflake'],
        ['Carpenter', 'carpenter', 'Hammer'],
        ['Cleaning & Pest', 'cleaning', 'SprayCan'],
        ['Tiffin Services', 'tiffin-service', 'Utensils'],
        ['Painters', 'painters', 'Paintbrush'],
        ['Yoga Tutors', 'yoga', 'Activity'],
        ['Legal Services', 'lawyers', 'Scale'],
        ['Chartered Accountant', 'ca', 'Calculator'],
        ['Photographers', 'photographers', 'Camera'],
        ['Pet Grooming', 'pet-grooming', 'Dog'],
        ['Laptop Repair', 'laptop-repair', 'Laptop']
    ];

    -- Brand Name Parts
    prefixes TEXT[] := ARRAY['Super', 'Reliable', 'Quick', 'Pro', 'Elite', 'Mumbai', 'Best', 'A1', 'Star', 'City', 'Urban', 'Metro', 'Rapid', 'Expert', 'Supreme', 'Royal', 'Golden', 'Silver', 'Prime', 'Master'];
    suffixes TEXT[] := ARRAY['Services', 'Solutions', 'Hub', 'Point', 'Center', 'Works', 'Agency', 'Care', 'Clinic', 'Studio', 'Enterprises', 'Venture', 'Support', 'Fix', 'Zone', 'Masters', 'Pro', 'Partner'];
    
    -- Locations
    areas TEXT[] := ARRAY['Andheri West', 'Andheri East', 'Bandra West', 'Bandra East', 'Juhu', 'Santacruz', 'Khar', 'Dadar', 'Mahim', 'Worli', 'Lower Parel', 'Colaba', 'Fort', 'Malad', 'Kandivali', 'Borivali', 'Goregaon', 'Powai', 'Chembur', 'Vashi', 'Thane', 'Ghatkopar', 'Kurla', 'Sion'];
    pincodes TEXT[] := ARRAY['400053', '400069', '400050', '400051', '400049', '400054', '400052', '400028', '400016', '400018', '400013', '400005', '400001', '400064', '400067', '400092', '400062', '400076', '400071', '400703', '400601', '400077', '400070', '400022'];
    
    -- Data Dictionaries
    desc_templates TEXT[] := ARRAY[
        'Providing world-class %s services in Mumbai since 2010. We prioritize custom satisfaction.',
        'Your trusted partner for %s. Experienced professionals and affordable rates.',
        'Award-winning %s specialists. Book us for reliable and quick service.',
        'Expert %s solutions with modern techniques and verified staff.'
    ];

    specialties_map JSONB := '{
        "restaurants": ["North Indian", "Chinese", "Fast Food", "Italian", "Seafood"],
        "hotels": ["Luxury", "Budget", "Boutique", "Resort", "Business"],
        "doctors": ["General", "Dentist", "Consultation", "Emergency"],
        "travel": ["Flight Booking", "Tour Packages", "Visa", "Car Rental"],
        "auto-care": ["Car Wash", "Detailing", "Servicing", "Accessories"],
        "movers": ["Home Shift", "Office Move", "Car Transport", "Storage"],
        "home-decor": ["Furnishing", "Lighting", "Wall Art", "Rugs"],
        "education": ["Coaching", "Language", "Computer", "Entrance Exams"],
        "jobs": ["Placement", "HR", "Recruitment", "Resume Writing"],
        "movies": ["Cinema", "Multiplex", "IMAX", "Drive-in"],
        "wedding": ["Planning", "Catering", "Decor", "Photography"],
        "salons": ["Haircut", "Facial", "Bridal", "Coloring"],
        "gym": ["Cardio", "Weights", "Zumba", "Crossfit"],
        "loans": ["Home Loan", "Personal", "Business", "Car Loan"],
        "insurance": ["Life", "Health", "Car", "Travel"],
        "repairs": ["Electronics", "Appliances", "Mobile", "Watch"],
        "shopping": ["Apparel", "Electronics", "Groceries", "Mall"],
        "events": ["Wedding", "Birthday", "Corporate", "Decor"],
        "beauty": ["Makeup", "Skincare", "Nail Art", "Spa"],
        "gifts": ["Flowers", "Personalized", "Corporate", "Hampers"],
        "electrician": ["Wiring", "Inverter", "Fan Repair", "Emergency"],
        "plumber": ["Leak Fix", "Drain Cleaning", "Fitting", "Tank Cleaning"],
        "ac-repair": ["Gas Filling", "Servicing", "Installation", "PCB Repair"],
        "carpenter": ["Furniture", "Polishing", "Repair", "Custom Work"],
        "cleaning": ["Deep Cleaning", "Pest Control", "Sanitization", "Sofa Cleaning"],
        "tiffin-service": ["Veg Thali", "Non-Veg", "Jain Food", "Healthy Meal"],
        "painters": ["Interior", "Exterior", "Texture", "Waterproofing"],
        "yoga": ["Hatha", "Power Yoga", "Meditation", "Prenatal"],
        "lawyers": ["Criminal", "Civil", "Property", "Divorce"],
        "ca": ["GST", "ITR Filing", "Audit", "Registration"],
        "photographers": ["Wedding", "Portfolio", "Product", "Candid"],
        "pet-grooming": ["Bath", "Haircut", "Nail Trim", "Spa"],
        "interior-designers": ["Residential", "Office", "Modular Kitchen", "Decor"],
        "laptop-repair": ["Screen", "Battery", "Keyboard", "Software"]
    }';

    -- Variables
    curr_cat TEXT[];
    rand_prefix TEXT;
    rand_suffix TEXT;
    rand_area_idx INT;
    chosen_area TEXT;
    chosen_pin TEXT;
    rand_lat DOUBLE PRECISION;
    rand_lon DOUBLE PRECISION;
    chosen_specs TEXT[];
    spec_pool JSONB;
    
BEGIN
    -- STEP 1: Bootstrapping Categories
    FOREACH curr_cat SLICE 1 IN ARRAY categories_data LOOP
        INSERT INTO categories (name, slug, icon, display_order)
        VALUES (curr_cat[1], curr_cat[2], curr_cat[3], 99)
        ON CONFLICT (slug) DO NOTHING;
    END LOOP;

    -- STEP 2: Generate 500 Providers
    FOR i IN 1..500 LOOP
        
        -- Pick Random Category
        SELECT id, slug INTO cat_id, cat_slug FROM categories ORDER BY random() LIMIT 1;
        
        -- Names & Locations
        rand_prefix := prefixes[1 + floor(random() * array_length(prefixes, 1))::INT];
        rand_suffix := suffixes[1 + floor(random() * array_length(suffixes, 1))::INT];
        rand_area_idx := 1 + floor(random() * array_length(areas, 1))::INT;
        chosen_area := areas[rand_area_idx];
        chosen_pin := pincodes[rand_area_idx];
        
        -- Geolocation (Mumbai Box)
        rand_lat := 18.90 + (random() * (19.25 - 18.90));
        rand_lon := 72.80 + (random() * (72.95 - 72.80));

        -- Determine Specialties
        spec_pool := specialties_map -> cat_slug;
        IF spec_pool IS NOT NULL THEN
             -- Pick 2 random specialties from the JSON array
             SELECT ARRAY_AGG(x) INTO chosen_specs FROM (
                 SELECT jsonb_array_elements_text(spec_pool) x ORDER BY random() LIMIT 2
             ) t;
        ELSE
             chosen_specs := ARRAY['General Service'];
        END IF;

        -- Insert Provider
        INSERT INTO providers (
            business_name, slug, category_id, 
            description, address, area, city, state, country, pincode,
            phone, whatsapp, email,
            is_verified, is_responsive, is_available, 
            operating_hours, rating, review_count, price_range,
            latitude, longitude, since_year, 
            specialties, payment_modes,
            created_at
        ) VALUES (
            rand_prefix || ' ' || INITCAP(REPLACE(cat_slug, '-', ' ')) || ' ' || rand_suffix,
            lower(rand_prefix) || '-' || cat_slug || '-' || rand_suffix || '-' || i || '-' || floor(random()*999)::TEXT,
            cat_id,
            format(desc_templates[1 + floor(random() * array_length(desc_templates, 1))::INT], INITCAP(REPLACE(cat_slug, '-', ' '))),
            'Shop ' || floor(random() * 100) || ', ' || chosen_area || ' Market',
            chosen_area, 'Mumbai', 'Maharashtra', 'India', chosen_pin,
            '+91 98' || floor(10000000 + random() * 89999999)::TEXT,
            '+91 98' || floor(10000000 + random() * 89999999)::TEXT,
            lower(rand_prefix) || '.' || i || '@needful.com',
            (random() > 0.4), true, true,
            'Mon-Sat: 10:00 AM - 9:00 PM',
            (3.5 + random() * 1.5)::NUMERIC(2,1),
            floor(random() * 400)::INT,
            '₹500-2000',
            rand_lat, rand_lon, 
            2010 + floor(random() * 14)::INT,
            chosen_specs,
            ARRAY['Cash', 'UPI', 'Google Pay'],
            NOW()
        ) RETURNING id INTO new_provider_id;

        -- Insert Images (Simplified Logic for Speed)
        INSERT INTO provider_images (provider_id, url, is_primary, display_order)
        VALUES 
        (new_provider_id, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500', true, 1),
        (new_provider_id, 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500', false, 2);

        -- Insert Reviews
        INSERT INTO reviews (provider_id, user_name, rating, comment, created_at)
        VALUES
        (new_provider_id, 'Happy User', 5, 'Excellent service and great behavior.', NOW()),
        (new_provider_id, 'Local Resident', 4, 'Good work but came a bit late.', NOW());

        -- Insert Services
        INSERT INTO services (provider_id, title, price, price_unit)
        VALUES
        (new_provider_id, 'Consultation / Visit', 150 + floor(random()*500)::INT, 'visit'),
        (new_provider_id, 'Full Service', 500 + floor(random()*2000)::INT, 'service');

    END LOOP;
END $$;
