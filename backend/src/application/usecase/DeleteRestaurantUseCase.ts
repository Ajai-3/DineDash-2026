import { inject, injectable } from "inversify";
import { TYPES } from "src/infrastructure/inversify/types";
import { NotFoundError } from "src/core/errors/NotFoundError";
import { IRestaurantRepository } from "src/core/repositories/IRestaurantRepository";
import { IDeleteRestaurantUseCase } from "../interface/usecase/IDeleteRestaurantUseCase";
import { MESSAGES } from "../../shared/constants/messages";

@injectable()
export class DeleteRestaurantUseCase implements IDeleteRestaurantUseCase {
    constructor(@inject(TYPES.IRestaurantRepository) private readonly _restaurantRepo: IRestaurantRepository) {}

    async execute(id: string): Promise<void> {
        const restaurant = await this._restaurantRepo.findById(id);
        if (!restaurant) {
            throw new NotFoundError(MESSAGES.RESTAURANT.NOT_FOUND);
        }
        await this._restaurantRepo.delete(id)
    }
}