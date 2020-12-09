import { useRouter } from 'next/router'
import Navbar from '../components/navbar'
import Toast from '../components/toast'

const Login: React.FC = () => {
  const router = useRouter()
  const { user } = router.query

  return (
    <>
      <Navbar />
      {user && <Toast type="success" message="Perfil criado com sucesso!" />}
      <h1>Login</h1>
      <span onClick={() => router.back()}>Voltar</span>
    </>
  )
}

export default Login
