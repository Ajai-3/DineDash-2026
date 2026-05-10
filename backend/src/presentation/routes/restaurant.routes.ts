import Router from 'express';
import { container } from 'src/infrastructure/inversify/inversifyconfig';
import { IRestaurantController } from '../interface/IRestaurantController';
import { TYPES } from 'src/infrastructure/inversify/types';
import { ROUTES } from '../../shared/constants/routes';

const router = Router();

const restaurantController = container.get<IRestaurantController>(TYPES.IRestaurantController);

router.get(ROUTES.RESTAURANT.GET_ALL, restaurantController.getRestaurants);

router.post(ROUTES.RESTAURANT.CREATE, restaurantController.createRestaurant)

router.patch(ROUTES.RESTAURANT.EDIT, restaurantController.editRestaurant);

router.delete(ROUTES.RESTAURANT.DELETE, restaurantController.deleteRestaurant)


export default router;
