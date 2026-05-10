import 'reflect-metadata';
import { TYPES } from './types';
import { Container } from 'inversify';

// Repositories
import { RestaurantRepositoryImp } from '../repositories/RestaurantRepositoryImp';
import { IRestaurantRepository } from 'src/core/repositories/IRestaurantRepository';

// Use-Case's
import { EditRestaurantUseCase } from 'src/application/usecase/EditRestaurantUseCase';
import { DeleteRestaurantUseCase } from 'src/application/usecase/DeleteRestaurantUseCase';
import { CreateRestaurantUseCase } from 'src/application/usecase/CreateRestaurantUseCase';
import { GetAllRestaurantUseCase } from 'src/application/usecase/GetAllRestaurantUseCase';

import { IEditRestaurantUseCase } from 'src/application/interface/usecase/IEditRestaurantUseCase';
import { IDeleteRestaurantUseCase } from 'src/application/interface/usecase/IDeleteRestaurantUseCase';
import { ICreateRestaurantUseCase } from 'src/application/interface/usecase/ICreateRestaurantUseCase';
import { IGetAllRestaurantUseCase } from 'src/application/interface/usecase/IGetAllRestaurantUseCase';

// Controllers
import { IRestaurantController } from 'src/presentation/interface/IRestaurantController';
import { RestaurantController } from 'src/presentation/controllers/RestaurantController';


const container = new Container()

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