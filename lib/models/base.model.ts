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