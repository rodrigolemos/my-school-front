import React, { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { AiFillPlusCircle } from 'react-icons/ai';
import { formatDescription } from '../utils/courses';
import api from '../services/api';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import {
  Banner,
  Card,
  Container,
  ContentWrapper,
  Presentation,
  Title
} from '../styles/pages/course-list';

interface ICourse {
  id: string;
  name: string;
  description: string;
  period: string;
  tags?: string[];
  updated_at: Date;
}

interface CourseListProps {
  courses: ICourse[];
  error?: string;
}

export default function CourseList({ error, courses }: CourseListProps): ReactElement {
  return (
    <Container>
      <Navbar />
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
                <div className="title">{course.name}</div>
                <p>{formatDescription(course.description)}</p>
                <div className="footer">
                  <div className="tags">
                    {course.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="more">
                    <Link href={`/course-detail/${course.id}`}>
                      <AiFillPlusCircle />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </ContentWrapper>
        </Banner>
      </Presentation>
      <Footer />
    </Container>
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
