import React from 'react';
import { FaUserGraduate, FaUsersCog, FaUserTie } from 'react-icons/fa';
import { Flex, Heading, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FeatureProps } from './types';

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

const AppFeatures: React.FC = () => {
  return (
    <>
      <Flex w="full" justify="center">
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
    </>
  );
};

export default AppFeatures;
