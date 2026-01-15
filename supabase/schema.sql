-- LocalServe Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('customer', 'provider', 'admin');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  city TEXT,
  role user_role DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);

-- Providers table
CREATE TABLE IF NOT EXISTS providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  address TEXT,
  city TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  is_responsive BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  operating_hours TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  price_unit TEXT DEFAULT 'session',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Provider images table
CREATE TABLE IF NOT EXISTS provider_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, provider_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_providers_category ON providers(category_id);
CREATE INDEX IF NOT EXISTS idx_providers_city ON providers(city);
CREATE INDEX IF NOT EXISTS idx_providers_rating ON providers(rating DESC);
CREATE INDEX IF NOT EXISTS idx_providers_slug ON providers(slug);
CREATE INDEX IF NOT EXISTS idx_services_provider ON services(provider_id);
CREATE INDEX IF NOT EXISTS idx_reviews_provider ON reviews(provider_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);

-- Row Level Security Policies

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Categories: Public read
CREATE POLICY "Categories are viewable by everyone" ON categories
  FOR SELECT USING (true);

-- Providers: Public read, owner update
CREATE POLICY "Providers are viewable by everyone" ON providers
  FOR SELECT USING (true);

CREATE POLICY "Providers can update own listing" ON providers
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can create provider listing" ON providers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Services: Public read, provider owner update
CREATE POLICY "Services are viewable by everyone" ON services
  FOR SELECT USING (true);

CREATE POLICY "Provider owners can manage services" ON services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM providers 
      WHERE providers.id = services.provider_id 
      AND providers.user_id = auth.uid()
    )
  );

-- Provider images: Public read, provider owner manage
CREATE POLICY "Provider images are viewable by everyone" ON provider_images
  FOR SELECT USING (true);

CREATE POLICY "Provider owners can manage images" ON provider_images
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM providers 
      WHERE providers.id = provider_images.provider_id 
      AND providers.user_id = auth.uid()
    )
  );

-- Reviews: Public read, authenticated create
CREATE POLICY "Reviews are viewable by everyone" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Favorites: User owns their favorites
CREATE POLICY "Users can view own favorites" ON favorites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites" ON favorites
  FOR ALL USING (auth.uid() = user_id);

-- Users: Users can view/update own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update provider rating
CREATE OR REPLACE FUNCTION public.update_provider_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE providers
  SET 
    rating = (SELECT ROUND(AVG(rating)::numeric, 1) FROM reviews WHERE provider_id = NEW.provider_id),
    review_count = (SELECT COUNT(*) FROM reviews WHERE provider_id = NEW.provider_id)
  WHERE id = NEW.provider_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update rating on review
DROP TRIGGER IF EXISTS on_review_created ON reviews;
CREATE TRIGGER on_review_created
  AFTER INSERT OR UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_provider_rating();
