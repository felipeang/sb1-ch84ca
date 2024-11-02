"use client";

import { useEffect, useState } from 'react';
import { KanbanView, KanbanColumn } from '@/components/views/KanbanView';
import { Post } from '@/addons/posts/models/Post';

export default function PostKanbanPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [columns, setColumns] = useState<KanbanColumn[]>([
    { id: 'draft', title: 'Draft', items: [] },
    { id: 'review', title: 'In Review', items: [] },
    { id: 'published', title: 'Published', items: [] },
  ]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data: Post[]) => {
        const updatedColumns = columns.map((col) => ({
          ...col,
          items: data
            .filter((post) => {
              if (col.id === 'published') return post.published;
              if (col.id === 'draft') return !post.published;
              return false;
            })
            .map((post) => ({
              id: post.id,
              content: (
                <div>
                  <h3 className="font-medium">{post.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    By {post.author?.name || 'Unknown'}
                  </p>
                </div>
              ),
            })),
        }));
        setColumns(updatedColumns);
        setPosts(data);
      });
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceCol = columns.find((col) => col.id === result.source.droppableId);
    const destCol = columns.find((col) => col.id === result.destination.droppableId);

    if (!sourceCol || !destCol) return;

    const sourceItems = Array.from(sourceCol.items);
    const destItems = Array.from(destCol.items);
    const [removed] = sourceItems.splice(result.source.index, 1);
    destItems.splice(result.destination.index, 0, removed);

    setColumns(
      columns.map((col) => {
        if (col.id === result.source.droppableId) {
          return { ...col, items: sourceItems };
        }
        if (col.id === result.destination.droppableId) {
          return { ...col, items: destItems };
        }
        return col;
      })
    );

    // Update post status in the backend
    const post = posts.find((p) => p.id === removed.id);
    if (post) {
      fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          published: result.destination.droppableId === 'published',
        }),
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Post Management Board</h1>
      <KanbanView columns={columns} onDragEnd={handleDragEnd} />
    </div>
  );
}