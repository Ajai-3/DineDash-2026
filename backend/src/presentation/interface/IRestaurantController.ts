import { Restaurant } from '../../types/Restaurant';
import { Request, Response, NextFunction } from 'express';

export interface IRestaurantController {
  getRestaurants: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response | void>;

  createRestaurant: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | void>
  editRestaurant: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response | void>;
  deleteRestaurant: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<Response | void>;
}
