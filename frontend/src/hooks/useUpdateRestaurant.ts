import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import { API_ROUTES } from '../constants/routes';
import type { Restaurant, CreateRestaurantDTO } from '../types/restaurant';

export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data: payload }: { id: string; data: CreateRestaurantDTO }) => {
      const { data } = await axiosInstance.patch<Restaurant>(
        API_ROUTES.RESTAURANTS.UPDATE(id),
        payload
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
  });
};
