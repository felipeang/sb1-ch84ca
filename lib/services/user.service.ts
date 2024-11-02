import { User } from '@/lib/models/user.model';
import { BaseService } from './base.service';
import { prisma } from '@/lib/prisma';

export class UserService extends BaseService<User> {
  protected modelName = 'user';

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        profile: true,
        posts: true,
      },
    });
    return user ? this.createInstance(user) : null;
  }

  protected createInstance(data: any): User {
    return new User(data);
  }
}