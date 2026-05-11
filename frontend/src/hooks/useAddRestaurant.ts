import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import { API_ROUTES } from '../constants/routes';
import type { CreateRestaurantDTO } from '../types/restaurant';

export const useAddRestaurant = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addRestaurant = async (payload: CreateRestaurantDTO): Promise<boolean> => {
    setLoading(true);
    try {
      await axiosInstance.post(API_ROUTES.RESTAURANTS.CREATE, payload);
      toast.success('Restaurant added successfully!');
      setError(null);
      return true;
    } catch (err: unknown) {
      let message = 'Failed to add restaurant';
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

  return { addRestaurant, loading, error };
};
