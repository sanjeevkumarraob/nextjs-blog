'use client'

import { FC } from 'react'
import { Twitter, Facebook, Linkedin } from 'lucide-react'
import { Button } from "../ui/button"
import { BlogPost } from '@/types/blog'

interface ShareButtonsProps {
  post: BlogPost
  url: string
}

const ShareButtons: FC<ShareButtonsProps> = ({ post, url }) => {
  const title = post.title;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || '');

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
  };

  const shareOnLinkedin = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Share this post:</h3>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={shareOnTwitter}>
          <Twitter className="h-4 w-4 mr-2" />
          <span>Twitter</span>
        </Button>
        
        <Button variant="outline" size="sm" onClick={shareOnFacebook}>
          <Facebook className="h-4 w-4 mr-2" />
          <span>Facebook</span>
        </Button>
        
        <Button variant="outline" size="sm" onClick={shareOnLinkedin}>
          <Linkedin className="h-4 w-4 mr-2" />
          <span>LinkedIn</span>
        </Button>
      </div>
    </div>
  );
};

export default ShareButtons; 