import React from 'react';
import { Grid, Skeleton, Box, Typography, Button, Paper } from '@mui/material';
import { RestaurantCard } from './RestaurantCard';
import type { Restaurant } from '../types/restaurant';

interface RestaurantListProps {
  isLoading: boolean;
  restaurants?: Restaurant[];
  onEdit: (restaurant: Restaurant) => void;
  onDelete: (restaurant: Restaurant) => void;
  onAddFirst: () => void;
}

export const RestaurantList: React.FC<RestaurantListProps> = ({ 
  isLoading, 
  restaurants, 
  onEdit, 
  onDelete, 
  onAddFirst 
}) => {
  if (isLoading) {
    return (
      <Grid container spacing={4}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Grid size={{ xs: 12, md: 6 }} key={i}>
            <Skeleton variant="rounded" height={180} sx={{ borderRadius: 3 }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: 10, textAlign: 'center', bgcolor: 'background.paper', borderStyle: 'dashed', borderWidth: 2 }}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No restaurants in your network.
        </Typography>
        <Button sx={{ mt: 2 }} variant="outlined" onClick={onAddFirst}>
          Create your first entry
        </Button>
      </Paper>
    );
  }

  return (
    <Grid container spacing={4}>
      {restaurants.map((restaurant) => (
        <Grid size={{ xs: 12, md: 6 }} key={restaurant.id}>
          <RestaurantCard 
            restaurant={restaurant} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        </Grid>
      ))}
    </Grid>
  );
};
