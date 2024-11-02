import { NextResponse } from 'next/server';

// Temporary mock data until we implement the database
const mockPosts = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    content: 'Next.js is a powerful framework for building React applications...',
    authorId: '1',
    author: {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Understanding TypeScript',
    content: 'TypeScript adds static typing to JavaScript, making it more robust...',
    authorId: '2',
    author: {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = mockPosts.find(p => p.id === params.id);
  
  if (!post) {
    return new NextResponse('Post not found', { status: 404 });
  }

  return NextResponse.json(post);
}