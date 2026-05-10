import { Restaurant } from '../entities/Restaurant';
import { IBaseRepository } from './IBaseRepository';

export interface IRestaurantRepository extends IBaseRepository<Restaurant> {}
