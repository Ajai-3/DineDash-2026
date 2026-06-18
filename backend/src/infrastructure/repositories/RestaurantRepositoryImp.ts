import { injectable } from 'inversify';
import { prisma } from '../database/prisma';
import { BaseRepositoryImp, IPrismaDelegate } from './BaseRepositoryImp';
import { Restaurant } from '../../core/entities/Restaurant';
import { IRestaurantRepository } from '../../core/repositories/IRestaurantRepository';

@injectable()
export class RestaurantRepositoryImp
  extends BaseRepositoryImp<Restaurant>
  implements IRestaurantRepository {
  protected model = prisma.restaurant as unknown as IPrismaDelegate<Restaurant>;

  async findByContact(contact: number): Promise<Restaurant | null> {
    return prisma.restaurant.findUnique({
      where: { contact },
    }) as unknown as Promise<Restaurant | null>;
  }
}

