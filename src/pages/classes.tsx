import React, { ReactElement, useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Cookies } from 'react-cookie';
import { checkAuth } from '../services/auth';
import api from '../services/api';
import { checkPermission } from '../services/permission';
import { CircularProgress } from '@material-ui/core';

import Layout from '../components/layout';
import Toast from '../components/toast';
import { Header, Content, Card } from '../styles/pages/classes';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface ICourse {
  id: string;
  name: string;
  period: string;
  positions: number;
  created_by: IUser;
}
interface IEnrollment {
  user_id: IUser;
  course_id: ICourse;
  positions: number;
  created_at: Date;
  updated_at: Date;
  status: string;
}

interface IServerUsers {
  name: string;
  isAdmin: boolean;
}

export default function Users({ name, isAdmin }: IServerUsers): ReactElement {
  const [enrollments, setEnrollments] = useState<IEnrollment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const fetchCourses = async (): Promise<void> => {
    setLoading(true);
    setError('');

    try {
      const cookies = new Cookies();
      const token = cookies.get('@my-school:token');
      const { id } = cookies.get('@my-school:user');

      const response = await api.get<IEnrollment[]>(`/enrollments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status !== 200) throw new Error();

      setEnrollments(response.data);
    } catch (error) {
      if (error.response) {
        setError(
          'Ops, não foi possível listar os seus cursos. Por favor, tente novamente mais tarde.'
        );
      } else {
        setError(
          'Ops, houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.'
        );
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
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
            {enrollments.map((enrollment: IEnrollment) => (
              <Card
                key={`${enrollment.user_id.id}-${enrollment.course_id.id}`}
                className="themed-aux">
                <h2>{enrollment.course_id.name}</h2>
              </Card>
            ))}
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
