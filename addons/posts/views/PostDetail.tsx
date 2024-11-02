"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Post } from '../models/Post';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftIcon, EditIcon, TrashIcon } from 'lucide-react';

export function PostDetail() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/posts/${params.id}`)
        .then(res => res.json())
        .then(data => setPost(data));
    }
  }, [params.id]);

  if (!post) {
    return (
      <div className="container mx-auto py-8">
        <Card className="text-center p-6">
          <p>Loading...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <Button asChild variant="outline" size="icon">
              <Link href="/posts">
                <ArrowLeftIcon className="h-4 w-4" />
              </Link>
            </Button>
            <CardTitle className="flex-1">{post.title}</CardTitle>
          </div>
          <div className="text-sm text-gray-500">
            By {post.author?.name || 'Unknown'} • {new Date(post.createdAt).toLocaleDateString()}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          <div className="mt-8 flex gap-4">
            <Button asChild variant="outline">
              <Link href={`/posts/${post.id}/edit`} className="flex items-center gap-2">
                <EditIcon className="h-4 w-4" />
                Edit Post
              </Link>
            </Button>
            <Button variant="destructive" className="flex items-center gap-2">
              <TrashIcon className="h-4 w-4" />
              Delete Post
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}