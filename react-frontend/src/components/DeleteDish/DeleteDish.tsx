import { Button } from '@mantine/core';
import * as React from 'react';
import { useApiDishes } from '../../hooks/useApiDishes';
import { DishesContext, DishesContextType } from '@/pages/Dishes.page';
import { EditDishFormProps } from '@/components/EditDishForm';

type Dish = EditDishFormProps['dish'];

function DeleteDishBtn({ dish, children }: React.PropsWithChildren<Record<'dish', Dish>>) {
  const dishesContext = React.useContext(DishesContext) as DishesContextType;
  const { deleteById } = useApiDishes(dishesContext.groupId);

  return (
  <Button
    color="red"
    fullWidth
    mt="md"
    radius="md"
    onClick={() => {
            if (window.confirm(`Are you sure you want to delete "${dish.name}" dish? It will be impossible to revert this action.`)) {
              deleteById.mutate(dish.id);
            }
        }}>
          {children}
  </Button>
  );
}

export default DeleteDishBtn;
