import { Text, Grid, FileInput, Modal, Card, Image, Group, TextInput, Button, Container, Flex } from '@mantine/core';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { WelcomeChef } from '../components/WelcomeChef/WelcomeChef';
import { endpointUrl } from '@/api/endpointUrl';
import { useApiDishes } from '../hooks/useApiDishes';

const notOkMsg = "Couldn't fetch dishes from requested group";

function EditDishForm({ dish, closeModal }: { closeModal: Function } & { dish: { id: number, name: string, photoSrc: string } }) {
  const groupId = 1;
  const { edit } = useApiDishes(groupId);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: dish.name,
      photoSrc: dish.photoSrc,
    },
  });

  async function handleSubmit(values: any) {
    await edit.mutateAsync({
      dishId: dish.id,
      ...values,
    });
    closeModal();
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

function AddDishForm({ closeModal }: { closeModal: Function }) {
  const groupId = 1;
  const { add } = useApiDishes(groupId);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      photoSrc: '',
    },
  });

  async function handleSubmit(values: any) {
    await add.mutateAsync(values);
    closeModal();
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

function Dish({ dish, groupId, onClickEditDish }: any) {
  const { deleteById } = useApiDishes(groupId);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={dish.photoSrc || 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png'}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{dish.name}</Text>
      </Group>

      <Flex
        direction={{ base: 'row' }}
        gap={{ base: '8px' }}
      >
        <Button color="blue" fullWidth mt="md" radius="md" onClick={() => onClickEditDish(dish)}>
          Edit
        </Button>
        <Button
          color="red"
          fullWidth
          mt="md"
          radius="md"
          onClick={() => {
            deleteById.mutate(dish.id);
        }}>
          Delete
        </Button>
      </Flex>
    </Card>
  );
}

function DishesList({ isPending, error, data, groupId, onClickEditDish }) {
  const [searchQuery, setSearchQuery] = useState('');

  if (isPending) return 'Loading...';

  if (error?.message === notOkMsg) return notOkMsg;

  if (error) return `An error has occured: ${error.message}`;

  const dishes = searchQuery.length > 0 ? data.filter((dish: any) => dish.name.toLocaleLowerCase().match(searchQuery.toLocaleLowerCase())) : data;

  return (
    <Grid>
      <Grid.Col span={12}>
        <TextInput
          label="Wyszukaj danie"
          placeholder="np. szpinak"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </Grid.Col>
      {dishes.map((dish: any) => <Grid.Col span={{ base: 12, sm: 6 }} key={dish.id}><Dish dish={dish} groupId={groupId} onClickEditDish={onClickEditDish} /></Grid.Col>)}
    </Grid>
  );
}

export function DishesPage() {
  const groupId = 1;
  const { isPending, error, data } = useQuery({
    queryKey: ['dishes', groupId],
    queryFn: async () => {
      const response = await fetch(endpointUrl.dishes.getByGroupId(groupId));
      if (!response.ok) {
        throw new Error(notOkMsg);
      }
      return response.json();
    },
  });

  const [openedAddModal, { open: openAddModal, close: closeAddModal }] = useDisclosure(false);
  const [editDish, setEditDish] = useState();
  const [openedEditModal, { open: openEditModal, close: closeEditModal }] = useDisclosure(false);

  function onClickEditDish(dish: any) {
    setEditDish(dish);
    openEditModal();
  }

  return (
    <>
      <WelcomeChef />
      <Container px="16px" size="30rem" mt="lg">
        <Flex
          direction={{ base: 'column' }}
          gap={{ base: 'sm' }}
        >
          <Modal opened={openedAddModal} onClose={closeAddModal} title="Add new dish" centered>
            <AddDishForm closeModal={closeAddModal} />
          </Modal>
          <Modal opened={openedEditModal} onClose={closeEditModal} title="Edit new dish" centered>
            <EditDishForm closeModal={closeEditModal} dish={editDish} />
          </Modal>
          <Button color="green" fullWidth mt="md" radius="md" onClick={openAddModal}>
            Add new
          </Button>
          <DishesList isPending={isPending} error={error} data={data} groupId={groupId} onClickEditDish={onClickEditDish} />
        </Flex>
      </Container>
    </>
  );
}
