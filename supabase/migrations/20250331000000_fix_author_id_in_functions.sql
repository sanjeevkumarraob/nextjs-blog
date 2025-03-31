-- Drop both functions first
DROP FUNCTION IF EXISTS public.get_published_posts_with_authors();
DROP FUNCTION IF EXISTS public.get_post_by_slug(VARCHAR);

-- Recreate get_published_posts_with_authors with author_id
CREATE OR REPLACE FUNCTION public.get_published_posts_with_authors()
RETURNS TABLE (
  id uuid,
  title varchar,
  excerpt text,
  slug varchar,
  created_at timestamp with time zone,
  published_at timestamp with time zone,
  tags text[],
  author json,
  author_id uuid
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
    ) as author,
    p.author_id
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

-- Recreate get_post_by_slug with author_id
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
  author json,
  author_id uuid
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
    ) as author,
    p.author_id
  FROM 
    posts p
  LEFT JOIN 
    profiles pr ON p.author_id = pr.id
  WHERE 
    p.slug = post_slug
    AND p.status = 'published';
END;
$$ LANGUAGE plpgsql; 