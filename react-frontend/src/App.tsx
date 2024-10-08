import '@mantine/core/styles.css';
import { MantineProvider, Container } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './Router';
import { theme } from './theme';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Container py={100}>
        <Router />
        </Container>
      </MantineProvider>
    </QueryClientProvider>
  );
}
