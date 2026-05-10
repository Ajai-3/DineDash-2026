import { RestaurantDto } from '../dto/RestaurantDto';
import { Restaurant } from '../../../types/Restaurant';

export interface ICreateRestaurantUseCase {
  execute(dto: RestaurantDto): Promise<Restaurant>;
}
