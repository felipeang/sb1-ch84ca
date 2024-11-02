import { BaseModel } from '@/addons/base/models/BaseModel';
import { User } from '@/addons/users/models/User';

export class Post extends BaseModel {
  title: string;
  content: string;
  authorId: string;
  author?: User;

  constructor(data: Partial<Post>) {
    super(data);
    this.title = data.title!;
    this.content = data.content!;
    this.authorId = data.authorId!;
    this.author = data.author;
  }

  validate(): boolean {
    return Boolean(this.title && this.content && this.authorId);
  }

  toJSON(): object {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      authorId: this.authorId,
      author: this.author?.toJSON(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}