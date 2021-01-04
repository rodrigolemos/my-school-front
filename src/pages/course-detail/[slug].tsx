import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';

import PublicLayout from '../../components/public-layout';
import { Section, CourseInfo, CourseDescription } from '../../styles/pages/course-detail';

export default function CourseDetail(): ReactElement {
  const router = useRouter();
  const course_id = router.query.slug;
  return (
    <PublicLayout>
      <Section>
        <CourseInfo>
          <h1>Hello {course_id}</h1>
        </CourseInfo>
        <CourseDescription>
          <h1>Hello {course_id}</h1>
        </CourseDescription>
      </Section>
    </PublicLayout>
  );
}
