import { Restaurant } from "src/types/Restaurant";
import { RestaurantDto } from "../dto/RestaurantDto";

export interface IEditRestaurantUseCase {
    execute(dto: RestaurantDto): Promise<Restaurant>
}