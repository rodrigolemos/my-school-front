import { NextRouter } from 'next/router';
import { UseToastOptions } from '@chakra-ui/react';
import { Cookies } from 'react-cookie';
import { ICourseInput } from '../pages/courses/add';
import api from './api';
import { ICourse } from '../interfaces/ICourse';

const getCookieData = () => {
  const cookies = new Cookies();
  const token = cookies.get('@my-school:token');
  const { id } = cookies.get('@my-school:user');

  return { token, userId: id };
};

export const postCourse = async (
  data: ICourseInput,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  router: NextRouter,
  toast: (data: UseToastOptions) => void
): Promise<void> => {
  setLoading(true);
  try {
    const { token, userId } = getCookieData();
    data.created_by = userId;
    const response = await api.post('/courses/create', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status !== 201) throw new Error();

    toast({
      title: 'Curso criado com sucesso',
      status: 'success',
      isClosable: true,
      position: 'top-right'
    });

    router.push('/courses');
  } catch (error) {
    if (error.response) {
      if (error.response.status == 400) {
        toast({
          title:
            'Não foi possível incluir o curso. Por favor, verifique as informações e tente novamente.',
          status: 'warning',
          isClosable: true,
          position: 'top-right'
        });
      } else {
        toast({
          title: 'Não foi possível incluir o curso. Por favor, tente novamente mais tarde.',
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
    setLoading(false);
  }
};

export const fetchCourses = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setCourses: React.Dispatch<React.SetStateAction<ICourse[]>>,
  toast: (data: UseToastOptions) => void
): Promise<void> => {
  setLoading(true);
  try {
    const response = await api.get<ICourse[]>('/courses');
    if (response.status !== 200) throw new Error();

    setCourses(response.data);
  } catch (error) {
    if (error.response) {
      toast({
        title: 'Não foi possível listar os cursos. Por favor, tente novamente mais tarde.',
        status: 'warning',
        isClosable: true,
        position: 'top-right'
      });
    } else {
      toast({
        title: 'Houve alguma falha em nosso servidor. Por favor, tente novamente mais tarde.',
        status: 'error',
        isClosable: true,
        position: 'top-right'
      });
    }
  }
  setLoading(false);
};
