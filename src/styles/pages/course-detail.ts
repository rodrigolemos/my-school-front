import styled from 'styled-components';
import { showFromLeft } from '../animations';
import backgroundImage from '../../../public/images/course-detail.jpg';

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

  background: linear-gradient(rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('${backgroundImage}');
  background-size: cover;

  div.overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--secondary);
    opacity: 0.85;
  }

  h1.title {
    font-size: 5.5rem;
    z-index: 1;
    animation: ${showFromLeft} 0.5s ease-in-out;
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
  div.details {
    width: 75%;
    font-size: 2.4rem;
    line-height: 3.5rem;
    color: var(--font);
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
      font-size: 1.8rem;
      font-weight: bold;
      padding: 1.1rem;
      cursor: pointer;
      background-color: var(--primary);
      color: var(--light);
      border-radius: 5px;
      transition: all 0.2s ease-in-out;

      &:hover {
        transform: translateY(-0.2rem);
        box-shadow: 0 1rem 1rem var(--light);
        background-color: var(--primary-light);
      }
    }
  }
`;

export const BackButton = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;

  svg {
    margin-right: 1rem;
    font-size: 1.7rem;
  }
`;
