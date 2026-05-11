import { inject, injectable } from "inversify";
import { IGetAllRestaurantUseCase } from "../interface/usecase/IGetAllRestaurantUseCase";
import { TYPES } from "../../infrastructure/inversify/types";
import { IRestaurantRepository } from "../../core/repositories/IRestaurantRepository";
import { Restaurant } from "../../core/entities/Restaurant";
import { PaginatedResponse } from "../../types/PaginatedResponse";

@injectable()
export class GetAllRestaurantUseCase implements IGetAllRestaurantUseCase {
  constructor(
    @inject(TYPES.IRestaurantRepository)
    private readonly _restaurantRepo: IRestaurantRepository,
  ) {}

  async execute(page: number, limit: number): Promise<PaginatedResponse<Restaurant>> {
    return this._restaurantRepo.findAll(page, limit);
  }
}