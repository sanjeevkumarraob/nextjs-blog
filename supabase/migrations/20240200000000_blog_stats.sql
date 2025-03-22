create or replace function get_blog_stats()
returns json
language plpgsql
security definer
as $$
declare
  total_posts integer;
  total_views integer;
  total_comments integer;
  engagement_rate float;
begin
  -- Get total posts
  select count(*) into total_posts from posts where status = 'published';
  
  -- Get total views
  select coalesce(sum(view_count), 0) into total_views from posts;
  
  -- Get total comments
  select count(*) into total_comments from comments;
  
  -- Calculate engagement rate (comments per post)
  engagement_rate := case 
    when total_posts > 0 then total_comments::float / total_posts 
    else 0 
  end;
  
  return json_build_object(
    'total_posts', total_posts,
    'total_views', total_views,
    'total_comments', total_comments,
    'engagement_rate', engagement_rate
  );
end;
$$; 