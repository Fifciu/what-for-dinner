import { useForm } from '@mantine/form';
import { FileInput, Group, TextInput, Button, Flex } from '@mantine/core';
import { useApiDishes } from '../../hooks/useApiDishes';

export interface AddDishFormProps {
  onSent?: () => void,
  groupId: number
}

function AddDishForm({ onSent, groupId }: AddDishFormProps) {
  const { add } = useApiDishes(groupId);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      photoSrc: null! as File,
    },
  });

  async function handleSubmit(values: typeof form.values) {
    await add.mutateAsync(values);
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
        <Button type="submit" disabled={add.isPending}>Add</Button>
      </Group>
    </form>
  );
}

export default AddDishForm;
