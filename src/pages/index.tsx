import React, { ReactElement, useRef } from 'react';
import { FaUserGraduate, FaUsersCog, FaUserTie } from 'react-icons/fa';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  SlideFade,
  Text,
  VStack
} from '@chakra-ui/react';
import PublicLayout from '../components/public-layout';
import HomeFeatures from '../components/home-features';

type SectionProps = {
  children: ReactElement | ReactElement[];
  id?: string;
};

const Section: React.FC<SectionProps> = ({ children, id }) => {
  return (
    <VStack
      id={id}
      align="flex-start"
      justify="center"
      p={[8, 8, 0]}
      w={{ base: 'full', md: '90%', lg: '70%' }}
      minH="90vh">
      {children}
    </VStack>
  );
};

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <VStack spacing={6}>
      <Flex
        w={20}
        h={20}
        align="center"
        justify="center"
        color="white"
        rounded="full"
        bg="orange.500">
        {icon}
      </Flex>
      <Text fontSize="2xl" fontWeight="bold">
        {title}
      </Text>
      <Text fontSize="xl" color="gray.600" align={['center', 'start']}>
        {text}
      </Text>
    </VStack>
  );
};

export default function Home(): ReactElement {
  const featuresRef = useRef<HTMLDivElement>(null);
  const scrollToFeatures = () => {
    featuresRef.current.scrollIntoView({
      block: 'nearest',
      behavior: 'smooth'
    });
  };

  return (
    <PublicLayout>
      <Flex
        w="full"
        justify="center"
        bgGradient="linear-gradient(rgba(0, 0, 0, 0.61), rgba(0, 0, 0, 0.61)), url('images/bookshelf-1.jpg')"
        backgroundSize="cover">
        <Section>
          <SlideFade in={true} offsetY="-24px">
            <VStack align="flex-start" spacing={8} color="white">
              <VStack align="flex-start" spacing={3}>
                <Heading fontSize={['5xl', '7xl']}>My School</Heading>
                <Text fontSize={['2xl', '4xl']}>Compartilhe seu conhecimento com o mundo.</Text>
              </VStack>
              <Button
                onClick={scrollToFeatures}
                variant="outline"
                size="lg"
                _hover={{ color: 'orange.500', bg: 'white' }}>
                Saiba mais
              </Button>
            </VStack>
          </SlideFade>
        </Section>
      </Flex>
      <Section>
        <HomeFeatures linkRef={featuresRef} />
        <Flex w="full" justify="center" py={10}>
          <Heading>Uma ideia simples</Heading>
        </Flex>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={14}>
          <Feature
            icon={<Icon as={FaUserGraduate} w={10} h={10} />}
            title="Para alunos"
            text="Matricule-se nos cursos ofertados, assista as aulas disponíveis na plataforma e contribua para a comunidade nos fóruns."
          />
          <Feature
            icon={<Icon as={FaUsersCog} w={10} h={10} />}
            title="Para professores"
            text="Crie suas aulas com diversos recursos de imagem e vídeo, proponha temas de discussão e avalie seus alunos facilmente."
          />
          <Feature
            icon={<Icon as={FaUserTie} w={10} h={10} />}
            title="Para monitores"
            text="Gerencie os recursos da plataforma incluindo, alterando ou excluindo cursos, alunos, professores e matrículas."
          />
        </SimpleGrid>
      </Section>
    </PublicLayout>
  );
}
