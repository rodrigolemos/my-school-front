import React, { ReactElement, useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
// import { Cookies } from 'react-cookie';
import { checkAuth } from '../services/auth';
// import api from '../services/api';
import { checkPermission } from '../services/permission';
// import { useTheme } from '../hooks/theme';
import { CircularProgress } from '@material-ui/core';

import Layout from '../components/layout';
import Toast from '../components/toast';
import { Header, Content } from '../styles/pages/courses';

interface IServerUsers {
  name: string;
  isAdmin: boolean;
}

export default function Users({ name, isAdmin }: IServerUsers): ReactElement {
  const [loading /*setLoading*/] = useState<boolean>(false);
  const [error /*setError*/] = useState<string>();
  // const { theme } = useTheme();

  useEffect(() => {
    // ...
  }, []);

  return (
    <Layout isAdmin={isAdmin} title="Usuários">
      <Header>
        <div className="greeting">
          <h2>Bem vindo novamente, {name}!</h2>
          <h3>Esses são os seus cursos</h3>
        </div>
      </Header>
      <Content>
        {error && <Toast type="error" message={error} />}
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <h1>Cursos...</h1>
          </>
        )}
      </Content>
    </Layout>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps<IServerUsers> = async (context: any) => {
  try {
    checkAuth(context.req.cookies['@my-school:token']);
    const { id, name } = JSON.parse(context.req.cookies['@my-school:user']);
    const isAdmin = await checkPermission(context.req.cookies['@my-school:token'], id);
    return {
      props: {
        name,
        isAdmin
      }
    };
  } catch (err) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }
};
