import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Cookies } from 'react-cookie';
import {
  Button,
  Container,
  SimpleGrid,
  HStack,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  VStack,
  Icon
} from '@chakra-ui/react';
import { BiGlobe } from 'react-icons/bi';
import api from '../../services/api';
import { checkPermission } from '../../services/permission';
import Toast from '../../components/toast';
import PublicLayout from '../../components/public-layout';
import { ICourse, SelectType } from '../../interfaces/ICourse';
import { IEnrollment } from '../../interfaces/IEnrollment';

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
      p={[8, 8, 12]}
      w={{ base: 'full', md: '90%', lg: '70%' }}>
      {children}
    </VStack>
  );
};

interface CourseDetailProps {
  course: ICourse;
}

type CoursePaths = ICourse[];

export default function CourseDetail({ course }: CourseDetailProps): ReactElement {
  const router = useRouter();
  const [loadingEnrollment, setLoadingEnrollment] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  const validateEnrollment = async (): Promise<void> => {
    setLoadingEnrollment(true);
    try {
      const cookies = new Cookies();
      const { id } = cookies.get('@my-school:user');
      const token = cookies.get('@my-school:token');
      const isAdmin = await checkPermission(token, id);

      if (isAdmin) {
        setMessage(
          'Parece que você é um administrador. Não é necessário se matricular neste curso.'
        );
        setLoadingEnrollment(false);
      } else {
        const data = {
          course_id: course.id,
          user_id: id,
          id
        };

        const response = await api.post<IEnrollment>(`/enrollments/create`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 201) {
          router.push('/dashboard?enrollment=created');
        }
      }
    } catch (err) {
      setLoadingEnrollment(false);
      router.push('/login');
    }
  };

  return (
    <PublicLayout>
      {message && <Toast type="success" message={message} />}
      <Section>
        <Container maxW="full" py={[4, 4, 16]} px={0}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={16}>
            <Flex>
              <Image
                rounded="md"
                alt="feature image"
                src="../images/course-detail-3.svg"
                objectFit="cover"
              />
            </Flex>
            <Stack spacing={8}>
              {course?.tags && (
                <HStack>
                  {course?.tags.map((tag: SelectType) => (
                    <Text
                      key={tag.value}
                      textTransform="uppercase"
                      color="blue.400"
                      fontWeight="bold"
                      fontSize="sm"
                      bg="blue.50"
                      p={2}
                      alignSelf="flex-start"
                      rounded="md">
                      {tag.label}
                    </Text>
                  ))}
                </HStack>
              )}
              <Heading>{course?.name}</Heading>
              <Text color="gray.500" fontSize="xl">
                {course?.description}
              </Text>
              {course?.resources && (
                <>
                  <Heading fontSize="2xl" mb={2}>
                    Recursos
                  </Heading>
                  <Stack spacing={4} divider={<StackDivider borderColor="gray.100" />}>
                    {course?.resources.map((resource: SelectType) => (
                      <HStack align="center" key={resource.value}>
                        <Flex w={8} h={8} align="center" justify="center" rounded="full" bg="white">
                          <Icon as={BiGlobe} color="black" w={7} h={7} />
                        </Flex>
                        <Text fontWeight="bold">{resource.label}</Text>
                      </HStack>
                    ))}
                  </Stack>
                </>
              )}
              <HStack align="center" justify="center" pt={4}>
                <Button
                  variant="solid"
                  size="lg"
                  colorScheme="orange"
                  mr={8}
                  onClick={validateEnrollment}
                  isLoading={loadingEnrollment}>
                  Matricule-se
                </Button>
                <Link href="/course-list">
                  <Button variant="ghost" size="lg" colorScheme="orange">
                    Voltar
                  </Button>
                </Link>
              </HStack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Section>
    </PublicLayout>
  );
}

export const getStaticProps: GetStaticProps<unknown> = async (context) => {
  try {
    const response = await api.get<CourseDetailProps>(`/courses/${context.params.slug}`);

    if (response.status !== 200) throw new Error();

    const course: CourseDetailProps = response.data[0];

    return {
      props: {
        course
      },
      revalidate: 3600
    };
  } catch (err) {
    return {
      props: {
        course: {} as CourseDetailProps,
        error: 'Curso não encontrado. Tente novamente mais tarde.'
      }
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get<CoursePaths>('/courses/');

  if (response.status !== 200) throw new Error();

  const courses: CoursePaths = response.data;

  const paths = courses.map((course) => {
    return {
      params: {
        slug: course.id
      }
    };
  });

  return {
    paths,
    fallback: true
  };
};
