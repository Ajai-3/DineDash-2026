import { injectable, inject } from 'inversify';
import { Validator } from '../../shared/utils/Validator';
import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '../../shared/constants/messages';
import { TYPES } from '../../infrastructure/inversify/types';
import { STATUS_CODES } from '../../shared/constants/statusCodes';
import { IRestaurantController } from '../interface/IRestaurantController';
import { IEditRestaurantUseCase } from '../../application/interface/usecase/IEditRestaurantUseCase';
import { restaurantSchema, updateRestaurantSchema } from '../../shared/validations/restaurant.schema';
import { ICreateRestaurantUseCase } from '../../application/interface/usecase/ICreateRestaurantUseCase';
import { IGetAllRestaurantUseCase } from '../../application/interface/usecase/IGetAllRestaurantUseCase';
import { IDeleteRestaurantUseCase } from '../../application/interface/usecase/IDeleteRestaurantUseCase';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../../application/interface/dto/RestaurantDto';

@injectable()
export class RestaurantController implements IRestaurantController {
  constructor(
    @inject(TYPES.IEditRestaurantUseCase) private readonly _editUsecase: IEditRestaurantUseCase,
    @inject(TYPES.ICreateRestaurantUseCase) private readonly _createUsecase: ICreateRestaurantUseCase,
    @inject(TYPES.IDeleteRestaurantUseCase) private readonly _deleteUsecase: IDeleteRestaurantUseCase,
    @inject(TYPES.IGetAllRestaurantUseCase) private readonly _getAllUsecase: IGetAllRestaurantUseCase,
  ) {}

  createRestaurant = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const validatedData = await Validator.validate<CreateRestaurantDto>(restaurantSchema, req.body);
      const data = await this._createUsecase.execute(validatedData);
      return res.status(STATUS_CODES.CREATED).json({
        message: MESSAGES.RESTAURANT.CREATED,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  getRestaurants = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      // CRITICAL: Radix must be 10 for standard decimal numbers. Base 4 treats '4' as invalid (NaN).
      const limit = req.query.limit ? (parseInt(req.query.limit as string, 10) || 4) : 4;
      const skip = (page - 1) * limit;
      const take = limit;

      const result = await this._getAllUsecase.execute(skip, take);
      
      return res.status(STATUS_CODES.OK).json({
        message: MESSAGES.RESTAURANT.FETCHED,
        data: result.data,
        total: result.total,
        page,
        limit,
        totalPages: Math.ceil(result.total / limit)
      });
    } catch (error) {
      next(error);
    }
  };

  editRestaurant = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const payload = { ...req.body, id: req.params.id };
      const validatedData = await Validator.validate<UpdateRestaurantDto>(updateRestaurantSchema, payload);
      const data = await this._editUsecase.execute(validatedData);

      return res.status(STATUS_CODES.OK).json({
        message: MESSAGES.RESTAURANT.UPDATED,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteRestaurant = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const id = req.params.id as string;
      await this._deleteUsecase.execute(id);
      return res.status(STATUS_CODES.OK).json({
        message: MESSAGES.RESTAURANT.DELETED,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  };
}
