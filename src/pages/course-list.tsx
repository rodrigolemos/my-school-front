import React, { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { MdLibraryBooks } from 'react-icons/md';
import Link from 'next/link';
import { formatDescription } from '../utils/courses';
import { simpleDate } from '../utils/date';
import api from '../services/api';

import PublicLayout from '../components/public-layout';
import { Banner, Card, ContentWrapper, Presentation, Title } from '../styles/pages/course-list';

interface ICourse {
  id: string;
  name: string;
  description: string;
  period: string;
  updated_at: Date;
}

interface CourseListProps {
  courses: ICourse[];
  error?: string;
}

export default function CourseList({ error, courses }: CourseListProps): ReactElement {
  return (
    <PublicLayout>
      <Presentation>
        <Banner>
          <Title>
            <h1>Cursos</h1>
            {error ? (
              <h2>{error}</h2>
            ) : (
              <h2>Conheça os cursos disponíveis atualmente em nossa plataforma.</h2>
            )}
          </Title>
          <ContentWrapper>
            {courses.map((course: ICourse) => (
              <Card key={course.id}>
                <div className="title">
                  <MdLibraryBooks />
                  <h3>{course.name}</h3>
                </div>
                <div className="content">
                  <p>{formatDescription(course.description, 170)}</p>
                </div>
                <div className="footer">
                  <span className="date">Atualizado em {simpleDate(course.updated_at)}</span>
                  <Link href={`/course-detail/${course.id}`}>
                    <span className="more">Saber Mais</span>
                  </Link>
                </div>
              </Card>
            ))}
          </ContentWrapper>
        </Banner>
      </Presentation>
    </PublicLayout>
  );
}

export const getServerSideProps: GetServerSideProps<unknown> = async () => {
  try {
    const response = await api.get<CourseListProps>('/courses');

    if (response.status !== 200) throw new Error();

    const courses: CourseListProps = response.data;

    return {
      props: {
        courses
      }
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        courses: [],
        error: 'Não foi possível consultar os cursos no momento. Tente novamente mais tarde.'
      }
    };
  }
};
