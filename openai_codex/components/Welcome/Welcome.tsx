import { Title, Text, Anchor } from '@mantine/core';
import useStyles from './Welcome.styles';

export function Welcome() {
  const { classes } = useStyles();

  return (
    <>
      <Title className={classes.title} align="center" mt={100}>
        Welcome to a Simple, Sexy{' '}
        <Text inherit variant="gradient" component="span">
          <a href="https://nextjs.org/docs">Next</a>-<a href="https://www.prisma.io/docs">Prisma</a>-<a href="https://mantine.dev/">Mantine</a>
        </Text>
        {' '}Stack of Awesomeness
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
        This starter Next.js project includes a minimal setup for server side rendering, if you want
        to learn more on Mantine + Next.js integration follow{' '}
        <Anchor href="https://mantine.dev/guides/next/" size="lg">
          this guide
        </Anchor>
        . To get started edit index.tsx file.
      </Text>
    </>
  );
}
