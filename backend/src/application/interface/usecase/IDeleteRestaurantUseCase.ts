export interface IDeleteRestaurantUseCase {
    execute(id: string): Promise<void>
}