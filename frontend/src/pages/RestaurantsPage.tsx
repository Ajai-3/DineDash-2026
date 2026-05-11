import React, { useState } from 'react';
import { Container, Box, Pagination } from '@mui/material';
import { useGetRestaurants } from '../hooks/useGetRestaurants';
import { useAddRestaurant } from '../hooks/useAddRestaurant';
import { useUpdateRestaurant } from '../hooks/useUpdateRestaurant';
import { useDeleteRestaurant } from '../hooks/useDeleteRestaurant';
import type { Restaurant, CreateRestaurantDTO } from '../types/restaurant';
import { RestaurantModal } from '../components/RestaurantModal';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';
import { RestaurantHeader } from '../components/RestaurantHeader';
import { RestaurantList } from '../components/RestaurantList';
import { toast } from 'react-toastify';

const RestaurantsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 4;
  
  const { data, isLoading } = useGetRestaurants(page, limit);
  const { mutateAsync: addRestaurant, isPending: isAdding } = useAddRestaurant();
  const { mutateAsync: updateRestaurant, isPending: isUpdating } = useUpdateRestaurant();
  const { mutateAsync: deleteRestaurant, isPending: isDeleting } = useDeleteRestaurant();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleAddEdit = async (formData: CreateRestaurantDTO) => {
    try {
      if (selectedRestaurant) {
        await updateRestaurant({ id: selectedRestaurant.id, data: formData });
        toast.success('Restaurant updated successfully');
      } else {
        await addRestaurant(formData);
        toast.success('Restaurant added successfully');
      }
      setIsModalOpen(false);
    } catch (error) {
    }
  };

  const handleDelete = async () => {
    if (selectedRestaurant) {
      try {
        await deleteRestaurant(selectedRestaurant.id);
        toast.success('Restaurant deleted successfully');
        setIsDeleteOpen(true);
        if (data?.data.length === 1 && page > 1) {
          setPage(page - 1);
        }
        setIsDeleteOpen(false);
      } catch (error) {
      }
    }
  };

  const openAddModal = () => {
    setSelectedRestaurant(null);
    setIsModalOpen(true);
  };

  const openEditModal = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const openDeleteModal = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setIsDeleteOpen(true);
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 2 }, flexGrow: 1 }}>
        <RestaurantHeader onAddClick={openAddModal} />

        <RestaurantList 
          isLoading={isLoading} 
          restaurants={data?.data} 
          onEdit={openEditModal} 
          onDelete={openDeleteModal} 
          onAddFirst={openAddModal} 
        />

        {data && data.totalPages > 1 && (
          <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'center' }}>
            <Pagination 
              count={data.totalPages} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
              size="large"
              sx={{ 
                '& .MuiPaginationItem-root': { fontWeight: 700 }
              }}
            />
          </Box>
        )}
      </Container>

      <RestaurantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEdit}
        restaurant={selectedRestaurant}
        loading={isAdding || isUpdating}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        loading={isDeleting}
        title={`Delete ${selectedRestaurant?.name}?`}
      />
    </Box>
  );
};

export default RestaurantsPage;
