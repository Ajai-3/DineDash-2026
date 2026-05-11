import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import { API_ROUTES } from '../constants/routes';
import type { Restaurant, PaginatedResponse } from '../types/restaurant';

export const useGetRestaurants = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['restaurants', page, limit],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PaginatedResponse<Restaurant>>(
        API_ROUTES.RESTAURANTS.GET_ALL,
        { params: { page, limit } }
      );
      return data;
    },
  });
};
