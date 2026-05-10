import express from 'express';

import restaurantRoutes from './presentation/routes/restaurant.routes'
import { errorHandler } from './presentation/middlewares/ErrorHandler';
import { ROUTES } from './shared/constants/routes';

const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ROUTES.RESTAURANT.BASE, restaurantRoutes)

app.use(errorHandler);

export default app;
