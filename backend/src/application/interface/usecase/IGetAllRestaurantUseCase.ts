import { Restaurant } from "../../../core/entities/Restaurant";
import { PaginatedResponse } from "../../../types/PaginatedResponse";

export interface IGetAllRestaurantUseCase {
  execute(page: number, limit: number): Promise<PaginatedResponse<Restaurant>>;
}