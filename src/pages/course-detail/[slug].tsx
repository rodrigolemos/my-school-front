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
  period: string;
  updated_at: Date;
}

export default function CourseDetail(): ReactElement {
  const router = useRouter();
  const course_id = router.query.slug;
  const [course, setCourse] = useState<ICourse>({} as ICourse);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCourseDetail = async () => {
    setLoading(true);

    console.log(course_id);
    const response = await api.get<ICourse>(`/courses/${course_id}`);

    setLoading(false);

    if (response.status !== 200) throw new Error();

    setCourse(response.data);
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
              <h1>Hello {course_id}</h1>
            </CourseInfo>
            <CourseDescription>
              <h1>{JSON.stringify(course)}</h1>
            </CourseDescription>
          </>
        )}
      </Section>
    </PublicLayout>
  );
}
