import React, { ReactElement, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CircularProgress } from '@material-ui/core';
import { GoMortarBoard } from 'react-icons/go';
import { IoIosArrowBack, IoIosLaptop } from 'react-icons/io';
import { Container, DesktopPanel, FormPanel, BackButton } from '../styles/pages/create-profile';
import api from '../services/api';
import Toast from '../components/toast';

interface IFormInput {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6)
});

export default function CreateProfile(): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm<IFormInput>({
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback(async (data: IFormInput) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/users/create', data);
      if (response.status === 201) {
        router.push('/login?user=created');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status == 400 || error.response.status == 401) {
          setError(
            'Ops, não foi possível criar o seu perfil. Por favor, confira suas informações e tente novamente.'
          );
        } else {
          setError(
            'Ops, não foi possível criar o seu perfil. Por favor, tente novamente mais tarde.'
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
      <DesktopPanel>
        <div className="overlay" />
        <div className="brand">
          <h2>
            <GoMortarBoard />
            My School
          </h2>
          <IoIosLaptop className="desktop" />
          <h3>Crie sua conta para aproveitar o melhor da plataforma</h3>
        </div>
      </DesktopPanel>
      <FormPanel>
        {error && <Toast type="error" message={error} />}
        <BackButton onClick={() => router.push('/')}>
          <IoIosArrowBack /> Voltar
        </BackButton>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>
            <GoMortarBoard />
            My School
          </h1>
          <label>
            Nome
            <input
              type="text"
              name="name"
              minLength={3}
              maxLength={100}
              required
              autoFocus
              ref={register}
            />
            {errors.name && <p className="error">Preencha corretamente o nome</p>}
          </label>
          <label>
            E-mail
            <input type="email" name="email" minLength={3} maxLength={50} required ref={register} />
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
            <button>CRIAR CONTA</button>
          ) : (
            <button disabled={true}>
              <CircularProgress size={20} />
            </button>
          )}
          <div className="controls">
            <Link href="/login">Efetuar Login</Link>
          </div>
        </form>
      </FormPanel>
    </Container>
  );
}
