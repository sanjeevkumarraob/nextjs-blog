-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create posts_tags junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS posts_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Add is_autosave column to posts
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS is_autosave BOOLEAN DEFAULT false;

-- Update posts table to ensure all required columns exist
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS excerpt TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;

-- Create RLS policies for tags
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tags are viewable by everyone"
  ON tags FOR SELECT
  USING (true);

CREATE POLICY "Tags can be created by authenticated users"
  ON tags FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Create RLS policies for posts_tags
ALTER TABLE posts_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts tags are viewable by everyone"
  ON posts_tags FOR SELECT
  USING (true);

CREATE POLICY "Posts tags can be modified by post author"
  ON posts_tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM posts 
      WHERE posts.id = post_id 
      AND posts.author_id = auth.uid()
    )
  ); 