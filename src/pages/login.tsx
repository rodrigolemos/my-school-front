import React, { useCallback, useState, ReactElement } from 'react';
import { Cookies } from 'react-cookie';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CircularProgress } from '@material-ui/core';
import { GoMortarBoard } from 'react-icons/go';
import { IoIosArrowBack } from 'react-icons/io';
import { VscUnlock } from 'react-icons/vsc';
import { Container, DesktopPanel, FormPanel, BackButton } from '../styles/pages/login';
import { checkAuth } from '../services/auth';
import api from '../services/api';
import Toast from '../components/toast';

interface IFormInput {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6)
});

export default function Login(): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });

  const { user } = router.query;

  const onSubmit = useCallback(async (data: IFormInput) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/sessions/create', data);
      if (response.status === 201) {
        const { id, name, token } = response.data;
        const cookies = new Cookies();

        cookies.set('@my-school:user', JSON.stringify({ id, name }));
        cookies.set('@my-school:token', token);

        router.push('/dashboard');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status == 401) {
          setError(
            'Ops, não foi possível efetuar seu login. Por favor, confira suas informações e tente novamente.'
          );
        } else {
          setError(
            'Ops, não foi possível efetuar seu login. Por favor, tente novamente mais tarde.'
          );
        }
      } else {
        setError(
          'Ops, houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.'
        );
      }
    }
    setLoading(false);
  }, []);

  return (
    <Container>
      <FormPanel>
        {error && <Toast type="error" message={error} />}
        {user && (
          <Toast
            type="success"
            message="Perfil criado com sucesso. Você já pode acessar a plataforma!"
          />
        )}
        <BackButton onClick={() => router.push('/')}>
          <IoIosArrowBack /> Voltar
        </BackButton>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>
            <GoMortarBoard />
            My School
          </h1>
          <label>
            E-mail
            <input
              type="email"
              name="email"
              minLength={3}
              maxLength={50}
              required
              ref={register}
              autoFocus
            />
            {errors.email && <p className="error">Preencha corretamente o email</p>}
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
            {errors.password && <p className="error">Preencha corretamente a senha</p>}
          </label>
          {!loading ? (
            <button>ENTRAR</button>
          ) : (
            <div className="loading">
              <CircularProgress />
            </div>
          )}
          <div className="controls">
            <Link href="/login">Esqueci minha senha</Link>
            <Link href="/create-profile">Criar Perfil</Link>
          </div>
        </form>
      </FormPanel>
      <DesktopPanel>
        <div className="overlay" />
        <div className="brand">
          <h2>
            <GoMortarBoard />
            My School
          </h2>
          <VscUnlock className="desktop" />
          <h3>Efetue o login para acessar a plataforma</h3>
        </div>
      </DesktopPanel>
    </Container>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getServerSideProps: GetServerSideProps<any> = async (context: any) => {
  try {
    checkAuth(context.req.cookies['@my-school:token']);
    return {
      props: {},
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    };
  } catch (err) {
    return {
      props: {}
    };
  }
};
