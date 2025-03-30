import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import BlogPostContent from '@/components/blog/BlogPostContent'

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
  // console.log("Fetching post with slug:", slug)

  // Use your RPC function
  const { data: postData, error: rpcError } = await supabase.rpc(
    'get_post_by_slug',
    { post_slug: slug }
  );

  if (rpcError) {
    console.error("RPC Error:", rpcError)
  }

  // console.log("Post data from RPC:", postData)

  // Fallback to direct query if RPC fails
  if (!postData || postData.length === 0) {
    // Try direct query with separate author fetch
    const { data: post, error } = await supabase
      .from('posts')
      .select('*, author_id')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !post) {
      console.error("Error fetching post:", error)
      notFound()
    }

    // Get author separately
    const { data: authorData } = await supabase
      .from('profiles')
      .select('username, full_name')
      .eq('id', post.author_id)
      .single();
      
    // Add author to post
    post.author = authorData || { username: 'Unknown', full_name: null };
    
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`

    return <BlogPostContent post={post} url={url} />;
  }

  // If RPC succeeded, use that data
  const post = postData[0];
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`

  return <BlogPostContent post={post} url={url} />;
} 