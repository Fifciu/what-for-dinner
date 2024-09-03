import { Title, Text } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center">
        Witaj w{' '}<br></br>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          &quot;Co na obiad?&quot;
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Czyli aplikacji dla gospodarstw domowych pozwalających łatwiej decydować{' '}
        o jutrzejszym wspólnym posiłku.
      </Text>
    </>
  );
}
