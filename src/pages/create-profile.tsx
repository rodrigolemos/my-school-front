import { useRouter } from 'next/router'
import { GoMortarBoard } from 'react-icons/go'
import { IoIosArrowBack, IoIosLaptop } from 'react-icons/io'
import { Container, DesktopPanel, FormPanel, BackButton } from '../styles/pages/create-profile'
import Input from '../components/input'

const CreateProfile: React.FC = () => {
  const router = useRouter()
  return (
    <Container>
      <DesktopPanel>
        <div className="overlay" />
        <div className="brand">
          <h2><GoMortarBoard />My School</h2>
          <IoIosLaptop className="desktop" />
          <h3>Crie sua conta para aproveitar o melhor da plataforma</h3>
        </div>
      </DesktopPanel>
      <FormPanel>
        <BackButton onClick={() => router.back()}>
          <IoIosArrowBack /> Voltar
        </BackButton>
        <form>
          <h1><GoMortarBoard />My School</h1>
          <label>
            Nome <Input autoFocus />
          </label>
          <label>
            E-mail <Input />
          </label>
          <label>
            Nascimento <Input />
          </label>
          <label>
            Senha <Input />
          </label>
          <button>CRIAR CONTA</button>
        </form>
      </FormPanel>
    </Container>
  )
}

export default CreateProfile