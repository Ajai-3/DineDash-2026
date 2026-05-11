import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add as AddIcon, Restaurant as RestaurantIcon } from '@mui/icons-material';

interface RestaurantHeaderProps {
  onAddClick: () => void;
}

export const RestaurantHeader: React.FC<RestaurantHeaderProps> = ({ onAddClick }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: { xs: 'column', md: 'row' }, 
      justifyContent: 'space-between', 
      alignItems: { xs: 'flex-start', md: 'center' }, 
      mb: 4, 
      gap: 3 
    }}>
      <Box>
        <Typography variant="h2" component="h1" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <RestaurantIcon fontSize="inherit" /> DineDash
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
          Management Dashboard
        </Typography>
      </Box>
      <Button 
        variant="contained" 
        startIcon={<AddIcon />} 
        onClick={onAddClick}
        size="medium"
      >
        Add Restaurant
      </Button>
    </Box>
  );
};
