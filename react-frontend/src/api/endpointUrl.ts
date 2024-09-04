import { API_BASE_URL } from '@/const';

export const endpointUrl = {
    dishes: {
      getByGroupId(groupId: number) {
        return new Request(new URL(`/dishes/${groupId}`, API_BASE_URL).toString());
      },
      deleteById(dishId: number) {
        return new Request(new URL(`dishes/${dishId}`, API_BASE_URL).toString(), {
          method: 'DELETE',
        });
      },
    },
  };
