import React, { ReactElement } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import {
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';
import { GiBookPile } from 'react-icons/gi';
import { simpleDate } from '../utils/date';
import api from '../services/api';

import PublicLayout from '../components/public-layout';
import { ICourse } from '../interfaces/ICourse';
// import { getIcon } from '../data/courses';

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

interface CourseListProps {
  courses: ICourse[];
  error?: string;
}

export default function CourseList({ error, courses }: CourseListProps): ReactElement {
  return (
    <PublicLayout>
      <Section>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} cursor="default">
          <Stack spacing={4} justify="center">
            <Heading fontSize="5xl">Conheça nossos cursos</Heading>
            <Text color="gray.500" fontSize="2xl">
              {error ||
                'Escolha o caminho que mais te agrada e torne-se um profissional requisitado.'}
            </Text>
          </Stack>
          <Flex>
            <Image
              rounded="md"
              alt="feature image"
              src="images/course-list.svg"
              objectFit="cover"
            />
          </Flex>
        </SimpleGrid>
      </Section>
      <Section>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
          {courses.map((course: ICourse) => (
            <Link href={`/course-detail/${course.id}`} key={course.id}>
              <HStack
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
                  {/* <Icon as={getIcon(course?.icon.value)} w={8} h={8} /> */}
                </Flex>
                <Stack>
                  <Text fontWeight="bold">{course.name}</Text>
                  <Text fontSize="sm">Atualizado em {simpleDate(course.updated_at)}</Text>
                </Stack>
              </HStack>
            </Link>
          ))}
        </SimpleGrid>
      </Section>
    </PublicLayout>
  );
}

export const getStaticProps: GetStaticProps<unknown> = async () => {
  try {
    const response = await api.get<CourseListProps>('/courses');

    if (response.status !== 200) throw new Error();

    const courses: CourseListProps = response.data;

    return {
      props: {
        courses
      },
      revalidate: 3600 * 24
    };
  } catch (err) {
    return {
      props: {
        courses: [],
        error: 'Nenhum curso cadastrado. Tente novamente mais tarde.'
      }
    };
  }
};
