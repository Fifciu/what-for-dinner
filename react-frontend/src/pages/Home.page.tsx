import { Grid, Skeleton, Container } from '@mantine/core';
import { Welcome } from '../components/Welcome/Welcome';
import { LoginForm } from '@/components/LoginForm/LoginForm';

export function HomePage() {
  return (
    <>
      <Welcome />
      <Container px={0} size="30rem" mt="lg">
        <LoginForm />
      </Container>
    </>
  );
}
