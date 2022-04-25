import React, { ReactElement } from 'react';
import Head from 'next/head';
import {
  Box,
  SimpleGrid,
  Flex,
  Heading,
  HStack,
  List,
  ListItem,
  ListIcon,
  Icon,
  Image,
  SlideFade,
  Text,
  VStack
} from '@chakra-ui/react';
import { BiCheckCircle, BiLineChart, BiSupport } from 'react-icons/bi';
import { getServerSidePropsUser } from '../utils/server-props';
import { IUser } from '../interfaces/IUser';
import { SidebarWithHeader } from '../components/auth-layout';
import { DashboardChart } from '../components/dashboard-chart';

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
        <Flex bg="gray.50" minH="92vh" p={4} overflowY="auto">
          <VStack spacing={4} align="flex-start" w="full">
            <Heading>Bem vindo novamente, {name}!</Heading>
            <Text color="gray.500" fontSize="2xl">
              Essa é sua área logada. Pronto(a) para sua próxima tarefa?
            </Text>
            <SimpleGrid columns={{ base: 1, lg: 2 }} w="full" h="full">
              <VStack align="flex-start" h="full" p={{ base: 0, lg: 4 }}>
                <Flex
                  bg="gray.50"
                  w="full"
                  h="full"
                  borderRadius="xl"
                  px={{ base: 0, lg: 10 }}
                  py={{ base: 10, lg: 4 }}>
                  <SlideFade in={true} offsetX="-24px" offsetY="0px">
                    <VStack spacing={8} align="flex-start">
                      <Heading fontSize="3xl" color="primary.100">
                        Primeiro acesso
                      </Heading>
                      <SlideFade in={true} offsetX="-24px" offsetY="0px">
                        <List spacing={4} fontSize="xl">
                          <Flex alignItems="center">
                            <ListIcon as={BiCheckCircle} color="orange.500" />
                            <ListItem>Confirmar e-mail</ListItem>
                          </Flex>
                          <Flex alignItems="center">
                            <ListIcon as={BiCheckCircle} color="orange.500" />
                            <ListItem>Atualizar contato</ListItem>
                          </Flex>
                          <Flex alignItems="center">
                            <ListIcon as={BiCheckCircle} color="orange.500" />
                            <ListItem>Editar perfil</ListItem>
                          </Flex>
                        </List>
                      </SlideFade>
                    </VStack>
                  </SlideFade>
                </Flex>
              </VStack>
              <VStack align="flex-start" h="full" p={{ base: 0, lg: 4 }}>
                <Flex
                  bg="gray.50"
                  w="full"
                  h="full"
                  borderRadius="xl"
                  px={{ base: 0, lg: 10 }}
                  py={{ base: 10, lg: 4 }}>
                  <SlideFade in={true} offsetX="-24px" offsetY="0px">
                    <VStack spacing={8} align="flex-start">
                      <Heading fontSize="3xl" color="primary.100">
                        Próximos passos
                      </Heading>
                      <SlideFade in={true} offsetX="-24px" offsetY="0px">
                        <List spacing={4} fontSize="xl">
                          <Flex alignItems="center">
                            <ListIcon as={BiCheckCircle} color="orange.500" />
                            <ListItem>Resolver pendências</ListItem>
                          </Flex>
                          <Flex alignItems="center">
                            <ListIcon as={BiCheckCircle} color="orange.500" />
                            <ListItem>Finalizar tarefas</ListItem>
                          </Flex>
                          {/* <Flex alignItems="center">
                            <ListIcon as={BiCheckCircle} color="orange.500" />
                            <ListItem>Editar perfil</ListItem>
                          </Flex> */}
                        </List>
                      </SlideFade>
                    </VStack>
                  </SlideFade>
                </Flex>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Flex>
        <Flex bg="gray.200" minH="92vh" p={4}>
          <VStack spacing={16} align="flex-start">
            <Heading fontSize="3xl">Tarefas</Heading>
            <Image
              rounded="md"
              alt="feature image"
              src={`../images/${isAdmin ? 'multitasking' : 'studying'}.svg`}
            />
            <Flex
              p={6}
              w="full"
              align="flex-start"
              bg="white"
              borderRadius="md"
              boxShadow="md"
              position="relative">
              <Flex
                w={14}
                h={14}
                display="inline-flex"
                align="center"
                justify="center"
                color="white"
                rounded="full"
                bg="orange.500"
                shrink="0"
                boxShadow="md"
                position="absolute"
                right={4}
                top={-6}>
                <Icon as={BiLineChart} w={8} h={8} />
              </Flex>
              <VStack spacing={4} align="flex-start" w="full">
                <Heading fontSize="lg">Estatísticas</Heading>
                <HStack justifyContent="space-between" align="center" w="full">
                  <Text color="gray.500" fontSize="lg">
                    Matrículas pendentes
                  </Text>
                  <Text fontWeight="semibold" fontSize="lg">
                    2/10
                  </Text>
                </HStack>
                <HStack justifyContent="space-between" align="center" w="full">
                  <Text color="gray.500" fontSize="lg">
                    Cursos ativos
                  </Text>
                  <Text fontWeight="semibold" fontSize="lg">
                    8/8
                  </Text>
                </HStack>
                <HStack justifyContent="space-between" align="center" w="full">
                  <Text color="gray.500" fontSize="lg">
                    Usuários cadastrados
                  </Text>
                  <Text fontWeight="semibold" fontSize="lg">
                    13
                  </Text>
                </HStack>
              </VStack>
            </Flex>

            {isAdmin && (
              <Flex
                p={6}
                w="full"
                align="flex-start"
                bg="white"
                borderRadius="md"
                boxShadow="md"
                position="relative">
                <Flex
                  w={14}
                  h={14}
                  display="inline-flex"
                  align="center"
                  justify="center"
                  color="white"
                  rounded="full"
                  bg="orange.500"
                  shrink="0"
                  boxShadow="md"
                  position="absolute"
                  right={4}
                  top={-6}>
                  <Icon as={BiSupport} w={8} h={8} />
                </Flex>
                <VStack spacing={4} align="flex-start" w="full">
                  <Heading fontSize="lg">Suporte</Heading>
                  <HStack justifyContent="space-between" align="center" w="full">
                    <Text color="gray.500" fontSize="lg">
                      Chamados finalizados
                    </Text>
                    <Text fontWeight="semibold" fontSize="lg">
                      4/4
                    </Text>
                  </HStack>
                </VStack>
              </Flex>
            )}
          </VStack>
        </Flex>
      </SimpleGrid>
    </SidebarWithHeader>
  );
}

export const getServerSideProps = getServerSidePropsUser;
