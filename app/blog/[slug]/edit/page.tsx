import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { BlogEditor } from '@/components/blog/BlogEditor'

export default async function EditPostPage({
  params
}: {
  params: { slug: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('author_id', user.id)
    .single()

  if (!post) notFound()

  return <BlogEditor post={post} />
} 