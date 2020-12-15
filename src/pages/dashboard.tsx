import React, { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { checkAuth } from '../services/auth'
import { checkPermission } from '../services/permission'
import SidebarMenu from '../components/sidebar-menu'
import UserNavBar from '../components/user-navbar'
import { BiRefresh } from 'react-icons/bi'
import Toast from '../components/toast'
import { Container, Main, ContentWrapper, Header, Content } from '../styles/pages/dashboard'

interface IDashboard {
  name: string
  isAdmin: boolean
}

export default function Dashboard({ name, isAdmin }: IDashboard): ReactElement {
  const router = useRouter()
  const { user } = router.query
  return (
    <Container className="themed">
      <SidebarMenu isAdmin={isAdmin} />
      <Main>
        {user && <Toast type="success" message="Perfil atualizado com sucesso!" />}
        <UserNavBar title="Dashboard" />
        <ContentWrapper>
          <Header>
            <div className="greeting">
              <h2>Bem vindo novamente, {name}!</h2>
              <h3>Esta é sua área logada 💻</h3>
            </div>
            <div className="date">
              <BiRefresh />
            </div>
          </Header>
          <Content>
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
