import React, { FormEvent, ReactElement, useCallback, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Heading,
  HStack,
  VStack,
  SimpleGrid,
  useToast
} from '@chakra-ui/react';
import { CreatableSelect } from 'chakra-react-select';
import { getServerSidePropsUser } from '../../utils/server-props';
import { AuthLayout } from '../../components/auth-layout';
import { postCourse } from '../../services/coursesHttp';
import { ICourseInput } from '../../interfaces/ICourse';
import { defaultCategories, defaultResources } from '../../data/courses';

export const schema = yup.object().shape({
  name: yup.string().required().min(6),
  audience: yup.string(),
  knowledge: yup.string(),
  description: yup.string().required().min(6)
});
interface ICourses {
  isAdmin: boolean;
  name: string;
}

export default function Courses({ isAdmin, name }: ICourses): ReactElement {
  const toast = useToast();
  const router = useRouter();
  const { control, register, handleSubmit, errors } = useForm<ICourseInput>({
    resolver: yupResolver(schema)
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async (data: ICourseInput, event: FormEvent) => {
    event.preventDefault();
    await postCourse(data, setLoading, router, toast, 'add');
  }, []);

  return (
    <>
      <Head>
        <title>My School | Criar curso</title>
      </Head>
      <AuthLayout isAdmin={isAdmin} userName={name}>
        <VStack align="flex-start" w="full" spacing={6}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justifyContent="space-between"
            w="full">
            <Heading fontSize="3xl" my={4}>
              Criar curso
            </Heading>
            <Link href="/courses">
              <Button variant="outline" colorScheme="orange">
                Cancelar
              </Button>
            </Link>
          </Flex>
          <VStack spacing={4} w="full" as="form" onSubmit={handleSubmit(onSubmit)}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} w="full" justifyContent="center" spacing={6}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nome apresentado no site"
                  variant="filled"
                  autoFocus
                  minLength={3}
                  maxLength={50}
                  required
                  ref={register}
                />
                <FormErrorMessage>{errors.name && 'Preencha corretamente o nome'}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.tags}>
                <FormLabel htmlFor="tags">Categoria</FormLabel>
                <Controller
                  name="tags"
                  id="tags"
                  control={control}
                  defaultValue=""
                  render={(props) => (
                    <CreatableSelect
                      {...props}
                      instanceId="tags"
                      placeholder="Tecnologia, música, lifestyle"
                      isMulti
                      options={defaultCategories}
                      ref={register}
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.tags && 'Preencha corretamente a categoria'}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.icon}>
                <FormLabel htmlFor="icon">Ícone</FormLabel>
                <Controller
                  name="icon"
                  id="icon"
                  control={control}
                  defaultValue=""
                  render={(props) => (
                    <CreatableSelect
                      {...props}
                      instanceId="icon"
                      placeholder="Ícone apresentado no site"
                      options={defaultCategories}
                      ref={register}
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.icon && 'Preencha corretamente o ícone'}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.resources}>
                <FormLabel htmlFor="resources">Assuntos</FormLabel>
                <Controller
                  name="resources"
                  id="resources"
                  control={control}
                  defaultValue=""
                  render={(props) => (
                    <CreatableSelect
                      {...props}
                      instanceId="resources"
                      placeholder="Assuntos abordados"
                      isMulti
                      options={defaultResources}
                      ref={register}
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.resources && 'Preencha corretamente os recursos'}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.audience}>
                <FormLabel htmlFor="audience">Público</FormLabel>
                <Input
                  id="audience"
                  name="audience"
                  placeholder="Curso ideal para..."
                  variant="filled"
                  minLength={3}
                  maxLength={40}
                  ref={register}
                />
                <FormErrorMessage>
                  {errors.audience && 'Preencha corretamente o público'}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.knowledge}>
                <FormLabel htmlFor="knowledge">Conhecimento</FormLabel>
                <Input
                  id="knowledge"
                  name="knowledge"
                  placeholder="Necessário conhecimento prévio em..."
                  variant="filled"
                  minLength={3}
                  maxLength={40}
                  ref={register}
                />
                <FormErrorMessage>
                  {errors.knowledge && 'Preencha corretamente o conhecimento'}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.description}
                gridColumnStart={1}
                gridColumnEnd={{ base: 1, lg: 3 }}>
                <FormLabel htmlFor="description">Descrição</FormLabel>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Descrição apresentada no site"
                  variant="filled"
                  minLength={3}
                  maxLength={500}
                  required
                  ref={register}
                />
                <FormErrorMessage>
                  {errors.description && 'Preencha corretamente a descrição'}
                </FormErrorMessage>
              </FormControl>

              <HStack justify={{ base: 'center', lg: 'flex-start' }}>
                <Button
                  type="submit"
                  variant="solid"
                  size="lg"
                  colorScheme="orange"
                  isLoading={loading}>
                  Criar
                </Button>
              </HStack>
            </SimpleGrid>
          </VStack>
        </VStack>
      </AuthLayout>
    </>
  );
}

export const getServerSideProps = getServerSidePropsUser;
