import React, { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Button, Flex, Heading, VStack, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import { getServerSidePropsUser } from '../../utils/server-props';
import { AuthLayout } from '../../components/auth-layout';

interface ICourses {
  isAdmin: boolean;
  name: string;
}

export default function Courses({ isAdmin, name }: ICourses): ReactElement {
  const toast = useToast();
  const [error] = useState<string>();

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
              Adicionar curso
            </Heading>
            <Link href="/courses">
              <Button variant="outline" colorScheme="orange">
                Cancelar
              </Button>
            </Link>
          </Flex>
          <SimpleGrid
            columns={{ base: 1, sm: 2, lg: 3 }}
            w="full"
            justifyContent="center"
            spacing={6}>
            <Text>Hello</Text>
          </SimpleGrid>
        </VStack>
      </AuthLayout>
    </>
  );
}

export const getServerSideProps = getServerSidePropsUser;
