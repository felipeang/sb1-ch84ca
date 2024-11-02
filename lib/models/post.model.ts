import { BaseModel } from './base.model';
import { User } from './user.model';

export class Post extends BaseModel {
  title: string;
  content?: string;
  published: boolean;
  authorId: string;
  author?: User;

  constructor(data: Partial<Post>) {
    super(data);
    this.title = data.title!;
    this.content = data.content;
    this.published = data.published ?? false;
    this.authorId = data.authorId!;
    this.author = data.author;
  }

  validate(): boolean {
    return !!this.title && !!this.authorId;
  }

  toJSON(): object {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      published: this.published,
      authorId: this.authorId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      author: this.author?.toJSON(),
    };
  }
}