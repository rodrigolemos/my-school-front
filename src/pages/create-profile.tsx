import React, { ReactElement, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Avatar,
  AvatarGroup,
  Button,
  Flex,
  Heading,
  HStack,
  Link as ChakraLink,
  Text,
  SimpleGrid,
  VStack,
  useBreakpointValue,
  FormControl,
  FormLabel,
  Input,
  SlideFade,
  FormErrorMessage,
  useMediaQuery
} from '@chakra-ui/react';
import { NavbarLogo, NavbarLogoOrange } from '../components/navbar';
import { Copywright } from '../components/footer';

import api from '../services/api';
import Toast from '../components/toast';
import { avatars } from './login';

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6)
});

export default function CreateProfile(): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const router = useRouter();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { register, handleSubmit, errors } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback(async (data: IFormInput) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/users/create', data);
      if (response.status === 201) {
        router.push('/login?user=created');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status == 400 || error.response.status == 401) {
          setError(
            'Ops, não foi possível criar o seu perfil. Por favor, confira suas informações e tente novamente.'
          );
        } else {
          setError(
            'Ops, não foi possível criar o seu perfil. Por favor, tente novamente mais tarde.'
          );
        }
      } else {
        setError(
          'Ops, houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.'
        );
      }
      setLoading(false);
    }
  }, []);

  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} minH="100vh">
      {error && <Toast type="error" message={error} />}
      <VStack
        justify="flex-start"
        align="flex-start"
        py={{ base: 8, sm: 12 }}
        px={{ base: 4, sm: 16 }}
        display={{ base: 'none', sm: 'flex' }}
        h="full"
        bg="orange.600"
        color="white">
        <VStack justify="space-between" align="flex-start" h="full">
          <NavbarLogo />
          <VStack align="flex-start" spacing={4}>
            <Heading fontSize="6xl">Comece a estudar hoje</Heading>
            <Text fontSize="2xl">Crie sua conta e faça parte da comunidade</Text>

            <HStack spacing={4} pt={4} align="center">
              <AvatarGroup>
                {avatars.map((avatar) => (
                  <Avatar
                    key={avatar.url}
                    src={avatar.url}
                    size={useBreakpointValue({ base: 'md', md: 'lg' })}
                    position="relative"
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: 'full',
                      height: 'full',
                      rounded: 'full',
                      transform: 'scale(1.125)',
                      bgGradient: 'linear(to-bl, orange.400, orange.600)',
                      position: 'absolute',
                      zIndex: -1,
                      top: 0,
                      left: 0
                    }}
                  />
                ))}
              </AvatarGroup>
              <Text fontSize="2xl">+ você!</Text>
            </HStack>
          </VStack>
          <Copywright />
        </VStack>
      </VStack>
      <VStack justify="center" px={{ base: 4, sm: 20 }}>
        <VStack
          spacing={10}
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          w={{ base: '100%', lg: '50%' }}>
          <Flex display={{ base: 'flex', sm: 'none' }}>
            <NavbarLogoOrange />
          </Flex>
          <SlideFade in={true} offsetX="-24px" offsetY="0px">
            <VStack spacing={4}>
              <Heading>Crie sua conta</Heading>
              <Text fontSize="lg" color="gray.600">
                Já tem conta?{' '}
                <Link href="/login">
                  <ChakraLink color="orange.500">Faça seu login!</ChakraLink>
                </Link>
              </Text>
            </VStack>
          </SlideFade>
          <VStack spacing={4} w="full">
            <FormControl>
              <FormLabel htmlFor="name">Nome</FormLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Seu Nome"
                autoFocus={!isMobile}
                minLength={3}
                maxLength={50}
                required
                ref={register}
              />
              <FormErrorMessage>{errors.name && 'Preencha corretamente o nome'}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                minLength={3}
                maxLength={50}
                required
                ref={register}
              />
              <FormErrorMessage>
                {errors.email && 'Preencha corretamente o e-mail'}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                minLength={6}
                maxLength={100}
                autoComplete=""
                required
                ref={register}
              />
              <FormErrorMessage>
                {errors.password && 'Preencha corretamente a senha'}
              </FormErrorMessage>
            </FormControl>
          </VStack>
          <VStack spacing={4} w="full">
            <Button type="submit" variant="solid" colorScheme="orange" w="full" isLoading={loading}>
              Criar Conta
            </Button>
            <Link href="/">
              <Button variant="ghost" colorScheme="orange" w="full">
                Cancelar
              </Button>
            </Link>
          </VStack>
        </VStack>
      </VStack>
    </SimpleGrid>
  );
}
