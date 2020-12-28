import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';

export default function CourseDetail(): ReactElement {
  const router = useRouter();
  const course_id = router.query.slug;
  return <div>Hello {course_id}</div>;
}
