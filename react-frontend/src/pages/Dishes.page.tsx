import { Text, Grid, Card, Image, Group, TextInput, Button, Container, Flex } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WelcomeChef } from '../components/WelcomeChef/WelcomeChef';
import { endpointUrl } from '@/api/endpointUrl';

const notOkMsg = "Couldn't fetch dishes from requested group";

function Dish({ dish }: any) {
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
        <Button color="blue" fullWidth mt="md" radius="md">
          Edit
        </Button>
        <Button color="red" fullWidth mt="md" radius="md">
          Delete
        </Button>
      </Flex>
    </Card>
  );
}

function DishesList({ isPending, error, data }) {
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
      {dishes.map((dish: any) => <Grid.Col span={{ base: 12, sm: 6 }}><Dish dish={dish} /></Grid.Col>)}
    </Grid>
  );
}

export function DishesPage() {
  const groupId = 1;
  const { isPending, error, data } = useQuery({
    queryKey: ['dishes', groupId],
    queryFn: async () => {
      const response = await fetch(`${endpointUrl.dishes.getByGroupId(groupId)}`);
      if (!response.ok) {
        throw new Error(notOkMsg);
      }
      return response.json();
    },
  });

  return (
    <>
      <WelcomeChef />
      <Container px="16px" size="30rem" mt="lg">
        <Flex
          direction={{ base: 'column' }}
          gap={{ base: 'sm' }}
        >
          <Button color="green" fullWidth mt="md" radius="md">
            Add new
          </Button>
          <DishesList isPending={isPending} error={error} data={data} />
        </Flex>
      </Container>
    </>
  );
}
