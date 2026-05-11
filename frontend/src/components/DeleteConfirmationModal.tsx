import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
  title: string;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
}) => {
  const restaurantName = title.replace('Delete ', '').replace('?', '');

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pt: 3 }}>
        <WarningAmberRoundedIcon color="error" />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Confirm Deletion
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography color="text.secondary">
          Are you sure you want to delete <Box component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>{restaurantName}</Box>? 
          This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} disabled={loading} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={loading}
          disableElevation
          startIcon={loading && <CircularProgress size={16} color="inherit" />}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
