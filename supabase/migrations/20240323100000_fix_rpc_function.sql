-- Update RPC function to handle missing profiles better
CREATE OR REPLACE FUNCTION public.get_published_posts_with_authors()
RETURNS TABLE (
  id uuid,
  title text,
  excerpt text,
  slug text,
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
    p.status = 'published'
  ORDER BY
    p.published_at DESC NULLS LAST;
END;
$$ LANGUAGE plpgsql; 