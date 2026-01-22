-- Business Stories Schema
-- Instagram-style stories feature for businesses to promote offers and products
-- Stories expire after 24 hours and are visible based on location

-- ============================================================================
-- BUSINESS STORIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS business_stories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
    
    -- Media information
    media_url TEXT NOT NULL,
    media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
    thumbnail_url TEXT, -- For video thumbnails
    
    -- Story content
    caption TEXT,
    
    -- Metadata
    view_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours'),
    
    -- Constraints
    CONSTRAINT caption_length CHECK (LENGTH(caption) <= 200)
);

-- ============================================================================
-- STORY VIEWS TABLE (Analytics)
-- ============================================================================
CREATE TABLE IF NOT EXISTS story_views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    story_id UUID NOT NULL REFERENCES business_stories(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL, -- NULL for anonymous viewers
    viewer_ip TEXT, -- For anonymous tracking
    
    -- Timestamps
    viewed_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Prevent duplicate views
    UNIQUE(story_id, user_id),
    UNIQUE(story_id, viewer_ip)
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
-- Index for fetching active stories by provider
CREATE INDEX IF NOT EXISTS idx_business_stories_provider_id 
    ON business_stories(provider_id);

-- Index for filtering active, non-expired stories
CREATE INDEX IF NOT EXISTS idx_business_stories_active 
    ON business_stories(is_active, expires_at DESC);

-- Index for sorting by creation time
CREATE INDEX IF NOT EXISTS idx_business_stories_created_at 
    ON business_stories(created_at DESC);

-- Index for view analytics
CREATE INDEX IF NOT EXISTS idx_story_views_story_id 
    ON story_views(story_id);

CREATE INDEX IF NOT EXISTS idx_story_views_user_id 
    ON story_views(user_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================
ALTER TABLE business_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE story_views ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active, non-expired stories
CREATE POLICY "Anyone can view active stories"
    ON business_stories FOR SELECT
    USING (
        is_active = true 
        AND expires_at > NOW()
    );

-- Policy: Business owners can create stories for their businesses
CREATE POLICY "Business owners can create stories"
    ON business_stories FOR INSERT
    WITH CHECK (
        provider_id IN (
            SELECT id FROM providers WHERE user_id = auth.uid()
        )
    );

-- Policy: Business owners can update their own stories
CREATE POLICY "Business owners can update their stories"
    ON business_stories FOR UPDATE
    USING (
        provider_id IN (
            SELECT id FROM providers WHERE user_id = auth.uid()
        )
    );

-- Policy: Business owners can delete their own stories
CREATE POLICY "Business owners can delete their stories"
    ON business_stories FOR DELETE
    USING (
        provider_id IN (
            SELECT id FROM providers WHERE user_id = auth.uid()
        )
    );

-- Policy: Anyone can view story analytics (for public view counts)
CREATE POLICY "Anyone can view story views"
    ON story_views FOR SELECT
    USING (true);

-- Policy: Anyone can create a story view (logged in or anonymous)
CREATE POLICY "Anyone can record story views"
    ON story_views FOR INSERT
    WITH CHECK (true);

-- ============================================================================
-- HELPER FUNCTION: Auto-expire old stories
-- ============================================================================
-- This function marks stories as inactive after 24 hours
CREATE OR REPLACE FUNCTION expire_old_stories()
RETURNS void AS $$
BEGIN
    UPDATE business_stories
    SET is_active = false
    WHERE is_active = true 
    AND expires_at <= NOW();
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGER: Update view count when a view is recorded
-- ============================================================================
CREATE OR REPLACE FUNCTION increment_story_view_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE business_stories
    SET view_count = view_count + 1
    WHERE id = NEW.story_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_story_views
    AFTER INSERT ON story_views
    FOR EACH ROW
    EXECUTE FUNCTION increment_story_view_count();

-- ============================================================================
-- COMMENTS
-- ============================================================================
COMMENT ON TABLE business_stories IS 'Instagram-style stories for businesses to promote offers and products. Stories expire after 24 hours.';
COMMENT ON TABLE story_views IS 'Tracks views of business stories for analytics and engagement metrics.';
COMMENT ON COLUMN business_stories.expires_at IS 'Stories automatically expire 24 hours after creation';
COMMENT ON COLUMN business_stories.caption IS 'Story caption, max 200 characters';

-- ============================================================================
-- VERIFICATION
-- ============================================================================
SELECT 'Business stories schema created successfully!' as status;
SELECT 'Tables created: business_stories, story_views' as info;
