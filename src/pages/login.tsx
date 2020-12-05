import { useRouter } from 'next/router'
import Navbar from '../components/navbar'

const Login = () => {
  const router = useRouter()
  return (
    <>
      <Navbar />
      <h1>Login</h1>
      <span onClick={() => router.back()}>Voltar</span>
    </>
  )
}

export default Login