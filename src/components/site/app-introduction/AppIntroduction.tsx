import {
  Container,
  SimpleGrid,
  HStack,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon
} from '@chakra-ui/react';
import { SiNextdotjs, SiChakraui, SiNodedotjs } from 'react-icons/si';
import { FeatureProps, AppIntroductionProps } from './types';

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <HStack align="center">
      <Flex w={8} h={8} align="center" justify="center" rounded="full" bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight="bold">{text}</Text>
    </HStack>
  );
};

const AppIntroduction: React.FC<AppIntroductionProps> = ({ linkRef }) => {
  return (
    <Container maxW="full" py={20} px={0} ref={linkRef}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={7}>
          <Text
            textTransform="uppercase"
            color="blue.400"
            fontWeight="bold"
            fontSize="sm"
            bg="blue.50"
            p={2}
            alignSelf="flex-start"
            rounded="md">
            Nossa História
          </Text>
          <Heading>Uma plataforma de ensino, mas quem aprende é quem a desenvolve</Heading>
          <Text color="gray.500" fontSize="xl">
            A My School é uma plataforma fictícia de cursos online criada com o intuito de aplicar
            conceitos de desenvolvimento front-end e back-end, utilizando a mais moderna stack de
            desenvolvimento web do mercado. Nada disso é real, mas bem que poderia ser, né?
          </Text>
          <Heading fontSize="2xl" mb={2}>
            Stack
          </Heading>
          <Stack spacing={4} divider={<StackDivider borderColor="gray.100" />}>
            <Feature
              icon={<Icon as={SiNextdotjs} color="black" w={7} h={7} />}
              iconBg="white"
              text="React + Next.js"
            />
            <Feature
              icon={<Icon as={SiChakraui} color="teal.400" w={7} h={7} />}
              iconBg="white"
              text="ChakraUI"
            />
            <Feature
              icon={<Icon as={SiNodedotjs} color="green.400" w={7} h={7} />}
              iconBg="white"
              text="Node.js"
            />
          </Stack>
        </Stack>
        <Flex>
          <Image rounded="md" alt="feature image" src="images/development.svg" objectFit="cover" />
        </Flex>
      </SimpleGrid>
    </Container>
  );
};

export default AppIntroduction;
