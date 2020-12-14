import React, { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import { AiFillHome } from 'react-icons/ai'
import { BsChatSquareQuote } from 'react-icons/bs'
import { FaTwitter } from 'react-icons/fa'
import { formatDate } from '../utils/date'
import { checkAuth } from '../services/auth'
import api from '../services/api'
import SidebarMenu from '../components/sidebar-menu'
import UserNavBar from '../components/user-navbar'
import { useTheme } from '../hooks/theme'
import { Button } from '@material-ui/core'
import {
  Container,
  Main,
  ContentWrapper,
  Header,
  Content,
  ProfileColumn,
  ProfileAbout,
  ProfileDetails,
  StatsColumn,
  StatsDetails,
  Controls,
  Avatar,
  Personal,
  About
} from '../styles/pages/profile'

interface IUser {
  id: string
  name: string
  email: string
  role: string
  created_by?: string
  created_at?: Date
  updated_at?: Date
}

interface IProfile {
  isAdmin: boolean
  user: IUser
}

export default function Profile({ isAdmin, user }: IProfile): ReactElement {
  const { theme } = useTheme()
  return (
    <Container customTheme={theme}>
      <SidebarMenu isAdmin={isAdmin} />
      <Main>
        <UserNavBar title="Usuários" />
        <ContentWrapper>
          <Header>
            <div className="greeting">
              <h2>Bem vindo novamente, {user.name}!</h2>
            </div>
            <div className="date"></div>
          </Header>
          <Content>
            <ProfileColumn>
              <ProfileDetails>
                <Avatar />
                <Personal>
                  <span>{user.name}</span>
                  <span>{user.role}</span>
                  <span>{user.email}</span>
                </Personal>
              </ProfileDetails>
              <ProfileAbout>
                <About>
                  <span>Sobre</span>
                  <label>
                    <AiFillHome />Perfil criado {formatDate(user.created_at)}
                  </label>
                  <label>
                    <BsChatSquareQuote />Bio: Aqui haverá uma citação!
                  </label>
                  <label>
                    <FaTwitter />Twitter: @contato
                  </label>
                </About>
              </ProfileAbout>
            </ProfileColumn>
            <StatsColumn>
              <StatsDetails></StatsDetails>
              <Controls>
                <Button variant="contained" color="primary" size="large">Atualizar</Button>
              </Controls>
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
    const { id } = JSON.parse(context.req.cookies['@my-school:user'])

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
