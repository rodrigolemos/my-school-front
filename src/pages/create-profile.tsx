import { useRouter } from 'next/router'
import { GoMortarBoard } from 'react-icons/go'
import { IoIosArrowBack } from 'react-icons/io'
import { Container, DesktopPanel, FormPanel, BackButton } from '../styles/pages/create-profile'

const CreateProfile = () => {
  const router = useRouter()
  return (
    <Container>
      <DesktopPanel>
        <div className="overlay" />
      </DesktopPanel>
      <FormPanel>
        <BackButton onClick={() => router.back()}>
          <IoIosArrowBack /> Voltar
        </BackButton>
        <form>
          <h1><GoMortarBoard />My School</h1>
          <label>
            Nome <input autoFocus />
          </label>
          <label>
            E-mail <input />
          </label>
          <label>
            Nascimento <input />
          </label>
          <label>
            Senha <input />
          </label>
          <button>CRIAR CONTA</button>
        </form>
      </FormPanel>
    </Container>
  )
}

export default CreateProfile