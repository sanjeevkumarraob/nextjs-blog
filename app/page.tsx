import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Code2, Youtube, Lightbulb, Users, Zap, Mail } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ReactNode } from 'react'
import NewsletterForm from '@/components/NewsletterForm'

interface Post {
  id: string
  title: string
  excerpt: string
  slug: string
  published_at: string
  author: {
    username: string | null
    full_name: string | null
  } | null
}

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: latestPosts } = await supabase
    .from('posts')
    .select(`
      *,
      author:profiles(username, full_name)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary via-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-grid-white/15" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Exploring Technology, Sharing Knowledge
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Join me on a journey through software development, DevOps, and emerging technologies. 
              Let's learn, build, and grow together.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/blog">
                  Read Articles
                  <BookOpen className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border-white/20" asChild>
                <Link href="/about">
                  About Me
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What I Share</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100 hover:border-primary/20 hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Code2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Technical Articles</h3>
              <p className="text-slate-600">
                In-depth tutorials, code examples, and best practices for modern web development.
              </p>
            </div>
            <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100 hover:border-primary/20 hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Youtube className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Video Content</h3>
              <p className="text-slate-600">
                Video tutorials and live coding sessions to help you learn better.
              </p>
            </div>
            <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all border border-slate-100 hover:border-primary/20 hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Learning Resources</h3>
              <p className="text-slate-600">
                Curated resources, tips, and tricks from my learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Latest Articles</h2>
            <Button variant="outline" className="hover:bg-primary hover:text-white transition-colors" asChild>
              <Link href="/blog">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {latestPosts?.map((post) => (
              <article key={post.id} className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-slate-100 hover:border-primary/20 hover:-translate-y-1">
                <div className="p-8">
                  <div className="flex items-center text-sm text-slate-600 mb-4">
                    <span>{post.author?.username || 'Unknown'}</span>
                    <span className="mx-2">•</span>
                    <span>{formatDistanceToNow(new Date(post.published_at || post.created_at))} ago</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag: string) => (
                      <span key={tag} className="text-xs bg-primary/5 text-primary px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-primary to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_100%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-12">
              <Mail className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-white">Never Miss an Update</h2>
            <p className="text-xl mb-8 text-white/90">
              Subscribe to get the latest articles, videos, and resources delivered straight to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-slate-600">
            Explore our collection of articles and start your learning journey today.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/blog">
              Start Reading
              <Zap className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

// Fix the FeatureCard component to work with the new design
function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
} 