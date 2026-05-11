import React from 'react';
import { 
  Card, 
  CardContent, 
  Box, 
  Typography, 
  Stack, 
  IconButton, 
  Tooltip 
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  LocationOn as LocationIcon, 
  Phone as PhoneIcon 
} from '@mui/icons-material';
import type { Restaurant } from '../types/restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onEdit: (restaurant: Restaurant) => void;
  onDelete: (restaurant: Restaurant) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ 
  restaurant, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      position: 'relative',
      overflow: 'visible',
      '&:hover': { 
        transform: 'translateY(-6px)',
      }
    }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }} color="text.primary">
            {restaurant.name}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Edit">
              <IconButton 
                size="small" 
                onClick={() => onEdit(restaurant)}
                sx={{ border: '1px solid', borderColor: 'divider' }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton 
                size="small" 
                color="error" 
                onClick={() => onDelete(restaurant)}
                sx={{ border: '1px solid', borderColor: 'error.main' }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
        
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: 'text.secondary' }}>
            <PhoneIcon fontSize="small" color="primary" />
            <Typography variant="body1">{restaurant.contact}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, color: 'text.secondary' }}>
            <LocationIcon fontSize="small" color="primary" sx={{ mt: 0.3 }} />
            <Typography variant="body1" sx={{ 
              lineClamp: 2, 
              display: '-webkit-box', 
              WebkitBoxOrient: 'vertical', 
              overflow: 'hidden' 
            }}>
              {restaurant.address}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
