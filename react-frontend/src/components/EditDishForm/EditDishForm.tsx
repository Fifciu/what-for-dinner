import { useForm } from '@mantine/form';
import { FileInput, Group, TextInput, Button, Flex } from '@mantine/core';
import { useApiDishes } from '../../hooks/useApiDishes';

export interface EditDishFormProps {
  onSent?: () => void,
  dish: {
    id: number,
    name: string,
    photoSrc: string
  }
}

function EditDishForm({ dish, onSent }: EditDishFormProps) {
  const groupId = 1;
  const { edit } = useApiDishes(groupId);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: dish.name,
      photoSrc: null! as File,
    },
  });

  async function handleSubmit(values: typeof form.values) {
    await edit.mutateAsync({
      dishId: dish.id,
      ...values,
    });
    onSent?.();
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex
        direction={{ base: 'column' }}
        gap={{ base: 'sm' }}>
      <TextInput
        withAsterisk
        label="Name"
        placeholder="Rosół"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <img src={dish.photoSrc} alt="dish" />
      <FileInput
        variant="filled"
        label="Photo"
        withAsterisk
        placeholder="Click to select photo"
        key={form.key('photoSrc')}
        accept=".png,.jpg"
        {...form.getInputProps('photoSrc')}
      />
      </Flex>
      <Group justify="flex-end" mt="md">
        <Button type="submit" disabled={edit.isPending}>Edit</Button>
      </Group>
    </form>
  );
}

export default EditDishForm;
