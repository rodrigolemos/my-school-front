import { GetServerSideProps } from 'next'
import { checkAuth } from '../services/auth'
import SidebarMenu from '../components/sidebar-menu'
import UserNavBar from '../components/user-navbar'
import { BiRefresh } from 'react-icons/bi'
import { useTheme } from '../hooks/theme'
import { Container, Main, ContentWrapper, Header } from '../styles/pages/dashboard'

export default function Courses() {
  const { theme } = useTheme()
  return (
    <Container customTheme={theme}>
      <SidebarMenu />
      <Main>
        <UserNavBar title="Cursos" />
        <ContentWrapper>
          <Header>
            <div className="greeting">
              <h2>Bem vindo novamente!</h2>
              <h3>Esses são os cursos com o seu perfil 📚</h3>
            </div>
            <div className="date">
              <BiRefresh />
              <span></span>
            </div>
          </Header>
        </ContentWrapper>
      </Main>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<any> = async (context: any) => {
  try {
    checkAuth(context.req.cookies['@my-school:token'])
    return {
      props: {
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