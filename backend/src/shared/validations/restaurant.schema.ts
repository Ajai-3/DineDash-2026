import { z } from 'zod';

export const restaurantSchema = z.object({
  name: z.string().min(4, 'Name must be at least 4 characters').max(20, 'Name must be at most 20 characters'),
  contact: z.string().regex(/^\d{10,15}$/, 'Contact must be between 10 and 15 digits'),
  address: z.string().min(8, 'Address must be at least 8 characters').max(200, 'Address must be at most 200 characters'),
});

export const updateRestaurantSchema = restaurantSchema.partial().extend({
  id: z.string(),
});
