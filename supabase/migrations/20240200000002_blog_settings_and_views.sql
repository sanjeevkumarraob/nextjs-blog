-- Create blog_settings table
CREATE TABLE IF NOT EXISTS blog_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_title TEXT,
  blog_description TEXT,
  enable_comments BOOLEAN DEFAULT true,
  enable_newsletter BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create post_views table
CREATE TABLE IF NOT EXISTS post_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  viewer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Add view_count to posts if not already added
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- Add tags array to posts table
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Create RLS policies for blog_settings
ALTER TABLE blog_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog settings are viewable by everyone"
  ON blog_settings FOR SELECT
  USING (true);

CREATE POLICY "Blog settings can be modified by authenticated users"
  ON blog_settings FOR ALL
  USING (auth.role() = 'authenticated');

-- Create RLS policies for post_views
ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Post views are viewable by everyone"
  ON post_views FOR SELECT
  USING (true);

CREATE POLICY "Post views can be created by anyone"
  ON post_views FOR INSERT
  WITH CHECK (true);

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE posts
  SET view_count = view_count + 1
  WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to increment view count
DROP TRIGGER IF EXISTS increment_post_view_count ON post_views;
CREATE TRIGGER increment_post_view_count
  AFTER INSERT ON post_views
  FOR EACH ROW
  EXECUTE FUNCTION increment_view_count(); 