/* eslint-disable @typescript-eslint/no-var-requires */
import styled from 'styled-components';
import { showFromLeft } from '../animations';

const backgroundImage = require('../../../public/images/bookshelf-1.jpg');

export const Section = styled.section`
  width: 100vw;
  height: 90vh;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--white);
  color: var(--secondary);

  a.navigation {
    position: absolute;
    top: -9vh;
  }

  h2 {
    font-size: 2.2rem;
  }

  @media (max-width: 1100px) {
    min-height: 90vh;
    height: auto;
    padding: 3rem 0;
  }
`;

export const AnimatedBanner = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  backface-visibility: hidden;
  animation: ${showFromLeft} 0.8s ease-in-out;

  width: 70%;
  height: 100%;

  h1 {
    font-size: 7rem;
    margin-top: 1rem;

    @media (max-width: 375px) {
      font-size: 5.5rem;
    }
  }

  h2 {
    font-size: 5rem;
    margin-bottom: 1rem;
    color: var(--white);

    @media (max-width: 375px) {
      font-size: 4rem;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 2rem;
  }
`;

export const SectionName = styled.h2`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
  font-size: 3.5rem !important;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.8rem !important;
    margin-top: 1.5rem;
    margin-bottom: 3rem;
  }
`;

export const SectionAdditional = styled.h2`
  margin-top: 4rem;
  font-size: 2.5rem !important;
  text-align: center;
`;

export const Presentation = styled(Section)`
  color: var(--white);
  background: linear-gradient(rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('${backgroundImage}');
  background-size: cover;

  span {
    font-size: 2.2rem;
  }

  p {
    font-size: 1.8rem;
    width: 50%;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  div.link {
    margin-top: 2rem;
    display: block;
    width: auto;

    a {
      text-decoration: none;
      font-size: 1.8rem;
      padding: 1.2rem;

      color: inherit;
      border: 1px solid var(--white);
      border-radius: 4px;
      transition: 0.2s ease-in-out;

      &:hover {
        background-color: var(--white);
        color: var(--secondary);
      }
    }
  }
`;

export const Motivation = styled(Section)`
  flex-direction: column;
  justify-content: flex-start;
  background: linear-gradient(to top, var(--white), var(--background));
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 60%;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1100px) {
    justify-content: flex-start;
    flex-direction: column;
  }
`;

export const Card = styled.div`
  position: relative;
  border-radius: 5px;
  width: 18vw;
  height: 390px;
  margin: 1.5rem;
  flex-shrink: 0;
  backface-visibility: hidden;
  transition: all 0.2s ease-out;
  cursor: default;
  background-color: var(--background);
  box-shadow: 0 0 0.5rem #ddd;
  backface-visibility: hidden;

  &:hover {
    box-shadow: 0 0 1.4rem #ccc;
    transform: translateY(-0.5rem);
  }

  div.image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
    padding: 1rem;
    background: linear-gradient(to right, var(--secondary), var(--secondary-light));
    background-size: cover;

    svg {
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: 18rem;
      color: var(--white);
      opacity: 0.09;
    }
  }

  div.content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;

    p {
      font-size: 1.4rem;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 2rem;
    }
  }

  div.title {
    position: absolute;
    top: -4.1rem;
    right: 0;
    padding: 1.1rem;
    background-color: #fff;
    color: var(--tertirary);
    background: linear-gradient(to top right, var(--white), var(--background));
    font-size: 1.8rem;
    text-transform: capitalize;
  }

  @media (max-width: 1100px) {
    width: 380px;
  }

  @media (max-width: 375px) {
    width: 85vw;
  }
`;
