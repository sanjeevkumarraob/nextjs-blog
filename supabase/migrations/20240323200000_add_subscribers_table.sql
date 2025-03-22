CREATE TABLE public.subscribers (
  id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed BOOLEAN DEFAULT FALSE,
  confirm_token UUID DEFAULT extensions.uuid_generate_v4()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Enable insert for authenticated users" 
  ON public.subscribers FOR INSERT 
  WITH CHECK (true);

-- Create policy for anon users (optional if you want people to subscribe without being logged in)
CREATE POLICY "Enable insert for anonymous users" 
  ON public.subscribers FOR INSERT 
  WITH CHECK (true); 