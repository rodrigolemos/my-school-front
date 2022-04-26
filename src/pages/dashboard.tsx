import React, { ReactElement } from 'react';
import Head from 'next/head';
import { SimpleGrid } from '@chakra-ui/react';
import { getServerSidePropsUser } from '../utils/server-props';
import { AuthLayout } from '../components/auth-layout';
import DashboardCard from '../components/dashboard-card';

const firstAccess = {
  admin: [
    {
      icon: '',
      text: 'Atualizar contato'
    },
    {
      icon: '',
      text: 'Confirmar e-mail'
    },
    {
      icon: '',
      text: 'Editar perfil'
    }
  ]
};

const nextSteps = {
  admin: [
    {
      icon: '',
      text: 'Resolver pendências'
    },
    {
      icon: '',
      text: 'Finalizar tarefas'
    }
  ]
};

interface IDashboard {
  isAdmin: boolean;
  name: string;
}

export default function Dashboard({ isAdmin, name }: IDashboard): ReactElement {
  return (
    <>
      <Head>
        <title>My School | Dashboard</title>
      </Head>
      <AuthLayout isAdmin={isAdmin} userName={name}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} w="full" h="full">
          <DashboardCard title="Primeiro acesso" listItems={firstAccess.admin} />
          <DashboardCard title="Próximos passos" listItems={nextSteps.admin} />
        </SimpleGrid>
      </AuthLayout>
    </>
  );
}

export const getServerSideProps = getServerSidePropsUser;
