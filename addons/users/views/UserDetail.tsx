"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { User } from '../models/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UserDetail() {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/users/${params.id}`)
        .then(res => res.json())
        .then(data => setUser(data));
    }
  }, [params.id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{user.name || user.email}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{user.email}</p>
            </div>
            {user.profile && (
              <div>
                <h3 className="font-semibold">Bio</h3>
                <p>{user.profile.bio}</p>
              </div>
            )}
            {user.posts && user.posts.length > 0 && (
              <div>
                <h3 className="font-semibold">Posts</h3>
                <ul className="list-disc pl-5">
                  {user.posts.map(post => (
                    <li key={post.id}>
                      <Link href={`/posts/${post.id}`} className="text-blue-500 hover:underline">
                        {post.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-6 space-x-4">
            <Button asChild variant="outline">
              <Link href="/users">Back to Users</Link>
            </Button>
            <Button asChild>
              <Link href={`/users/${user.id}/edit`}>Edit User</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}