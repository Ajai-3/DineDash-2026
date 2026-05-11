import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ m: 0, p: 2, fontWeight: 700, color: 'primary.main' }}>
        {restaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 2 }}>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 0.5, display: 'block' }}>
              RESTAURANT NAME
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. Gourmet Garden"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Box>

          <Box sx={{ mb: 2.5 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 0.5, display: 'block' }}>
              CONTACT NUMBER
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. 9876543210"
              {...register('contact')}
              error={!!errors.contact}
              helperText={errors.contact?.message}
            />
          </Box>

          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, mb: 0.5, display: 'block' }}>
              ADDRESS
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="e.g. 123 Main St, New York, NY"
              {...register('address')}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={loading} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onFormSubmit)}
          variant="contained"
          disabled={loading}
          disableElevation
          startIcon={loading && <CircularProgress size={16} color="inherit" />}
        >
          {loading ? (restaurant ? 'Updating...' : 'Adding...') : (restaurant ? 'Save Changes' : 'Add Restaurant')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
