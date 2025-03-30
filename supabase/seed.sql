-- Insert sample tags
INSERT INTO tags (name, slug) VALUES
    ('Next.js', 'nextjs'),
    ('React', 'react'),
    ('TypeScript', 'typescript');

-- Note: You'll need to insert actual user IDs after creating them through auth 

-- Insert sample posts (replace 'your-user-id' with an actual user ID)
INSERT INTO posts (title, slug, content, excerpt, status, author_id, published_at, tags) VALUES
    (
        'Getting Started with Next.js 13',
        'getting-started-with-nextjs-13',
        'Next.js 13 introduces several groundbreaking features that revolutionize how we build React applications...',
        'An introduction to the new features in Next.js 13',
        'published',
        auth.uid(),
        NOW(),
        ARRAY['Next.js', 'React']
    ),
    (
        'TypeScript Best Practices',
        'typescript-best-practices',
        'TypeScript enhances your development experience by adding static types to JavaScript...',
        'Learn the best practices for writing TypeScript code',
        'published',
        auth.uid(),
        NOW(),
        ARRAY['TypeScript']
    ),
    (
        'Building a Blog with Next.js and Supabase',
        'building-blog-nextjs-supabase',
        'Learn how to create a full-featured blog using Next.js and Supabase...',
        'A complete guide to building a blog with Next.js and Supabase',
        'published',
        auth.uid(),
        NOW(),
        ARRAY['Next.js', 'React', 'TypeScript']
    ); 