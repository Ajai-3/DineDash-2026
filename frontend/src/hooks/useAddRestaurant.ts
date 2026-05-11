import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import { API_ROUTES } from '../constants/routes';
import type { Restaurant, CreateRestaurantDTO } from '../types/restaurant';

export const useAddRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newRestaurant: CreateRestaurantDTO) => {
      const { data } = await axiosInstance.post<Restaurant>(
        API_ROUTES.RESTAURANTS.CREATE,
        newRestaurant
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
  });
};
