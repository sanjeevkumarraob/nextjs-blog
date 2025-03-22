'use client'

import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { MoreHorizontal, Eye, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import type { BlogPost } from '@/types/blog'

interface PostPreviewProps {
  post: BlogPost
  onDelete?: (id: string) => void
}

export function PostPreview({ post, onDelete }: PostPreviewProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.author?.avatar_url || ''} />
            <AvatarFallback>{post.author?.username?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{post.author?.username}</h4>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
            </p>
          </div>
        </div>
        {onDelete && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Link href={`/blog/edit/${post.slug}`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => onDelete(post.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent>
        <Link href={`/blog/${post.slug}`} className="space-y-3">
          <h3 className="font-semibold text-xl hover:text-primary">{post.title}</h3>
          <p className="text-muted-foreground">{post.excerpt}</p>
        </Link>
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags?.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-muted-foreground text-sm">
        <div className="flex space-x-4">
          <span className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            {post.view_count || 0}
          </span>
          <span className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-1" />
            {post.comment_count || 0}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}

export function PostPreviewSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-24" />
      </CardFooter>
    </Card>
  )
} 