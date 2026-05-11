import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import { API_ROUTES } from '../constants/routes';
import type { UpdateRestaurantDTO } from '../types/restaurant';

export const useUpdateRestaurant = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateRestaurant = async (id: string, payload: UpdateRestaurantDTO): Promise<boolean> => {
    setLoading(true);
    try {
      await axiosInstance.patch(API_ROUTES.RESTAURANTS.UPDATE(id), payload);
      toast.success('Restaurant updated successfully!');
      setError(null);
      return true;
    } catch (err: unknown) {
      let message = 'Failed to update restaurant';
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosError = err as { response: { data: { message: string } } };
        message = axiosError.response.data.message || message;
      }
      toast.error(message);
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateRestaurant, loading, error };
};
