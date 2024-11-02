export abstract class BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<BaseModel>) {
    this.id = data.id!;
    this.createdAt = data.createdAt!;
    this.updatedAt = data.updatedAt!;
  }

  abstract validate(): boolean;
  abstract toJSON(): object;
}

export interface IBaseService<T extends BaseModel> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<T>;
}