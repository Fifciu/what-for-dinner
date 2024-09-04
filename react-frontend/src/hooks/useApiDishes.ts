import { useMutation, useQueryClient } from '@tanstack/react-query';
import { endpointUrl } from '@/api/endpointUrl';

const notOkMsg = "Couldn't fulfill request";

const deleteMutation = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dishId: number) => {
      const response = await fetch(endpointUrl.dishes.deleteById(dishId));
        if (!response.ok) {
          throw new Error(notOkMsg);
        }
        return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dishes', groupId] });
    },
  });
};

export const useApiDishes = (groupId: number) => ({
    deleteById: deleteMutation(groupId),
  });
