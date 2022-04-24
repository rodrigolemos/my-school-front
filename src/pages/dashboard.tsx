import React, { ReactElement } from 'react';
import Head from 'next/head';
import { SimpleGrid, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { getServerSidePropsUser } from '../utils/server-props';
import { IUser } from '../interfaces/IUser';
import { SidebarWithHeader } from '../components/auth-layout';

interface IDashboard {
  name: string;
  isAdmin: boolean;
  user: IUser;
}

export default function Dashboard({ name, isAdmin }: IDashboard): ReactElement {
  return (
    <SidebarWithHeader userName={name} isAdmin={isAdmin}>
      <Head>
        <title>My School | dashboard</title>
      </Head>
      <SimpleGrid columns={{ base: 1, md: 2 }} templateColumns={{ base: '100%', md: '70% 30%' }}>
        <Flex bg="gray.100" h="92vh" p={4} overflowY="auto">
          <VStack spacing={4} align="flex-start">
            <Heading>Bem vindo novamente, {name}!</Heading>
            <Text color="gray.500" fontSize="2xl">
              Essa é sua área logada. Pronto(a) para sua próxima tarefa?
            </Text>
          </VStack>
        </Flex>
        <Flex bg="gray.200" h="92vh" p={4}>
          <VStack spacing={12} align="flex-start">
            <Heading fontSize="3xl">Tarefas</Heading>
            <Image
              rounded="md"
              alt="feature image"
              src={`../images/${isAdmin ? 'multitasking' : 'studying'}.svg`}
            />
          </VStack>
        </Flex>
      </SimpleGrid>
    </SidebarWithHeader>
  );
}

export const getServerSideProps = getServerSidePropsUser;
