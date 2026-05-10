import { PaginatedResponse } from '../../types/PaginatedResponse';

export interface IBaseRepository<T> {
  findAll(skip?: number, take?: number): Promise<PaginatedResponse<T>>;
  delete(id: string): Promise<void>;
  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  findById(id: string): Promise<T | null>
  update(data: Partial<T> & { id: string }): Promise<T>;
}
