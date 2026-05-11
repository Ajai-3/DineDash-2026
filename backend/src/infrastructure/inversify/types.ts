export const TYPES = {
  // Logger
  ILogger: Symbol('ILogger'),
  
  // Repositories
    IRestaurantRepository: Symbol('IRestaurantRepository'),

  // Use-Case's
    IEditRestaurantUseCase: Symbol('IEditRestaurantUseCase'),
  IGetAllRestaurantUseCase: Symbol('IGetAllRestaurantUseCase'),
  ICreateRestaurantUseCase: Symbol('ICreateRestaurantUseCase'),
  IDeleteRestaurantUseCase: Symbol('IDeleteRestaurantUseCase'),

  // Controllers
    IRestaurantController: Symbol('IRestaurantController')
};
