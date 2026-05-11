import { useState, useCallback } from 'react';
import axiosInstance from '../api/axiosInstance';
import { API_ROUTES } from '../constants/routes';
import type { Restaurant, PaginatedResponse } from '../types/restaurant';

export const useGetRestaurants = () => {
  const [data, setData] = useState<PaginatedResponse<Restaurant> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = useCallback(async (page: number = 1, limit: number = 4) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get<PaginatedResponse<Restaurant>>(
        API_ROUTES.RESTAURANTS.GET_ALL,
        { params: { page, limit } }
      );
      setData(response.data);
      setError(null);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response: { data: { message: string } } };
        setError(axiosError.response.data.message || 'Failed to fetch restaurants');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchRestaurants };
};
