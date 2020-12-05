import { useRouter } from 'next/router'
import Navbar from '../components/navbar'

const CreateProfile = () => {
  const router = useRouter()
  return (
    <>
      <Navbar />
      <h1>Criar Perfil</h1>
      <span onClick={() => router.back()}>Voltar</span>
    </>
  )
}

export default CreateProfile