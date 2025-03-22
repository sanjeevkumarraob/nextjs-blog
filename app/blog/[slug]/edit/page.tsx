import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { BlogEditor } from "@/components/blog/BlogEditor";
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const supabase = createServerComponentClient({ cookies });
  const { slug } = await params;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("author_id", user.id)
    .single();

  if (!post) notFound();

  return <BlogEditor post={post} />;
}
