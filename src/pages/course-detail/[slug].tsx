import React, { ReactElement, useState } from 'react';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Cookies } from 'react-cookie';
import { CircularProgress } from '@material-ui/core';
import { IoIosArrowBack } from 'react-icons/io';
import api from '../../services/api';
import { checkPermission } from '../../services/permission';
import { formatPeriod } from '../../utils/courses';

import Toast from '../../components/toast';
import PublicLayout from '../../components/public-layout';
import {
  Section,
  CourseInfo,
  CourseDescription,
  BackButton
} from '../../styles/pages/course-detail';
import { ICourse } from '../../interfaces/ICourse';
import { IEnrollment } from '../../interfaces/IEnrollment';

interface CourseProps {
  course: ICourse;
}

type CoursePaths = ICourse[];

export default function CourseDetail({ course }: CourseProps): ReactElement {
  const router = useRouter();
  const [loadingEnrollment, setLoadingEnrollment] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  const validateEnrollment = async (): Promise<void> => {
    try {
      const cookies = new Cookies();
      const { id } = cookies.get('@my-school:user');
      const token = cookies.get('@my-school:token');
      const isAdmin = await checkPermission(token, id);

      if (isAdmin) {
        setMessage(
          'Parece que você é um administrador. Não é necessário se matricular neste curso.'
        );
      } else {
        setLoadingEnrollment(true);
        const data = {
          course_id: course.id,
          user_id: id,
          id
        };

        const response = await api.post<IEnrollment>(`/enrollments/create`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 201) {
          setLoadingEnrollment(false);
          router.push('/dashboard?enrollment=created');
        }
      }
    } catch (err) {
      setLoadingEnrollment(false);
      router.push('/login?notLogged=true');
    }
  };

  return (
    <PublicLayout>
      <Section>
        <CourseInfo>
          <div className="overlay" />
          {message && <Toast type="success" message={message} />}
          <BackButton onClick={() => router.push('/course-list')}>
            <IoIosArrowBack /> Voltar
          </BackButton>
          <h1 className="title">{course?.name}</h1>
        </CourseInfo>
        <CourseDescription>
          <ul className="tags">
            {course?.tags && course?.tags.map((tag, i) => <li key={i}>{tag}</li>)}
          </ul>
          <div className="details">{course?.description}</div>
          <div className="more">
            <span className="label">
              Suporte
              <span>{formatPeriod(course?.period)}</span>
            </span>
            {!loadingEnrollment ? (
              <button onClick={validateEnrollment}>Matricular-me!</button>
            ) : (
              <CircularProgress />
            )}
          </div>
        </CourseDescription>
      </Section>
    </PublicLayout>
  );
}

export const getStaticProps: GetStaticProps<unknown> = async (context) => {
  try {
    const response = await api.get<CourseProps>(`/courses/${context.params.slug}`);

    if (response.status !== 200) throw new Error();

    const course: CourseProps = response.data[0];

    return {
      props: {
        course
      },
      revalidate: 3600 * 24
    };
  } catch (err) {
    return {
      props: {
        course: {} as CourseProps,
        error: 'Curso não encontrado. Tente novamente mais tarde.'
      }
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await api.get<CoursePaths>('/courses/');

  if (response.status !== 200) throw new Error();

  const courses: CoursePaths = response.data;

  const paths = courses.map((course) => {
    return {
      params: {
        slug: course.id
      }
    };
  });

  return {
    paths,
    fallback: true
  };
};
