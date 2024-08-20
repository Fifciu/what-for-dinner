import { Text, Divider, Button, Container, Flex } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { WelcomeChef } from '../components/WelcomeChef/WelcomeChef';

export function ChefPage() {
  const [dinnerName, setDinnerName] = useState('');
  const hasPlannedDinner = dinnerName?.length > 0;
  const navigate = useNavigate();

  function onSelectDinnerClick() {
    if (!hasPlannedDinner) {
      navigate('/chef/select-dinner');
      return;
    }
    if (window.confirm('Czy na pewno chcesz zmienić zaplanowany obiad?')) {
      navigate('/chef/select-dinner');
    }
  }

  function onSelectCreatePoll() {
    if (!hasPlannedDinner) {
      navigate('/chef/create-poll');
      return;
    }
    if (window.confirm('Czy na pewno chcesz zmienić zaplanowany obiad robiąc nową ankietę?')) {
      navigate('/chef/screate-poll');
    }
  }

  return (
    <>
      <WelcomeChef />
      <Container px={0} size="30rem" mt="lg">
        <Flex
          direction={{ base: 'column' }}
          gap={{ base: 'sm' }}
        >
          {hasPlannedDinner && <Text ta="center">Danie zaplanowane na jutrzejszy obiad to: <b>{dinnerName}</b></Text>}
          <Button variant="filled" onClick={onSelectDinnerClick}>{hasPlannedDinner ? 'Zmień obiad' : 'Wybierz obiad'}</Button>
          <Button variant="filled" onClick={onSelectCreatePoll}>{hasPlannedDinner ? 'Zrób nowe głosowanie' : 'Zrób głosowanie'}</Button>
          <Divider my="xl" />
          <Button variant="filled">Zarządzaj zbiorem dań</Button>
          <Button variant="filled" onClick={() => navigate('/')}>Wyloguj sie</Button>
        </Flex>
      </Container>
    </>
  );
}
