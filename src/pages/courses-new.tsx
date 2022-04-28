import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  VStack,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useToast
} from '@chakra-ui/react';
import { GiBookPile } from 'react-icons/gi';
import { getServerSidePropsUser } from '../utils/server-props';
import { AuthLayout } from '../components/auth-layout';
import { ICourse } from '../interfaces/ICourse';
import api from '../services/api';
import { simpleDate } from '../utils/date';

interface ICourses {
  isAdmin: boolean;
  name: string;
}

export default function Courses({ isAdmin, name }: ICourses): ReactElement {
  const toast = useToast();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const fetchCourses = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get<ICourse[]>('/courses');
      if (response.status !== 200) throw new Error();

      setCourses(response.data);
    } catch (error) {
      if (error.response) {
        setError('Não foi possível listar os cursos. Por favor, tente novamente mais tarde.');
      } else {
        setError('Houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.');
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    error &&
      toast({
        title: error,
        status: 'error',
        isClosable: true,
        position: 'top-right'
      });
  }, [error]);

  return (
    <>
      <Head>
        <title>My School | Cursos</title>
      </Head>
      <AuthLayout isAdmin={isAdmin} userName={name}>
        <VStack align="flex-start" w="full" spacing={6}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justifyContent="space-between"
            w="full">
            <Heading fontSize="3xl" my={4}>
              Gerenciamento de cursos
            </Heading>
            <Button variant="outline" colorScheme="orange">
              Criar Curso
            </Button>
          </Flex>
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 3 }}
            w="full"
            justifyContent="center"
            spacing={6}>
            {loading ? (
              <>
                <Skeleton py={10} />
                <Skeleton py={10} />
                <Skeleton py={10} />
              </>
            ) : (
              <>
                {courses.map((course) => (
                  <HStack
                    key={course.id}
                    borderColor="gray.300"
                    borderWidth="thin"
                    borderRadius="md"
                    spacing={4}
                    px={4}
                    py={6}
                    cursor="pointer"
                    _hover={{
                      transition: 'all 0.2s ease-in-out',
                      transform: 'translateY(-1px)',
                      boxShadow: 'lg'
                    }}>
                    <Flex
                      w={14}
                      h={14}
                      align="center"
                      justify="center"
                      color="white"
                      rounded="full"
                      bg="orange.500"
                      shrink="0">
                      <Icon as={GiBookPile} w={8} h={8} />
                    </Flex>
                    <Stack>
                      <Text fontWeight="bold">{course.name}</Text>
                      <Text fontSize="sm">Atualizado em {simpleDate(course.updated_at)}</Text>
                    </Stack>
                  </HStack>
                ))}
              </>
            )}
          </SimpleGrid>
        </VStack>
      </AuthLayout>
    </>
  );
}

export const getServerSideProps = getServerSidePropsUser;
