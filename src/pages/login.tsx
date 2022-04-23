import React, { useCallback, useEffect, useState, ReactElement } from 'react';
import { Cookies } from 'react-cookie';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { checkAuth } from '../services/auth';
import api from '../services/api';
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
  useMediaQuery,
  useToast
} from '@chakra-ui/react';
import { NavbarLogo, NavbarLogoOrange } from '../components/navbar';
import { Copywright } from '../components/footer';

export const avatars = [
  {
    name: 'User 1',
    url: '../images/avatars/avatar-3.png'
  },
  {
    name: 'User 2',
    url: '../images/avatars/avatar-4.png'
  },
  {
    name: 'User 3',
    url: '../images/avatars/avatar-5.png'
  },
  {
    name: 'User 4',
    url: '../images/avatars/avatar-6.png'
  },
  {
    name: 'User 5',
    url: '../images/avatars/avatar-7.png'
  }
];

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6)
});

export default function Login(): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const router = useRouter();
  const toast = useToast();
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { register, handleSubmit, errors } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });

  const { user } = router.query;

  const onSubmit = useCallback(async (data: IFormInput) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/sessions/create', data);
      if (response.status === 201) {
        const { id, name, token } = response.data;
        const cookies = new Cookies();

        cookies.set('@my-school:user', JSON.stringify({ id, name }));
        cookies.set('@my-school:token', token);

        router.push('/dashboard');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status == 401) {
          setError('Por favor, confira suas informações e tente novamente.');
        } else {
          setError('Por favor, tente novamente mais tarde.');
        }
      } else {
        setError('Houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.');
      }
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    window.history.pushState({}, null, '/login');
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

  useEffect(() => {
    user &&
      toast({
        title: 'Perfil criado com sucesso. Você já pode acessar a plataforma!',
        status: 'success',
        isClosable: true,
        position: 'top-right'
      });
  }, [user]);

  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} minH="100vh">
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
              <Heading>Faça seu login</Heading>
              <Text fontSize="lg" color="gray.600">
                Ainda não tem conta?{' '}
                <Link href="/create-profile">
                  <ChakraLink color="orange.500">Crie aqui!</ChakraLink>
                </Link>
              </Text>
            </VStack>
          </SlideFade>
          <VStack spacing={4} w="full">
            <FormControl>
              <FormLabel htmlFor="email">E-mail</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                autoFocus={!isMobile}
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
              Entrar
            </Button>
            <Link href="/">
              <Button variant="ghost" colorScheme="orange" w="full">
                Voltar
              </Button>
            </Link>
          </VStack>
        </VStack>
        {/* </SlideFade> */}
      </VStack>
    </SimpleGrid>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    checkAuth(context.req.cookies['@my-school:token']);
    return {
      props: {},
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    };
  } catch (err) {
    return {
      props: {}
    };
  }
};
