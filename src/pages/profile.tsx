import React, { ReactElement } from 'react'
import { GetServerSideProps } from 'next'
import { AiFillHome } from 'react-icons/ai'
import { BsChatSquareQuote } from 'react-icons/bs'
import { FaTwitter } from 'react-icons/fa'
import { formatDate } from '../utils/date'
import { checkAuth } from '../services/auth'
import api from '../services/api'
import SidebarMenu from '../components/sidebar-menu'
import UserNavBar from '../components/user-navbar'
import { useTheme } from '../hooks/theme'
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

export default function Profile({ isAdmin, user }: IProfile): ReactElement {
  const { theme } = useTheme()

  const methods = useForm()
  const { handleSubmit, control} = methods
  const onSubmit = (data: IUser) => console.log(data)
  
  return (
    <Container customTheme={theme}>
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
            <ProfileColumn >
              <ProfileDetails>
                <Avatar customTheme={theme} />
                <Personal>
                  <span>{user.name}</span>
                  <span>{user.role}</span>
                  <span>{user.email}</span>
                </Personal>
              </ProfileDetails>
              <ProfileAbout>
                <About customTheme={theme}>
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
                <Form onSubmit={handleSubmit(onSubmit)} customTheme={theme}>
                  <h3>Minhas informações</h3>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={user.name}
                    as={<CustomInput label="Nome" variant="filled" />}
                  />
                  <Controller
                    name="email"
                    control={control}
                    defaultValue={user.email}
                    as={<CustomInput label="E-mail" variant="filled" />}
                  />
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    as={<CustomInput label="Senha" variant="filled" />}
                  />
                  <Controller
                    name="bio"
                    control={control}
                    defaultValue=""
                    as={<CustomInput label="Sobre mim" variant="filled" multiline rows={5} />}
                  />
                </Form>
              </FormArea>
              <Controls>
                <Button variant="contained" color="primary" size="large">Atualizar</Button>
              </Controls>
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
