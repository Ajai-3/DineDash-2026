import { inject, injectable } from "inversify";
import { Restaurant } from "src/types/Restaurant";
import { TYPES } from "src/infrastructure/inversify/types";
import { RestaurantDto } from "../interface/dto/RestaurantDto";
import { IRestaurantRepository } from "src/core/repositories/IRestaurantRepository";
import { IEditRestaurantUseCase } from "../interface/usecase/IEditRestaurantUseCase";
import { NotFoundError } from "../../core/errors/NotFoundError";
import { MESSAGES } from "../../shared/constants/messages";

@injectable()
export class EditRestaurantUseCase implements IEditRestaurantUseCase {
   constructor(@inject(TYPES.IRestaurantRepository) private readonly _restornatRepo: IRestaurantRepository) {}

   async execute(dto: RestaurantDto): Promise<Restaurant> {
       
    let restaurant = await this._restornatRepo.findById(dto.id) as unknown as Restaurant;

    if (!restaurant) {
        throw new NotFoundError(MESSAGES.RESTAURANT.NOT_FOUND);
    }

    restaurant = await this._restornatRepo.update(dto) as unknown as Restaurant;

    return restaurant;
   }
}