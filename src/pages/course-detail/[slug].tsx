import React, { ReactElement, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CircularProgress } from '@material-ui/core';
import api from '../../services/api';

import PublicLayout from '../../components/public-layout';
import { Section, CourseInfo, CourseDescription } from '../../styles/pages/course-detail';

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

  const fetchCourseDetail = async () => {
    setLoading(true);

    if (!router.query.slug) return;

    const response = await api.get<ICourse>(`/courses/${router.query.slug}`);

    setLoading(false);

    if (response.status !== 200) throw new Error();

    setCourse(response.data[0]);
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
                  <span>Noturno</span>
                </span>
                <span className="label">
                  Atualizado
                  <span>09/01/2021</span>
                </span>
                <button>Matricule-me!</button>
              </div>
            </CourseDescription>
          </>
        )}
      </Section>
    </PublicLayout>
  );
}
