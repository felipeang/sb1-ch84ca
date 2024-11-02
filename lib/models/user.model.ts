import { BaseModel } from './base.model';
import { Profile } from './profile.model';
import { Post } from './post.model';

export class User extends BaseModel {
  email: string;
  name?: string;
  profile?: Profile;
  posts: Post[];

  constructor(data: Partial<User>) {
    super(data);
    this.email = data.email!;
    this.name = data.name;
    this.profile = data.profile;
    this.posts = data.posts || [];
  }

  validate(): boolean {
    return this.email?.includes('@') ?? false;
  }

  toJSON(): object {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      profile: this.profile?.toJSON(),
      posts: this.posts.map(post => post.toJSON()),
    };
  }
}