import { injectable } from 'inversify';
import { prisma } from '../config/prisma';
import { BaseRepositoryImp } from './BaseRepositoryImp';
import { Restaurant } from '../../core/entities/Restaurant';
import { IRestaurantRepository } from '../../core/repositories/IRestaurantRepository';

@injectable()
export class RestaurantRepositoryImp
  extends BaseRepositoryImp<Restaurant>
  implements IRestaurantRepository {
  protected model = prisma.restaurant;
}
