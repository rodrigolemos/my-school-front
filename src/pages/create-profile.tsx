import { useRouter } from 'next/router'

const CreateProfile = () => {
  const router = useRouter()
  return (
    <>
      <h1>Criar Perfil</h1>
      <span onClick={() => router.back()}>Voltar</span>
    </>
  )
}

export default CreateProfile