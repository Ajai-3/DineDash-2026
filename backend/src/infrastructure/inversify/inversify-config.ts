import 'reflect-metadata';
import { TYPES } from './types';
import { Container } from 'inversify';

// Logger
import { WinstonLogger } from '../logging/logger';
import { ILogger } from '../../application/interface/logging/ILogger';


// Repositories
import { RestaurantRepositoryImp } from '../repositories/RestaurantRepositoryImp';
import { IRestaurantRepository } from '../../core/repositories/IRestaurantRepository';

// Use-Case's
import { EditRestaurantUseCase } from '../../application/usecase/EditRestaurantUseCase';
import { DeleteRestaurantUseCase } from '../../application/usecase/DeleteRestaurantUseCase';
import { CreateRestaurantUseCase } from '../../application/usecase/CreateRestaurantUseCase';
import { GetAllRestaurantUseCase } from '../../application/usecase/GetAllRestaurantUseCase';

import { IEditRestaurantUseCase } from '../../application/interface/usecase/IEditRestaurantUseCase';
import { IDeleteRestaurantUseCase } from '../../application/interface/usecase/IDeleteRestaurantUseCase';
import { ICreateRestaurantUseCase } from '../../application/interface/usecase/ICreateRestaurantUseCase';
import { IGetAllRestaurantUseCase } from '../../application/interface/usecase/IGetAllRestaurantUseCase';

// Controllers
import { IRestaurantController } from '../../presentation/interface/IRestaurantController';
import { RestaurantController } from '../../presentation/controllers/RestaurantController';


const container = new Container()

// Logger
container.bind<ILogger>(TYPES.ILogger).to(WinstonLogger).inSingletonScope();

// Repositories
container.bind<IRestaurantRepository>(TYPES.IRestaurantRepository).to(RestaurantRepositoryImp).inSingletonScope();

// Use-Case's
container.bind<IEditRestaurantUseCase>(TYPES.IEditRestaurantUseCase).to(EditRestaurantUseCase);
container.bind<IGetAllRestaurantUseCase>(TYPES.IGetAllRestaurantUseCase).to(GetAllRestaurantUseCase);
container.bind<IDeleteRestaurantUseCase>(TYPES.IDeleteRestaurantUseCase).to(DeleteRestaurantUseCase);
container.bind<ICreateRestaurantUseCase>(TYPES.ICreateRestaurantUseCase).to(CreateRestaurantUseCase);

// Controllers
container.bind<IRestaurantController>(TYPES.IRestaurantController).to(RestaurantController)


export { container }