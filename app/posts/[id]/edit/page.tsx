"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FormView, FormField } from '@/components/views/FormView';
import { Post } from '@/addons/posts/models/Post';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/posts/${params.id}`)
        .then((res) => res.json())
        .then((data) => setPost(data));
    }
  }, [params.id]);

  const fields: FormField[] = [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      validation: { required: true, minLength: 3 },
      placeholder: 'Enter post title',
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea',
      validation: { required: true },
      placeholder: 'Write your post content here',
    },
    {
      name: 'published',
      label: 'Published',
      type: 'switch',
      description: 'Make this post visible to the public',
    },
  ];

  const handleSubmit = async (data: any) => {
    await fetch(`/api/posts/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    router.push(`/posts/${params.id}`);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
        </CardHeader>
        <CardContent>
          <FormView
            fields={fields}
            onSubmit={handleSubmit}
            initialData={{
              title: post.title,
              content: post.content,
              published: post.published,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}