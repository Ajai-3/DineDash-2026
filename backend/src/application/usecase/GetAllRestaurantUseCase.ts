import { inject, injectable } from "inversify";
import { IGetAllRestaurantUseCase } from "../interface/usecase/IGetAllRestaurantUseCase";
import { TYPES } from "src/infrastructure/inversify/types";
import { IRestaurantRepository } from "src/core/repositories/IRestaurantRepository";
import { Restaurant } from "src/core/entities/Restaurant";
import { PaginatedResponse } from "src/types/PaginatedResponse";

@injectable()
export class GetAllRestaurantUseCase implements IGetAllRestaurantUseCase {
    constructor(@inject(TYPES.IRestaurantRepository) private readonly _restaurantRepo: IRestaurantRepository) {}

    async execute(skip?: number, take?: number): Promise<PaginatedResponse<Restaurant>> {
        return await this._restaurantRepo.findAll(skip, take);
    }
}