export interface CreateRestaurantDTO {
  name: string;
  contact: string;
  address: string;
}

export interface UpdateRestaurantDTO extends Partial<CreateRestaurantDTO> {
  id: string;
}
