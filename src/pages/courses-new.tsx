import React, { ReactElement } from 'react';
import Head from 'next/head';
import { Heading, SimpleGrid } from '@chakra-ui/react';
import { getServerSidePropsUser } from '../utils/server-props';
import { AuthLayout } from '../components/auth-layout';

interface ICourses {
  isAdmin: boolean;
  name: string;
}

export default function Courses({ isAdmin, name }: ICourses): ReactElement {
  return (
    <>
      <Head>
        <title>My School | Cursos</title>
      </Head>
      <AuthLayout isAdmin={isAdmin} userName={name}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} w="full" h="full">
          <Heading>Gerenciamento de cursos</Heading>
        </SimpleGrid>
      </AuthLayout>
    </>
  );
}

export const getServerSideProps = getServerSidePropsUser;
