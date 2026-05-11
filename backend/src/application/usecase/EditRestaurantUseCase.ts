import { inject, injectable } from "inversify";
import { Restaurant } from "../../types/Restaurant";
import { TYPES } from "../../infrastructure/inversify/types";
import { UpdateRestaurantDto } from "../interface/dto/RestaurantDto";
import { IRestaurantRepository } from "../../core/repositories/IRestaurantRepository";
import { IEditRestaurantUseCase } from "../interface/usecase/IEditRestaurantUseCase";
import { NotFoundError } from "../../core/errors/NotFoundError";
import { MESSAGES } from "../../shared/constants/messages";

@injectable()
export class EditRestaurantUseCase implements IEditRestaurantUseCase {
   constructor(@inject(TYPES.IRestaurantRepository) private readonly _restaurantRepo: IRestaurantRepository) {}

   async execute(dto: UpdateRestaurantDto): Promise<Restaurant> {
       
    const existingRestaurant = await this._restaurantRepo.findById(dto.id);

    if (!existingRestaurant) {
        throw new NotFoundError(MESSAGES.RESTAURANT.NOT_FOUND);
    }

    const updatedRestaurant = await this._restaurantRepo.update(dto) as unknown as Restaurant;

    return updatedRestaurant;
   }
}