import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { CircularProgress } from '@material-ui/core'
import { GoMortarBoard } from 'react-icons/go'
import { IoIosArrowBack } from 'react-icons/io'
import { VscUnlock } from 'react-icons/vsc'
import { Container, DesktopPanel, FormPanel, BackButton } from '../styles/pages/login'
import api from '../services/api'
import Toast from '../components/toast'

interface IFormInput {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
})

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const router = useRouter()
  const { register, handleSubmit, errors } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  })

  const { user } = router.query

  const onSubmit = async (data: IFormInput) => {
    setLoading(true)
    setError('')
    try {
      const response = await api.post('/users/create', data)
      if (response.status === 201) {
        router.push('/dashboard')
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status == 401) {
          setError('Ops, não foi possível efetuar seu login. Por favor, confira suas informações e tente novamente.')
        } else {
          setError('Ops, não foi possível efetuar seu login. Por favor, tente novamente mais tarde.')
        }
      } else {
        setError('Ops, houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.')
      }
    }
    setLoading(false)
  }

  return (
    <Container>
      <FormPanel>
        {error && <Toast type="error" message={error} />}
        {user && <Toast type="success" message="Perfil criado com sucesso. Você já pode acessar a plataforma!" />}
        <BackButton onClick={() => router.push('/')}>
          <IoIosArrowBack /> Voltar
        </BackButton>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1><GoMortarBoard />My School</h1>
          <label>
            E-mail
            <input
              type="email"
              name="email"
              minLength={3}
              maxLength={50}
              required
              ref={register}
            />
            {errors.email && (
              <p className="error">Preencha corretamente o email</p>
            )}
          </label>
          <label>
            Senha
            <input
              type="password"
              name="password"
              minLength={6}
              maxLength={100}
              autoComplete=""
              required
              ref={register}
            />
            {errors.password && (
              <p className="error">Preencha corretamente a senha</p>
            )}
          </label>
          {!loading ? (
            <button>ENTRAR</button>
          ) : (
              <div className="loading">
                <CircularProgress />
              </div>
            )}
        </form>
      </FormPanel>
      <DesktopPanel>
        <div className="overlay" />
        <div className="brand">
          <h2><GoMortarBoard />My School</h2>
          <VscUnlock className="desktop" />
          <h3>Efetue o login para acessar a plataforma</h3>
        </div>
      </DesktopPanel>
    </Container>
  )
}

export default Login
