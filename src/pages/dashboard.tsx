import React, { useCallback, useEffect, useState, ReactElement } from 'react';
import { getServerSidePropsUser } from '../utils/server-props';
import { CircularProgress } from '@material-ui/core';
import { Cookies } from 'react-cookie';
import api from '../services/api';
import { useRouter } from 'next/router';
import { FaMedal } from 'react-icons/fa';

import Layout from '../components/layout';
import ProfileContainer from '../components/profile-container';
import PerformanceChart from '../components/performance-chart';
import FrequencyChart from '../components/frequency-chart';
import Toast from '../components/toast';
import { IUser } from '../interfaces/IUser';

import { Header, Content, StatsColumn, StatsArea, DashboardArea } from '../styles/pages/dashboard';

interface IDashboard {
  name: string;
  isAdmin: boolean;
  user: IUser;
}

export default function Dashboard({ name, isAdmin }: IDashboard): ReactElement {
  const router = useRouter();
  const { updated, enrollment } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [user, setUser] = useState<IUser>();

  const fetchUserInfo = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError('');
    try {
      const cookies = new Cookies();
      const token = cookies.get('@my-school:token');
      const { id } = cookies.get('@my-school:user');

      const response = await api.get<IUser>(`/users/about/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status !== 200) throw new Error('Not allowed');

      setUser(response.data[0]);
    } catch (error) {
      setError('Ops, houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <Layout isAdmin={isAdmin} title="Dashboard">
      {error && <Toast type="error" message={error} />}
      {updated && <Toast type="success" message="Perfil atualizado com sucesso!" />}
      {enrollment && (
        <Toast
          type="success"
          message="Solicitação registrada. Clique em aulas e consulte o andamento da solicitação!"
        />
      )}
      <Header>
        <div className="greeting">
          <h2>Bem vindo novamente, {name}!</h2>
          <h3>Esta é sua área logada</h3>
        </div>
      </Header>
      {loading && !user ? (
        <CircularProgress />
      ) : (
        <Content>
          <ProfileContainer {...user} />
          <StatsColumn>
            <StatsArea>
              <DashboardArea className="themed">
                <div className="themed-aux col">
                  <div>
                    <FaMedal />
                  </div>
                  <h4>Beta Tester</h4>
                </div>
                <div className="themed-aux col">
                  <PerformanceChart />
                </div>
                <div className="themed-aux col full">
                  <FrequencyChart />
                </div>
              </DashboardArea>
            </StatsArea>
          </StatsColumn>
        </Content>
      )}
    </Layout>
  );
}

export const getServerSideProps = getServerSidePropsUser;
