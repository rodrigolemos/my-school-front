import { GetServerSideProps } from 'next'
import { checkAuth } from '../services/auth'
import UserMenu from '../components/user-menu'
import UserNavBar from '../components/user-navbar'
import { Container, Main, ContentWrapper } from '../styles/pages/dashboard'

export default function Dashboard() {
  return (
    <Container>
      <UserMenu />
      <Main>
        <UserNavBar title="Dashboard" />
        <ContentWrapper>
          <h1>Conteúdo do dashboard logado.</h1>
        </ContentWrapper>
      </Main>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps<any> = async (context: any) => {
  try {
    checkAuth(context.req.cookies['@my-school:token'])
    return {
      props: {}
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