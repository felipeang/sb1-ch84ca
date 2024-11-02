"use client";

import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, FolderIcon, FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  type?: 'folder' | 'file';
}

interface TreeViewProps {
  data: TreeNode[];
  onSelect?: (node: TreeNode) => void;
}

export function TreeView({ data, onSelect }: TreeViewProps) {
  return (
    <div className="w-full">
      {data.map((node) => (
        <TreeNode key={node.id} node={node} level={0} onSelect={onSelect} />
      ))}
    </div>
  );
}

function TreeNode({ node, level, onSelect }: { node: TreeNode; level: number; onSelect?: (node: TreeNode) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const type = node.type || (hasChildren ? 'folder' : 'file');

  return (
    <div>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 hover:bg-accent px-2 py-1.5 h-auto",
          level > 0 && `ml-${level * 4}`
        )}
        onClick={() => {
          if (hasChildren) {
            setIsExpanded(!isExpanded);
          }
          onSelect?.(node);
        }}
      >
        {hasChildren ? (
          isExpanded ? (
            <ChevronDownIcon className="h-4 w-4" />
          ) : (
            <ChevronRightIcon className="h-4 w-4" />
          )
        ) : (
          <span className="w-4" />
        )}
        {type === 'folder' ? (
          <FolderIcon className="h-4 w-4 text-blue-500" />
        ) : (
          <FileIcon className="h-4 w-4 text-gray-500" />
        )}
        <span className="truncate">{node.label}</span>
      </Button>
      
      {isExpanded && hasChildren && (
        <div className="ml-4">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}