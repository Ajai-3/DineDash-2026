import cors from 'cors';
import express from 'express';
import { env } from './infrastructure/config/env';

import { ROUTES } from './shared/constants/routes';
import restaurantRoutes from './presentation/routes/restaurant.routes'
import { errorHandler } from './presentation/middlewares/ErrorHandler';

const app = express()

app.use(cors({
  origin: env.frontend_url,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ROUTES.RESTAURANT.BASE, restaurantRoutes)

app.use(errorHandler);

export default app;
