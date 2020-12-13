import { GetServerSideProps } from 'next'
import { checkAuth } from '../services/auth'
import { checkPermission } from '../services/permission'
import SidebarMenu from '../components/sidebar-menu'
import UserNavBar from '../components/user-navbar'
import { useTheme } from '../hooks/theme'
import { Container, Main, ContentWrapper, Header, Content } from '../styles/pages/users'

export default function Users({ name, isAdmin }) {
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
              <h3>Esses são nossos usuários 🤖</h3>
            </div>
            <div className="date"></div>
          </Header>
          <Content>
          </Content>
        </ContentWrapper>
      </Main>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<any> = async (context: any) => {
  try {
    checkAuth(context.req.cookies['@my-school:token'])
    const { id, name } = JSON.parse(context.req.cookies['@my-school:user'])
    const isAdmin = await checkPermission(
      context.req.cookies['@my-school:token'],
      id
    )
    if (!isAdmin)
      throw new Error()

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