"use client";

import { useEffect, useState } from 'react';
import { Post } from '../models/Post';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Button asChild>
          <Link href="/posts/new" className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4 line-clamp-3">
                {post.content}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  By {post.author?.name || 'Unknown'}
                </span>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/posts/${post.id}`}>Read More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <Card className="text-center p-6">
          <p className="text-gray-500 mb-4">No posts found</p>
          <Button asChild>
            <Link href="/posts/new">Create Your First Post</Link>
          </Button>
        </Card>
      )}
    </div>
  );
}