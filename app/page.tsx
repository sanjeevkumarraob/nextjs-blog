import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Clock, Users, Zap } from 'lucide-react'
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

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies })
  
  // Fetch featured posts for the hero section
  const { data: featuredPosts } = await supabase
    .from('posts')
    .select(`
      id,
      title,
      excerpt,
      slug,
      published_at,
      profiles(username)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3)
  
  // Transform the data to match our Post interface
  const posts = featuredPosts?.map(post => {
    // Correctly handle the profiles data, as it might be an array
    const profileData = Array.isArray(post.profiles) 
      ? post.profiles[0] 
      : post.profiles;
    
    return {
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      published_at: post.published_at,
      author: profileData ? {
        username: profileData.username,
        full_name: null
      } : null
    };
  }) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with vibrant gradient */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-secondary/10 to-accent/5 z-0"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="container max-w-5xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-secondary">
            Discover the World of APIs and Development
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 mb-10 max-w-3xl mx-auto">
            Practical guides, tutorials, and insights to help you build better software
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white" asChild>
              <Link href="/blog">
                Browse Articles <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Posts with colorful cards */}
      <section className="py-20">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-800">Latest Articles</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-12"></div>
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div 
                key={post.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border-t-4 border-primary"
                style={{ 
                  borderTopColor: index % 3 === 0 ? '#4F46E5' : index % 3 === 1 ? '#06B6D4' : '#F97316',
                  transform: `translateY(0px)`,
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0px)')}
              >
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <div className="text-sm text-muted-foreground mb-4 flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-secondary" />
                    {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                    <span className="mx-2">•</span>
                    <span>By {post.author?.username || 'Unknown'}</span>
                  </div>
                  <div 
                    className="line-clamp-3 text-slate-600"
                    dangerouslySetInnerHTML={{ __html: post.excerpt || '' }}
                  />
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary-600 mt-4 hover:underline"
                  >
                    Read More <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10" asChild>
              <Link href="/blog">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section with colorful icons */}
      <section className="py-20 bg-gradient-to-b from-white to-muted/30">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-slate-800">Why Read Our Blog?</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-12"></div>
          <p className="text-xl text-slate-600 text-center mb-12 max-w-3xl mx-auto">
            Practical knowledge and insights to help you excel in software development
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center">
                <Zap className="h-8 w-8 text-primary-600" />
              </div>}
              title="Practical Guides"
              description="Step-by-step tutorials and guides that you can implement immediately in your projects."
            />
            <FeatureCard 
              icon={<div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-secondary" />
              </div>}
              title="In-depth Knowledge"
              description="Deep dives into complex topics, broken down into understandable concepts."
            />
            <FeatureCard 
              icon={<div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="h-8 w-8 text-accent" />
              </div>}
              title="Community Insights"
              description="Learn from real-world experiences and best practices from the developer community."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section with vibrant gradient */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary"></div>
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute left-0 top-0 h-full" viewBox="0 0 150 350" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M-31.2,153.1C-13.9,189.4,39.7,231.3,75.2,231.5c35.5,0.2,52.9-41.3,70.3-74.1c17.5-32.8,35-56.8,48.7-96.4c13.7-39.6,23.5-94.7-10-119.3c-33.5-24.5-110.2-18.4-150.6,4.1c-40.4,22.6-44.4,61.6-48.1,106.8C-18.3,98,12.8,135.8-3.4,150.1C-19.5,164.3,-48.5,116.8,-31.2,153.1z"/>
          </svg>
          <svg className="absolute right-0 bottom-0 h-full" viewBox="0 0 150 350" xmlns="http://www.w3.org/2000/svg">
            <path fill="white" d="M183.2,153.1C165.9,189.4,112.3,231.3,76.8,231.5c-35.5,0.2-52.9-41.3-70.3-74.1c-17.5-32.8-35-56.8-48.7-96.4c-13.7-39.6-23.5-94.7,10-119.3c33.5-24.5,110.2-18.4,150.6,4.1c40.4,22.6,44.4,61.6,48.1,106.8c3.7,45.2-27.4,83-11.2,97.3C171.5,164.3,200.5,116.8,183.2,153.1z"/>
          </svg>
        </div>
        <div className="container max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to dive deeper?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Explore our collection of articles, guides, and tutorials to level up your development skills.
          </p>
          <Button size="lg" className="bg-white text-primary-600 hover:bg-white/90" asChild>
            <Link href="/blog">Start Reading</Link>
          </Button>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <NewsletterForm />
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