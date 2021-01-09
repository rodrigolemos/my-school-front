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

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  h1.title {
    font-size: 5rem;
  }
`;

export const CourseDescription = styled.div`
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  ul.tags {
    width: 100%;

    li {
      list-style: none;
      font-size: 2.2rem;
      background-color: var(--secondary);
      color: var(--light);
      padding: 0.5rem 1rem;
      border-radius: 5px;

      display: inline;
      margin: 0.7rem;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  div.details {
    width: 100%;
    font-size: 2.2rem;
  }

  div.more-info {
    width: 100%;
    font-size: 2.2rem;
  }
`;
