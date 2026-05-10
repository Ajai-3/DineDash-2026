import { injectable, inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { IRestaurantController } from '../interface/IRestaurantController';
import { TYPES } from '../../infrastructure/inversify/types';
import { ICreateRestaurantUseCase } from '../../application/interface/usecase/ICreateRestaurantUseCase';
import { IGetAllRestaurantUseCase } from '../../application/interface/usecase/IGetAllRestaurantUseCase';
import { IEditRestaurantUseCase } from '../../application/interface/usecase/IEditRestaurantUseCase';
import { IDeleteRestaurantUseCase } from '../../application/interface/usecase/IDeleteRestaurantUseCase';
import { STATUS_CODES } from '../../shared/constants/statusCodes';
import { MESSAGES } from '../../shared/constants/messages';

@injectable()
export class RestaurantController implements IRestaurantController {
  constructor(
    @inject(TYPES.ICreateRestaurantUseCase) private readonly _createUsecase: ICreateRestaurantUseCase,
    @inject(TYPES.IGetAllRestaurantUseCase) private readonly _getAllUsecase: IGetAllRestaurantUseCase,
    @inject(TYPES.IEditRestaurantUseCase) private readonly _editUsecase: IEditRestaurantUseCase,
    @inject(TYPES.IDeleteRestaurantUseCase) private readonly _deleteUsecase: IDeleteRestaurantUseCase,
  ) {}

  createRestaurant = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const data = await this._createUsecase.execute(req.body);
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
      const skip = req.query.skip ? parseInt(req.query.skip as string, 10) : undefined;
      const take = req.query.take ? parseInt(req.query.take as string, 10) : undefined;
      const result = await this._getAllUsecase.execute(skip, take);
      return res.status(STATUS_CODES.OK).json({
        message: MESSAGES.RESTAURANT.FETCHED,
        data: result,
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
      const dto = { ...req.body, id: req.params.id };
      const data = await this._editUsecase.execute(dto);
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
