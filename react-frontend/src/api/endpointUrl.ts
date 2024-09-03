import { API_BASE_URL } from '@/const';

export const endpointUrl = {
    dishes: {
      getByGroupId(groupId: number) {
        return new URL(`/dishes/${groupId}`, API_BASE_URL).toString();
      },
    },
  };
