import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter()
  return (
    <>
      <h1>Login</h1>
      <span onClick={() => router.back()}>Voltar</span>
    </>
  )
}

export default Login