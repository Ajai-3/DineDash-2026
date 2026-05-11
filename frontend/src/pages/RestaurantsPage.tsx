import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight, MapPin, Phone } from 'lucide-react';
import { useGetRestaurants } from '../hooks/useGetRestaurants';
import { useAddRestaurant } from '../hooks/useAddRestaurant';
import { useUpdateRestaurant } from '../hooks/useUpdateRestaurant';
import { useDeleteRestaurant } from '../hooks/useDeleteRestaurant';
import type { Restaurant, CreateRestaurantDTO } from '../types/restaurant';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { RestaurantModal } from '../components/RestaurantModal';
import { DeleteConfirmationModal } from '../components/DeleteConfirmationModal';

const RestaurantsPage: React.FC = () => {
  const { data, loading: fetchLoading, fetchRestaurants } = useGetRestaurants();
  const { addRestaurant, loading: addLoading } = useAddRestaurant();
  const { updateRestaurant, loading: updateLoading } = useUpdateRestaurant();
  const { deleteRestaurant, loading: deleteLoading } = useDeleteRestaurant();

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    fetchRestaurants(page);
  }, [page, fetchRestaurants]);

  const handleAddEdit = async (formData: CreateRestaurantDTO) => {
    let success = false;
    if (selectedRestaurant) {
      success = await updateRestaurant(selectedRestaurant.id, formData);
    } else {
      success = await addRestaurant(formData);
    }

    if (success) {
      setIsModalOpen(false);
      fetchRestaurants(page);
    }
  };

  const handleDelete = async () => {
    if (selectedRestaurant && data) {
      const success = await deleteRestaurant(selectedRestaurant.id);
      if (success) {
        setIsDeleteOpen(false);
        if (data.data.length === 1 && page > 1) {
          const newPage = page - 1;
          setPage(newPage);
          fetchRestaurants(newPage);
        } else {
          fetchRestaurants(page);
        }
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
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-orange-500">
            DineDash
          </h1>
          <p className="text-zinc-400 mt-2">Manage your restaurant network with ease.</p>
        </div>
        <Button onClick={openAddModal} className="bg-orange-600 text-white hover:bg-orange-700 h-11 px-6 text-base font-semibold shadow-lg shadow-orange-900/20">
          <Plus className="mr-2 h-5 w-5" /> Add Restaurant
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fetchLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="bg-zinc-900/50 border-zinc-800 animate-pulse h-48" />
          ))
        ) : data?.data.length === 0 ? (
          <div className="col-span-full py-20 text-center">
            <p className="text-zinc-500 text-lg">No restaurants found. Start by adding one!</p>
          </div>
        ) : (
          data?.data.map((restaurant) => (
            <Card key={restaurant.id} className="bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 transition-all group">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4 min-w-0">
                  <CardTitle className="text-xl font-bold text-orange-400 group-hover:text-orange-300 transition-colors truncate">
                    {restaurant.name}
                  </CardTitle>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditModal(restaurant)}
                      className="h-8 w-8 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDeleteModal(restaurant)}
                      className="h-8 w-8 hover:bg-zinc-800 text-red-500/80 hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <Phone className="h-3.5 w-3.5" /> {restaurant.contact}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-2 text-sm text-zinc-400">
                  <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                  <span className="line-clamp-2">{restaurant.address}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4 py-10">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || fetchLoading}
            className="border-zinc-800 hover:bg-zinc-900"
          >
            <ChevronLeft className="h-4 w-4 mr-2" /> Previous
          </Button>
          <div className="text-sm font-medium text-zinc-400">
            Page <span className="text-white">{data.page}</span> of {data.totalPages}
          </div>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages || fetchLoading}
            className="border-zinc-800 hover:bg-zinc-900"
          >
            Next <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}

      <RestaurantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddEdit}
        restaurant={selectedRestaurant}
        loading={addLoading || updateLoading}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        loading={deleteLoading}
        title={`Delete ${selectedRestaurant?.name}?`}
      />
    </div>
  );
};

export default RestaurantsPage;
