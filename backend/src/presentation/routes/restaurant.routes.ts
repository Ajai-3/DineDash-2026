import Router from 'express';
import { ROUTES } from '../../shared/constants/routes';
import { TYPES } from '../../infrastructure/inversify/types';
import { IRestaurantController } from '../interface/IRestaurantController';
import { container } from '../../infrastructure/inversify/inversify-config';          

const router = Router();

const restaurantController = container.get<IRestaurantController>(TYPES.IRestaurantController);

router.get(ROUTES.RESTAURANT.GET_ALL, restaurantController.getRestaurants);
router.post(ROUTES.RESTAURANT.CREATE, restaurantController.createRestaurant);
router.patch(ROUTES.RESTAURANT.EDIT, restaurantController.editRestaurant);
router.delete(ROUTES.RESTAURANT.DELETE, restaurantController.deleteRestaurant);

export default router;
