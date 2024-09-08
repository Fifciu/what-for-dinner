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

const addMutation = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { name: string, photoSrc: File }) => {
      const response = await fetch(endpointUrl.dishes.add(params));
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

const editMutation = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { dishId: number, name?: string, photoSrc?: File }) => {
      const { dishId, ...rest } = params;
      const response = await fetch(endpointUrl.dishes.edit(dishId, rest));
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
    add: addMutation(groupId),
    edit: editMutation(groupId),
  });
