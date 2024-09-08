import { API_BASE_URL } from '@/const';

export const endpointUrl = {
    dishes: {
      getByGroupId(groupId: number) {
        return new Request(new URL(`dishes/${groupId}`, API_BASE_URL).toString());
      },
      deleteById(dishId: number) {
        return new Request(new URL(`dishes/${dishId}`, API_BASE_URL).toString(), {
          method: 'DELETE',
        });
      },
      add(params: { name: string, photoSrc: File }) {
        const body = new FormData();
        body.append('name', params.name);
        body.append('photoSrc', params.photoSrc);

        return new Request(new URL('dishes/', API_BASE_URL).toString(), {
          method: 'POST',
          body,
        });
      },
      edit(dishId: number, params: { name?: string, photoSrc?: File }) {
        const body = new FormData();
        if (params.name) body.append('name', params.name);
        if (params.photoSrc) body.append('photoSrc', params.photoSrc);

        return new Request(new URL(`dishes/${dishId}`, API_BASE_URL).toString(), {
          method: 'PATCH',
          body,
        });
      },
    },
  };
