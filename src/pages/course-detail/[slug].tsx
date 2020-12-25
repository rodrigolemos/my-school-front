import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';

const CourseDetail: React.FC = (): ReactElement => {
  const router = useRouter();
  return (
    <>
      <h1>CourseDetail {router.query.slug}</h1>
    </>
  );
};

export default CourseDetail;
