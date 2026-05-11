import { Restaurant } from '../../../types/Restaurant';
import { CreateRestaurantDto } from '../dto/RestaurantDto';

export interface ICreateRestaurantUseCase {
  execute(dto: CreateRestaurantDto): Promise<Restaurant>;
}
