import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import PostForm from '@/components/blog/PostForm'

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const supabase = createServerComponentClient({ cookies })
  const { slug } = await params;
  
  // Get the post with its tags
  const { data: post } = await supabase
    .from('posts')
    .select(`
      *,
      tags:posts_tags(
        tag:tags(
          id,
          name,
          slug
        )
      )
    `)
    .eq('slug', slug)
    .single()

  if (!post) {
    notFound()
  }

  // Transform the tags data into the format expected by PostForm
  const transformedPost = {
    ...post,
    tags: post.tags?.map((t: any) => t.tag.name) || []
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
        <PostForm post={transformedPost} />
      </div>
    </div>
  )
} 