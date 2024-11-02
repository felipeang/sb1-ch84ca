import { BaseModel } from './base.model';
import { User } from './user.model';

export class Profile extends BaseModel {
  bio?: string;
  userId: string;
  user?: User;

  constructor(data: Partial<Profile>) {
    super(data);
    this.bio = data.bio;
    this.userId = data.userId!;
    this.user = data.user;
  }

  validate(): boolean {
    return !!this.userId;
  }

  toJSON(): object {
    return {
      id: this.id,
      bio: this.bio,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}