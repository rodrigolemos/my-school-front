import React, { FormEvent, ReactElement, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
import { AiOutlineWarning } from 'react-icons/ai';
import { getServerSidePropsUser } from '../../../utils/server-props';
import { AuthLayout } from '../../../components/auth-layout';
import { ICourseInput } from '../../../interfaces/ICourse';
import { schema } from '../add';
import { deleteCourse, postCourse } from '../../../services/coursesHttp';
import { defaultCategories, defaultResources } from '../../../data/courses';
import { CreatableSelect } from 'chakra-react-select';

interface ICourses {
  isAdmin: boolean;
  name: string;
}

export default function Courses({ isAdmin, name }: ICourses): ReactElement {
  const toast = useToast();
  const router = useRouter();
  const courseToEdit = useSelector<ICourseInput, ICourseInput>((state) => state);
  const { control, register, handleSubmit, errors } = useForm<ICourseInput>({
    resolver: yupResolver(schema),
    defaultValues: courseToEdit
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback(async (data: ICourseInput, event: FormEvent) => {
    event.preventDefault();
    data.id = courseToEdit.id;
    await postCourse(data, setLoading, router, toast, 'edit');
  }, []);

  const onDelete = useCallback(async (data: ICourseInput) => {
    await deleteCourse(data, setLoading, router, toast);
  }, []);

  return (
    <>
      <Head>
        <title>My School | Editar curso</title>
      </Head>
      <AuthLayout isAdmin={isAdmin} userName={name}>
        <VStack align="flex-start" w="full" spacing={6}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justifyContent="space-between"
            w="full">
            <Heading fontSize="3xl" my={4}>
              Editar curso
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
                      placeholder="tecnologia, música, lifestyle"
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
                <Input
                  id="icon"
                  name="icon"
                  placeholder="Ícone apresentado no site"
                  variant="filled"
                  minLength={3}
                  maxLength={40}
                  required
                  ref={register}
                />
                <FormErrorMessage>
                  {errors.icon && 'Preencha corretamente o ícone'}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.resources}>
                <FormLabel htmlFor="resources">Recursos</FormLabel>
                <Controller
                  name="resources"
                  id="resources"
                  control={control}
                  defaultValue=""
                  render={(props) => (
                    <CreatableSelect
                      {...props}
                      instanceId="resources"
                      placeholder="suporte online, atualizações"
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
                  Atualizar
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  colorScheme="red"
                  isLoading={loading}
                  leftIcon={<AiOutlineWarning />}
                  onClick={() => onDelete(courseToEdit)}>
                  Excluir
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
