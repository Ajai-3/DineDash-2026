import { Restaurant } from "src/core/entities/Restaurant";

import { PaginatedResponse } from "src/types/PaginatedResponse";

export interface IGetAllRestaurantUseCase {
    execute(skip?: number, take?: number): Promise<PaginatedResponse<Restaurant>>;
}