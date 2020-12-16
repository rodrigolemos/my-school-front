import React, { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { checkAuth } from '../services/auth'
import api from '../services/api'
import SidebarMenu from '../components/sidebar-menu'
import UserNavBar from '../components/user-navbar'
import ProfileContainer from '../components/profile-container'
import Toast from '../components/toast'
import {
  Container,
  Main,
  ContentWrapper,
  Header,
  Content,
  StatsColumn,
  StatsArea,
  DashboardArea
} from '../styles/pages/dashboard'

interface IUser {
  id: string
  name: string
  email: string
  role: string
  contact: string
  bio: string
  created_by?: string
  created_at: Date
  updated_at: Date
}

interface IDashboard {
  name: string
  isAdmin: boolean
  user: IUser
}

export default function Dashboard({ name, isAdmin, user }: IDashboard): ReactElement {
  const router = useRouter()
  const { updated } = router.query
  return (
    <Container className="themed">
      <SidebarMenu isAdmin={isAdmin} />
      <Main>
        {updated && <Toast type="success" message="Perfil atualizado com sucesso!" />}
        <UserNavBar title="Dashboard" />
        <ContentWrapper>
          <Header>
            <div className="greeting">
              <h2>Bem vindo novamente, {name}!</h2>
              <h3>Esta é sua área logada 💻</h3>
            </div>
          </Header>
          <Content>
            <ProfileContainer {...user} />
            <StatsColumn>
              <StatsArea>
                <DashboardArea className="themed">
                  <div className="themed-aux col">Teste 1</div>
                  <div className="themed-aux col">Teste 2</div>
                  <div className="themed-aux col full">Teste 3</div>
                </DashboardArea>
              </StatsArea>
            </StatsColumn>
          </Content>
        </ContentWrapper>
      </Main>
    </Container>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps<any> = async (context: any) => {
  try {
    checkAuth(context.req.cookies['@my-school:token'])
    const { id, name } = JSON.parse(context.req.cookies['@my-school:user'])

    const response = await api.get<IUser>(`/users/about/${id}`, {
      headers: {
        'Authorization': `Bearer ${context.req.cookies['@my-school:token']}`
      }
    })

    if (response.status !== 200)
      throw new Error('Not allowed')
    
    const user: IUser = response.data[0]
    
    const isAdmin = user.role === 'admin' ? true : false

    return {
      props: {
        name,
        isAdmin,
        user
      }
    }
  } catch (err) {
    return {
      props: {},
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
}
