export interface Restaurant {
  id: string;
  name: string;
  contact: string;
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
  contact: string;
  address: string;
}

export interface UpdateRestaurantDTO extends Partial<CreateRestaurantDTO> {}
