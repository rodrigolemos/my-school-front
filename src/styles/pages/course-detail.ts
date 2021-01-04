import styled from 'styled-components';

export const Section = styled.section`
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    width: 50%;
    height: 100%;
    padding: 2rem;
  }
`;

export const CourseInfo = styled.div`
  background-color: var(--secondary);
  color: var(--white);
`;

export const CourseDescription = styled.div``;
