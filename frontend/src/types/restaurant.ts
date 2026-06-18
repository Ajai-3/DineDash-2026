export interface Restaurant {
  id: string;
  name: string;
  contact: number;
  address: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateRestaurantDTO {
  name: string;
  contact: number;
  address: string;
}

export type UpdateRestaurantDTO = Partial<CreateRestaurantDTO>;
