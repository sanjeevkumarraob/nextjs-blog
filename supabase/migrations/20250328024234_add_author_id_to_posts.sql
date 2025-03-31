set check_function_bodies = off;

-- Drop the existing function first
DROP FUNCTION IF EXISTS public.get_published_posts_with_authors();

CREATE OR REPLACE FUNCTION public.get_published_posts_with_authors()
 RETURNS TABLE(id uuid, title character varying, excerpt text, slug character varying, created_at timestamp with time zone, published_at timestamp with time zone, tags text[], author json, author_id uuid)
 LANGUAGE plpgsql
AS $function$
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
$function$
;


