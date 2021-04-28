import React, { ReactElement, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Cookies } from 'react-cookie';
import { CircularProgress } from '@material-ui/core';
import { IoIosArrowBack } from 'react-icons/io';
import api from '../../services/api';
import { checkPermission } from '../../services/permission';
import { simpleDate } from '../../utils/date';
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

export default function CourseDetail(): ReactElement {
  const router = useRouter();
  const [course, setCourse] = useState<ICourse>({} as ICourse);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingEnrollment, setLoadingEnrollment] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();

  const fetchCourseDetail = useCallback(async (): Promise<void> => {
    setLoading(true);

    if (!router.query.slug) return;

    const response = await api.get<ICourse>(`/courses/${router.query.slug}`);

    setLoading(false);

    if (response.status !== 200) throw new Error();

    setCourse(response.data[0]);
  }, []);

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

  useEffect(() => {
    fetchCourseDetail();
  }, []);

  return (
    <PublicLayout>
      <Section>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <CourseInfo>
              <div className="overlay" />
              {message && <Toast type="success" message={message} />}
              <BackButton onClick={() => router.push('/course-list')}>
                <IoIosArrowBack /> Voltar
              </BackButton>
              <h1 className="title">{course.name}</h1>
            </CourseInfo>
            <CourseDescription>
              <ul className="tags">
                {course.tags && course.tags.map((tag, i) => <li key={i}>{tag}</li>)}
              </ul>
              <div className="details">{course.description}</div>
              <div className="more">
                <span className="label">
                  Período
                  <span>{formatPeriod(course.period)}</span>
                </span>
                <span className="label">
                  Atualizado
                  <span>{simpleDate(course.updated_at)}</span>
                </span>
                {!loadingEnrollment ? (
                  <button onClick={validateEnrollment}>Matricule-me!</button>
                ) : (
                  <CircularProgress />
                )}
              </div>
            </CourseDescription>
          </>
        )}
      </Section>
    </PublicLayout>
  );
}
