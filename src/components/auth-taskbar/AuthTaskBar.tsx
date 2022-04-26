import React, { ReactElement } from 'react';
import { Flex, Heading, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react';
import { BiLineChart, BiSupport } from 'react-icons/bi';

type AuthTaskBarProps = {
  isAdmin: boolean;
};

const AuthTaskBar: React.FC<AuthTaskBarProps> = ({ isAdmin }): ReactElement => {
  return (
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
  );
};

export default AuthTaskBar;
