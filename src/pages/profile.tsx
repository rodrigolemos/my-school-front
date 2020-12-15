import React, { useState, ReactElement } from 'react'
import { Cookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { AiFillHome } from 'react-icons/ai'
import { BsChatSquareQuote } from 'react-icons/bs'
import { FaTwitter } from 'react-icons/fa'
import { formatDate } from '../utils/date'
import { checkAuth } from '../services/auth'
import { CircularProgress } from '@material-ui/core'
import api from '../services/api'
import SidebarMenu from '../components/sidebar-menu'
import UserNavBar from '../components/user-navbar'
import Toast from '../components/toast'
import { Button } from '@material-ui/core'
import {
  Container,
  Main,
  ContentWrapper,
  Header,
  Content,
  ProfileColumn,
  ProfileAbout,
  ProfileDetails,
  FormColumn,
  FormArea,
  Form,
  Controls,
  Avatar,
  Personal,
  About,
  CustomInput
} from '../styles/pages/profile'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface IUser {
  id: string
  name: string
  email: string
  role: string
  created_by?: string
  created_at: Date
  updated_at: Date
}

interface IProfile {
  isAdmin: boolean
  user: IUser
}

interface IFormInput {
  id: string
  name: string
  email: string
  password: string
  bio: string
}

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  bio: yup.string().required().min(6),
})

export default function Profile({ isAdmin, user }: IProfile): ReactElement {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const router = useRouter()
  const { register, control, handleSubmit, errors } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: IFormInput) => {
    setLoading(true)
    setError('')
    try {
      const cookies = new Cookies()

      const token = cookies.get('@my-school:token')
      const { id } = cookies.get('@my-school:user')

      data.id = id

      const response = await api.put('/users', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'client_id': id
        }
      })

      if (response.status === 200) {
        cookies.set('@my-school:user', JSON.stringify({ id, name: data.name }))
        router.push('/dashboard?user=updated')
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status == 400 || error.response.status == 401) {
          setError('Ops, não foi possível atualizar o seu perfil. Por favor, confira suas informações e tente novamente.')
        } else {
          setError('Ops, não foi possível atualizar o seu perfil. Por favor, tente novamente mais tarde.')
        }
      } else {
        setError('Ops, houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.')
      }
    }
    setLoading(false)
  }
  
  return (
    <Container className="themed">
      <SidebarMenu isAdmin={isAdmin} />
      <Main>
        <UserNavBar title="Perfil" />
        <ContentWrapper>
          <Header>
            <div className="greeting">
              <h2>Bem vindo novamente, {user.name}!</h2>
            </div>
            <div className="date"></div>
          </Header>
          <Content>
            {error && <Toast type="error" message={error} />}
            <ProfileColumn >
              <ProfileDetails>
                <Avatar className="themed-aux">{user.name.substr(0, 1)}</Avatar>
                <Personal>
                  <span>{user.name}</span>
                  <span>{user.role}</span>
                  <span>{user.email}</span>
                </Personal>
              </ProfileDetails>
              <ProfileAbout>
                <About className="themed-aux">
                  <span>Sobre</span>
                  <label>
                    <AiFillHome />Perfil criado {formatDate(user.created_at)}
                  </label>
                  <label>
                    <BsChatSquareQuote />Bio: Aqui haverá uma citação!
                  </label>
                  <label>
                    <FaTwitter />Twitter: @contato
                  </label>
                </About>
              </ProfileAbout>
            </ProfileColumn>
            <FormColumn>
              <FormArea>
                <Form onSubmit={handleSubmit(onSubmit)} className="themed-aux">
                  <h3>Minhas informações</h3>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={user.name}
                    as={<CustomInput label="Nome" variant="filled" required ref={register} />}
                  />
                  {errors.name && (
                    <p className="error">Preencha corretamente o nome</p>
                  )}
                  <Controller
                    name="email"
                    control={control}
                    defaultValue={user.email}
                    as={<CustomInput label="E-mail" variant="filled" required ref={register} />}
                  />
                  {errors.email && (
                    <p className="error">Preencha corretamente o email</p>
                  )}
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    as={<CustomInput label="Senha" variant="filled" required ref={register} />}
                  />
                  {errors.password && (
                    <p className="error">Preencha corretamente a senha</p>
                  )}
                  <Controller
                    name="bio"
                    control={control}
                    defaultValue=""
                    as={<CustomInput label="Sobre mim" variant="filled" required ref={register} multiline rows={5} />}
                  />
                  {errors.bio && (
                    <p className="error">Preencha corretamente a bio</p>
                  )}
                  <Controls>
                    {!loading ? (
                      <Button type="submit" variant="contained" color="primary" size="large">Atualizar</Button>
                    ) : (
                      <CircularProgress />
                    )}
                  </Controls>
                </Form>
              </FormArea>
            </FormColumn>
          </Content>
        </ContentWrapper>
      </Main>
    </Container>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps<any> = async (context: any) => {
  try {
    checkAuth(context.req.cookies['@my-school:token'])
    const { id } = JSON.parse(context.req.cookies['@my-school:user'])

    const response = await api.get<IUser>(`/users/about/${id}`, {
      headers: {
        'Authorization': `Bearer ${context.req.cookies['@my-school:token']}`
      }
    })

    if (response.status !== 200)
      throw new Error('Not allowed')
    
    const user: IUser = response.data[0]
    
    const isAdmin = user.role === 'admin' ? true : false
    
    return {
      props: {
        isAdmin,
        user
      }
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
