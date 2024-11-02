import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { PackageIcon, UsersIcon, FileTextIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to the Addon-based Application</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PackageIcon className="h-6 w-6" />
              Base Addon
            </CardTitle>
            <CardDescription>Core functionality and base models</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Provides the foundation for all other addons with base models and services.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UsersIcon className="h-6 w-6" />
              Users Addon
            </CardTitle>
            <CardDescription>User management system</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Handles user profiles and authentication.
            </p>
            <Button asChild>
              <Link href="/users">Manage Users</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileTextIcon className="h-6 w-6" />
              Posts Addon
            </CardTitle>
            <CardDescription>Content management</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Manages blog posts and content creation.
            </p>
            <Button asChild>
              <Link href="/posts">View Posts</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}