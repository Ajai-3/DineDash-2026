import { Restaurant } from "../../../types/Restaurant";
import { UpdateRestaurantDto } from "../dto/RestaurantDto";

export interface IEditRestaurantUseCase {
  execute(dto: UpdateRestaurantDto): Promise<Restaurant>;
}