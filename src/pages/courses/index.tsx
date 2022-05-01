import React, { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
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
import { getServerSidePropsUser } from '../../utils/server-props';
import { AuthLayout } from '../../components/auth-layout';
import { ICourse } from '../../interfaces/ICourse';
import { simpleDate } from '../../utils/date';
import { selectCourse } from '../../actions';
import { fetchCourses } from '../../services/coursesHttp';
import { getIcon } from '../../data/courses';

interface ICourses {
  isAdmin: boolean;
  name: string;
}

export default function Courses({ isAdmin, name }: ICourses): ReactElement {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourse[]>([]);

  const setCourseToEdit = (course: ICourse) => {
    dispatch(selectCourse(course));
    router.push(`/courses/${course.id}/edit`);
  };

  useEffect(() => {
    fetchCourses(setLoading, setCourses, toast);
  }, []);

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
            <Link href="/courses/add">
              <Button variant="outline" colorScheme="orange">
                Criar Curso
              </Button>
            </Link>
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
                    onClick={() => setCourseToEdit(course)}
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
                      <Icon as={getIcon(course?.icon?.value)} w={8} h={8} />
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
