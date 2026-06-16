import { injectable, inject } from 'inversify';
import { Validator } from '../../shared/utils/Validator';
import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '../../shared/constants/messages';
import { TYPES } from '../../infrastructure/inversify/types';
import { STATUS_CODES } from '../../shared/constants/statusCodes';
import { ILogger } from '../../application/interface/logging/ILogger';
import { IRestaurantController } from '../interface/IRestaurantController';
import { IEditRestaurantUseCase } from '../../application/interface/usecase/IEditRestaurantUseCase';
import { restaurantSchema, updateRestaurantSchema } from '../../shared/validations/restaurant.schema';
import { ICreateRestaurantUseCase } from '../../application/interface/usecase/ICreateRestaurantUseCase';
import { IGetAllRestaurantUseCase } from '../../application/interface/usecase/IGetAllRestaurantUseCase';
import { IDeleteRestaurantUseCase } from '../../application/interface/usecase/IDeleteRestaurantUseCase';
import { CreateRestaurantDto, UpdateRestaurantDto } from '../../application/interface/dto/RestaurantDto';
import { ApiResponse } from '../../shared/utils/ApiResponse';

@injectable()
export class RestaurantController implements IRestaurantController {
  constructor(
    @inject(TYPES.ILogger) private readonly _logger: ILogger,
    @inject(TYPES.IEditRestaurantUseCase) private readonly _editUsecase: IEditRestaurantUseCase,
    @inject(TYPES.ICreateRestaurantUseCase) private readonly _createUsecase: ICreateRestaurantUseCase,
    @inject(TYPES.IDeleteRestaurantUseCase) private readonly _deleteUsecase: IDeleteRestaurantUseCase,
    @inject(TYPES.IGetAllRestaurantUseCase) private readonly _getAllUsecase: IGetAllRestaurantUseCase,
  ) { }

  createRestaurant = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      this._logger.info(`Creating restaurant: ${req.body.name}`);
      const validatedData = await Validator.validate<CreateRestaurantDto>(restaurantSchema, req.body);
      const data = await this._createUsecase.execute(validatedData);
      return ApiResponse.success(res, STATUS_CODES.CREATED, MESSAGES.RESTAURANT.CREATED, data);
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
      const limit = req.query.limit ? (parseInt(req.query.limit as string, 10) || 4) : 4;
      const skip = (page - 1) * limit;
      const take = limit;

      this._logger.info(`Fetching restaurants - Page: ${page}, Limit: ${limit}`);
      const result = await this._getAllUsecase.execute(skip, take);

      return ApiResponse.paginated(
        res,
        STATUS_CODES.OK,
        MESSAGES.RESTAURANT.FETCHED,
        result.data,
        result.total,
        page,
        limit,
        Math.ceil(result.total / limit)
      );
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
      this._logger.info(`Editing restaurant: ${req.params.id}`);
      const payload = { ...req.body, id: req.params.id };
      const validatedData = await Validator.validate<UpdateRestaurantDto>(updateRestaurantSchema, payload);
      const data = await this._editUsecase.execute(validatedData);

      return ApiResponse.success(res, STATUS_CODES.OK, MESSAGES.RESTAURANT.UPDATED, data);
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
      this._logger.info(`Deleting restaurant: ${req.params.id}`);
      const id = req.params.id as string;
      await this._deleteUsecase.execute(id);
      return ApiResponse.success(res, STATUS_CODES.OK, MESSAGES.RESTAURANT.DELETED, null);
    } catch (error) {
      next(error);
    }
  };
}
