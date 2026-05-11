import { useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../api/axiosInstance';
import { API_ROUTES } from '../constants/routes';

export const useDeleteRestaurant = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteRestaurant = async (id: string): Promise<boolean> => {
    setLoading(true);
    try {
      await axiosInstance.delete(API_ROUTES.RESTAURANTS.DELETE(id));
      toast.success('Restaurant deleted successfully!');
      setError(null);
      return true;
    } catch (err: unknown) {
      let message = 'Failed to delete restaurant';
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

  return { deleteRestaurant, loading, error };
};
