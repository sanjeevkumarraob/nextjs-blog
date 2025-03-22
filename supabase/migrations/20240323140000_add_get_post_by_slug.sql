-- Function to get a post by slug
CREATE OR REPLACE FUNCTION public.get_post_by_slug(post_slug VARCHAR)
RETURNS TABLE (
  id uuid,
  title varchar,
  content text,
  excerpt text,
  slug varchar,
  created_at timestamp with time zone,
  published_at timestamp with time zone,
  tags text[],
  author json
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id, 
    p.title, 
    p.content,
    p.excerpt, 
    p.slug, 
    p.created_at, 
    p.published_at, 
    p.tags,
    COALESCE(
      json_build_object(
        'username', pr.username,
        'full_name', pr.full_name
      ),
      json_build_object(
        'username', 'Unknown',
        'full_name', null
      )
    ) as author
  FROM 
    posts p
  LEFT JOIN 
    profiles pr ON p.author_id = pr.id
  WHERE 
    p.slug = post_slug
    AND p.status = 'published';
END;
$$ LANGUAGE plpgsql; 