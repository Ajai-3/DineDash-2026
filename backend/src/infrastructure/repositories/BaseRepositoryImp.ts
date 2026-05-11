import { injectable } from 'inversify';
import { IBaseRepository } from '../../core/repositories/IBaseRepository';


import { PaginatedResponse } from '../../types/PaginatedResponse';

export interface IPrismaDelegate<T> {
  findUnique(args: { where: { id: string } }): Promise<T | null>;
  findMany(args?: { 
    skip?: number; 
    take?: number; 
    where?: Partial<T>;
    orderBy?: any;
  }): Promise<T[]>;
  count(args?: { where?: Partial<T> }): Promise<number>;
  create(args: { data: Omit<T, 'id' | 'createdAt' | 'updatedAt'> }): Promise<T>;
  delete(args: { where: { id: string } }): Promise<T>;
  update(args: { where: { id: string }; data: Partial<T> }): Promise<T>;
}

@injectable()
export abstract class BaseRepositoryImp<T extends { id: string }> implements IBaseRepository<T> {

    protected abstract model: IPrismaDelegate<T>;

  async findById(id: string): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async findAll(skip?: number, take?: number): Promise<PaginatedResponse<T>> {
    const safeSkip = skip !== undefined && !isNaN(skip) ? skip : 0;
    const safeTake = take !== undefined && !isNaN(take) ? take : 4;
    
    const data = await this.model.findMany({ 
      skip: safeSkip, 
      take: safeTake, 
      orderBy: { createdAt: 'desc' } 
    });
    const total = await this.model.count();
    return { data, total };
  }

  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    return this.model.create({ data });
  }

  async update(data: Partial<T> & { id: string }): Promise<T> {
    return this.model.update({ where: { id: data.id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.model.delete({ where: { id } });
  }
}
