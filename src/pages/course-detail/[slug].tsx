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

interface ICourse {
  id: string;
  name: string;
  description: string;
  tags: string[];
  period: string;
  updated_at: Date;
}

export default function CourseDetail(): ReactElement {
  const router = useRouter();
  const [course, setCourse] = useState<ICourse>({} as ICourse);
  const [loading, setLoading] = useState<boolean>(false);
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
      const isAdmin = await checkPermission(cookies.get('@my-school:token'), id);

      if (isAdmin) {
        setMessage('Parece que você é um administrador. Efetue login para maiores informações');
      } else {
        setMessage('Aluno!');
      }
    } catch (err) {
      router.push('/login');
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
                <button onClick={validateEnrollment}>Matricule-me!</button>
              </div>
            </CourseDescription>
          </>
        )}
      </Section>
    </PublicLayout>
  );
}
