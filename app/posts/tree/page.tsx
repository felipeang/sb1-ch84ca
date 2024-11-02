"use client";

import { useEffect, useState } from 'react';
import { TreeView } from '@/components/views/TreeView';
import { Post } from '@/addons/posts/models/Post';
import { useRouter } from 'next/navigation';

export default function PostTreePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data: Post[]) => setPosts(data));
  }, []);

  const treeData = [
    {
      id: 'root',
      label: 'Posts',
      type: 'folder',
      children: posts.map((post) => ({
        id: post.id,
        label: post.title,
        type: 'file',
      })),
    },
  ];

  const handleSelect = (node: any) => {
    if (node.type === 'file') {
      router.push(`/posts/${node.id}`);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Post Tree View</h1>
      <div className="bg-background border rounded-lg p-4">
        <TreeView data={treeData} onSelect={handleSelect} />
      </div>
    </div>
  );
}