import React, { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import { checkAuth } from '../services/auth'
import { checkPermission } from '../services/permission'
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
  Controls
} from '../styles/pages/profile'

interface IProfile {
  name: string
  isAdmin: boolean
}

export default function Profile({ name, isAdmin }: IProfile): ReactElement {
  const { theme } = useTheme()
  return (
    <Container customTheme={theme}>
      <SidebarMenu isAdmin={isAdmin} />
      <Main>
        <UserNavBar title="Usuários" />
        <ContentWrapper>
          <Header>
            <div className="greeting">
              <h2>Bem vindo novamente, {name}!</h2>
            </div>
            <div className="date"></div>
          </Header>
          <Content>
            <ProfileColumn>
              <ProfileDetails>Profile details</ProfileDetails>
              <ProfileAbout>Profile about</ProfileAbout>
            </ProfileColumn>
            <StatsColumn>
              <StatsDetails>Stats details</StatsDetails>
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
    const { id, name } = JSON.parse(context.req.cookies['@my-school:user'])
    const isAdmin = await checkPermission(
      context.req.cookies['@my-school:token'],
      id
    )
    return {
      props: {
        name,
        isAdmin
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
