export interface CreateRestaurantDto {
  name: string;
  contact: number;
  address: string;
}

export interface UpdateRestaurantDto {
  id: string;
  name?: string;
  contact?: number;
  address?: string;
}

export interface RestaurantDto {
  id: string;
  name: string;
  contact: number;
  address: string;
}
