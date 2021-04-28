import React, { ReactElement, useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookies } from 'react-cookie';
import api from '../services/api';
import { getServerSidePropsUser } from '../utils/server-props';
import { CircularProgress } from '@material-ui/core';

import Layout from '../components/layout';
import Toast from '../components/toast';
import { Header, Content, Card } from '../styles/pages/classes';
import { Status } from '../styles/pages/enrollments';
import { formatStatus } from '../utils/enrollments';
import { IServerUsers } from '../interfaces/IServerUsers';
import { IEnrollment } from '../interfaces/IEnrollment';

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
      if (error.response.status !== 404) {
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
          <h3>
            Esses são os seus cursos. Clique <Link href="/course-list">aqui</Link> para ver os
            cursos disponíveis.
          </h3>
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
                <div className="enrollment-status themed">
                  <span>Situação da matrícula</span>
                  <Status status={enrollment.status}>{formatStatus(enrollment.status)}</Status>
                </div>
                <div className="progress">0/10 aulas finalizadas</div>
              </Card>
            ))}
          </>
        )}
      </Content>
    </Layout>
  );
}

export const getServerSideProps = getServerSidePropsUser;
