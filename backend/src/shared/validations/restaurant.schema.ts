import { z } from 'zod';

export const restaurantSchema = z.object({
  name: z.string().min(4, 'Name must be at least 4 characters').max(20, 'Name must be at most 20 characters'),
  contact: z.number().int('Contact must be an integer').min(1000000000, 'Contact must be at least 10 digits').max(999999999999999, 'Contact must be at most 15 digits'),
  address: z.string().min(8, 'Address must be at least 8 characters').max(200, 'Address must be at most 200 characters'),
});

export const updateRestaurantSchema = restaurantSchema.partial().extend({
  id: z.string(),
});
