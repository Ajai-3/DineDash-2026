import { inject, injectable } from 'inversify';
import { Restaurant } from '../../types/Restaurant';
import { TYPES } from '../../infrastructure/inversify/types';
import { CreateRestaurantDto } from '../interface/dto/RestaurantDto';
import { IRestaurantRepository } from '../../core/repositories/IRestaurantRepository';
import { ICreateRestaurantUseCase } from '../interface/usecase/ICreateRestaurantUseCase';

@injectable()
export class CreateRestaurantUseCase implements ICreateRestaurantUseCase {
  constructor(
    @inject(TYPES.IRestaurantRepository)
    private readonly _restaurantRepo: IRestaurantRepository,
  ) {}

  async execute(dto: CreateRestaurantDto): Promise<Restaurant> {
    const restaurant = await this._restaurantRepo.create({
      name: dto.name,
      contact: dto.contact,
      address: dto.address,
    })

    return restaurant as unknown as Restaurant;
  }
}
