import { NextRouter } from 'next/router';
import { UseToastOptions } from '@chakra-ui/react';
import { Cookies } from 'react-cookie';
import { ICourse, ICourseInput } from '../interfaces/ICourse';
import api from './api';
import { AxiosError, AxiosResponse } from 'axios';

type Toast = (data: UseToastOptions) => void;

const getCookieData = () => {
  const cookies = new Cookies();
  const token = cookies.get('@my-school:token');
  const { id } = cookies.get('@my-school:user');

  return { token, userId: id };
};

const setHeaders = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

const handleException = (error: AxiosError, toast: Toast) => {
  if (error.response) {
    if (error.response.status == 400) {
      toast({
        title:
          'Não foi possível realizar a operação. Por favor, verifique as informações e tente novamente.',
        status: 'warning',
        isClosable: true,
        position: 'top-right'
      });
    } else {
      toast({
        title: 'Não foi possível realizar a operação. Por favor, tente novamente mais tarde.',
        status: 'error',
        isClosable: true,
        position: 'top-right'
      });
    }
  } else {
    toast({
      title: 'Houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.',
      status: 'error',
      isClosable: true,
      position: 'top-right'
    });
  }
};

export const fetchCourses = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setCourses: React.Dispatch<React.SetStateAction<ICourse[]>>,
  toast: Toast
): Promise<void> => {
  setLoading(true);
  try {
    const response = await api.get<ICourse[]>('/courses');
    if (response.status !== 200) throw new Error();
    setCourses(response.data);
  } catch (error) {
    handleException(error, toast);
  }
  setLoading(false);
};

export const postCourse = async (
  data: ICourseInput,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: NextRouter,
  toast: Toast,
  addOrEdit: 'add' | 'edit' = 'add'
): Promise<void> => {
  setLoading(true);
  try {
    const { token, userId } = getCookieData();
    data.created_by = userId;

    let httpSuccessCode: number;
    let response: AxiosResponse;
    let message: string;

    if (addOrEdit === 'add') {
      httpSuccessCode = 201;
      message = 'Curso criado com sucesso';
      response = await api.post('/courses/create', data, setHeaders(token));
    } else {
      httpSuccessCode = 200;
      message = 'Curso atualizado com sucesso';
      response = await api.put('/courses', data, setHeaders(token));
    }

    if (response.status !== httpSuccessCode) throw new Error();

    toast({
      title: message,
      status: 'success',
      isClosable: true,
      position: 'top-right'
    });

    router.push('/courses');
  } catch (error) {
    handleException(error, toast);
    setLoading(false);
  }
};

export const deleteCourse = async (
  data: ICourseInput,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: NextRouter,
  toast: Toast
): Promise<void> => {
  setLoading(true);
  try {
    const { token } = getCookieData();

    const response = await api.delete(`/courses/${data.id}`, setHeaders(token));

    if (response.status !== 204) throw new Error();

    toast({
      title: 'Curso excluido com sucesso',
      status: 'success',
      isClosable: true,
      position: 'top-right'
    });

    router.push('/courses');
  } catch (error) {
    handleException(error, toast);
    setLoading(false);
  }
};
