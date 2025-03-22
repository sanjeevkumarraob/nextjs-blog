'use client'

import { useState, useEffect } from 'react'

interface ImageProxyProps {
  src: string;
  alt?: string;
}

export default function ImageProxy({ src, alt = 'Blog image' }: ImageProxyProps) {
  const [imageSrc, setImageSrc] = useState(src)
  const [hasError, setHasError] = useState(false)
  
  useEffect(() => {
    if (src.includes('localhost:54321')) {
      // Convert to a relative URL or proxy URL
      const proxyUrl = `/api/image-proxy?url=${encodeURIComponent(src)}`;
      setImageSrc(proxyUrl);
    }
  }, [src])
  
  const handleError = () => {
    console.error('Image failed to load:', imageSrc)
    setHasError(true)
  }
  
  if (hasError) {
    return <div className="bg-gray-100 p-4 text-center rounded">Image not available</div>
  }
  
  return (
    <img 
      src={imageSrc} 
      alt={alt} 
      onError={handleError}
      className="max-w-full h-auto rounded-lg mx-auto"
    />
  )
} 