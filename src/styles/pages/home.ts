import styled, { keyframes } from 'styled-components'

const backgroundImage = require('../../../public/images/bookshelf-1.jpg')

const showFromLeft = keyframes`
  from {
    transform: translateX(-2.5rem);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

export const Section = styled.section`
  width: 100vw;
  height: 90vh;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--white);

  div.content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    animation: ${showFromLeft} .8s ease-in-out;

    width: 70%;
    height: 100%;

    span {
      font-size: 2.2rem;
    }

    p {
      font-size: 1.8rem;
      width: 50%;

      @media (max-width: 768px) {
        width: 100%;
      }
    }
    
    @media (max-width: 768px) {
      width: 100%;
      padding: 0 2rem;
    }
  }

  &.presentantion {
    background:
      linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
      url("${backgroundImage}");
    background-size: cover;
  }
`

export const Title = styled.h1`
  font-size: 7rem;
  margin-top: 1rem;
  
  @media (max-width: 375px) {
    font-size: 5.5rem;
  }
`

export const Subtitle = styled.h1`
  font-size: 5.7rem;
  margin-bottom: 1rem;
  color: var(--white);

  @media (max-width: 375px) {
    font-size: 4.2rem;
  }
`
