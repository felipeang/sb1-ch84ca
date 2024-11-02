"use client";

import { useEffect, useState } from 'react';
import { User } from '../models/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <Button asChild>
          <Link href="/users/new">Add User</Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map(user => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>{user.name || user.email}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{user.email}</p>
              <div className="mt-4">
                <Button asChild variant="outline">
                  <Link href={`/users/${user.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}