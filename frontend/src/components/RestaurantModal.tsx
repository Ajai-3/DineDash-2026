import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import type { Restaurant } from '../types/restaurant';
import { restaurantSchema, type RestaurantFormValues } from '../validations/restaurantSchema';

interface RestaurantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RestaurantFormValues) => Promise<void>;
  restaurant?: Restaurant | null;
  loading: boolean;
}

export const RestaurantModal: React.FC<RestaurantModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  restaurant,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: '',
      contact: '',
      address: '',
    },
  });

  useEffect(() => {
    if (restaurant && isOpen) {
      reset({
        name: restaurant.name,
        contact: restaurant.contact,
        address: restaurant.address,
      });
    } else if (isOpen) {
      reset({ name: '', contact: '', address: '' });
    }
  }, [restaurant, isOpen, reset]);

  const onFormSubmit = async (data: RestaurantFormValues) => {
    await onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 border-zinc-800 text-zinc-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-500">
            {restaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-zinc-400">
              Restaurant Name
            </Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="e.g. Gourmet Garden"
              className="bg-zinc-900 border-zinc-800 focus:ring-orange-500 focus:border-orange-500 transition-all break-all"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact" className="text-sm font-medium text-zinc-400">
              Contact Number
            </Label>
            <Input
              id="contact"
              {...register('contact')}
              placeholder="e.g. 9876543210"
              className="bg-zinc-900 border-zinc-800 focus:ring-orange-500 focus:border-orange-500 transition-all"
            />
            {errors.contact && (
              <p className="text-xs text-red-500 mt-1">{errors.contact.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium text-zinc-400">
              Address
            </Label>
            <Textarea
              id="address"
              {...register('address')}
              placeholder="e.g. 123 Main St, New York, NY"
              className="bg-zinc-900 border-zinc-800 focus:ring-orange-500 focus:border-orange-500 min-h-[220px] transition-all break-all"
            />
            {errors.address && (
              <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={loading}
              className="hover:bg-zinc-900"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-orange-600 text-white hover:bg-orange-700 font-semibold shadow-lg shadow-orange-900/20"
            >
              {loading ? (restaurant ? 'Updating...' : 'Adding...') : (restaurant ? 'Save Changes' : 'Add Restaurant')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
