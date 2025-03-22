export type Profile = {
  id: string;
  created_at: string;
  updated_at: string;
  username: string;
  full_name?: string | null;
  avatar_url?: string | null;
  bio?: string | null;
  website?: string | null;
}; 