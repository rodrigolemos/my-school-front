import { GetServerSideProps } from 'next'
import { checkAuth } from '../services/auth'

export default function Dashboard() {
  return <h1>Dashboard logado.</h1>
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