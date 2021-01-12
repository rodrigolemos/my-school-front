import styled from 'styled-components';

export const Section = styled.section`
  width: 100vw;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  & > div {
    width: 50%;
    height: 100%;
    padding: 2rem;

    @media (max-width: 768px) {
      width: 100%;
    }
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
  justify-content: space-between;

  & > * {
    width: 100%;
    margin: 1rem 0;
    font-size: 2.2rem;
  }

  ul.tags {
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

  div.more {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    span.label {
      display: inline-block;
      margin: 0 1rem;
      font-size: 1.5rem;

      & > span {
        display: block;
        font-size: 2rem;
      }
    }

    button {
      border: none;
      font-size: 2rem;
      padding: 1rem;
      cursor: pointer;
      background-color: var(--primary);
      color: var(--light);
      border-radius: 5px;
      transition: all 0.2s ease-in-out;

      &:hover {
        transform: translateY(-0.2rem);
        box-shadow: 0 1rem 1rem var(--light);
      }
    }
  }
`;
