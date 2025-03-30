-- Create posts_tags junction table if it doesn't exist
CREATE TABLE IF NOT EXISTS posts_tags (
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Add RLS policies for posts_tags
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

-- Add tag associations for existing posts
INSERT INTO posts_tags (post_id, tag_id)
SELECT 
  p.id as post_id,
  t.id as tag_id
FROM 
  posts p
  CROSS JOIN tags t
WHERE 
  p.title ILIKE '%' || t.name || '%'
  OR p.content ILIKE '%' || t.name || '%';

-- Update the posts table to use the new tag system
UPDATE posts SET tags = array(
  SELECT t.name
  FROM posts_tags pt
  JOIN tags t ON t.id = pt.tag_id
  WHERE pt.post_id = posts.id
);