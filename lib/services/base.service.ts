import { prisma } from '@/lib/prisma';
import { BaseModel } from '@/lib/models/base.model';

export abstract class BaseService<T extends BaseModel> {
  protected abstract modelName: string;

  async findAll(): Promise<T[]> {
    const items = await (prisma as any)[this.modelName].findMany();
    return items.map((item: any) => this.createInstance(item));
  }

  async findById(id: string): Promise<T | null> {
    const item = await (prisma as any)[this.modelName].findUnique({
      where: { id },
    });
    return item ? this.createInstance(item) : null;
  }

  async create(data: Partial<T>): Promise<T> {
    const item = await (prisma as any)[this.modelName].create({
      data,
    });
    return this.createInstance(item);
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const item = await (prisma as any)[this.modelName].update({
      where: { id },
      data,
    });
    return this.createInstance(item);
  }

  async delete(id: string): Promise<T> {
    const item = await (prisma as any)[this.modelName].delete({
      where: { id },
    });
    return this.createInstance(item);
  }

  protected abstract createInstance(data: any): T;
}