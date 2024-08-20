import { Flex, Button, useMantineColorScheme, TextInput, PasswordInput, Tooltip, Center, Text, rem } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const navigate = useNavigate();
  function onSubmit(event: any) {
    event.preventDefault();
    navigate('/chef');
  }
  return (
    <form onSubmit={onSubmit}>
      <Flex
        direction={{ base: 'column' }}
        gap={{ base: 'sm' }}
      >
      <TextInput
        label="Pseudonim"
        placeholder="np. jessica"
      />
      <TextInput
        label="Hasło"
        type="password"
      />
      <Button variant="filled" type="submit">Zaloguj się</Button>
      </Flex>
    </form>
  );
}
