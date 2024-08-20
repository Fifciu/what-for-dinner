import { Title, Text } from '@mantine/core';
import classes from './Welcome.module.css';

export function WelcomeChef() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Hello{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Chef
        </Text>
      </Title>
      <Title order={4} ta="center">
          Co robimy?
      </Title>
    </>
  );
}
