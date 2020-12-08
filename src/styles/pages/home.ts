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
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--white);
  color: var(--secondary);

  a.navigation {
    position: absolute;
    top: -10vh;
  }

  h2 {
    font-size: 2.2rem;
  }

  @media (max-width: 768px) {
    min-height: 90vh;
    height: auto;
    padding: 3rem 0;
  }
`

export const AnimatedBanner = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  animation: ${showFromLeft} .8s ease-in-out;

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
    font-size: 5.7rem;
    margin-bottom: 1rem;
    color: var(--white);

    @media (max-width: 375px) {
      font-size: 4.2rem;
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 2rem;
  }
`

export const SectionName = styled.h2`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem !important;
  
  @media (max-width: 768px) {
    font-size: 3rem;
    margin-top: 1.5rem;
    margin-bottom: 3rem;
  }
`

export const Presentation = styled(Section)`
  color: var(--white);
  background:
    linear-gradient(rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)),
    url("${backgroundImage}");
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
      transition: .2s ease-in-out;

      &:hover {
        background-color: var(--white);
        color: var(--secondary);
      }
    }
  }
`

export const Motivation = styled(Section)`
  flex-direction: column;
  justify-content: flex-start;
`

export const Information = styled(Section)`
  background-color: var(--secondary);
  color: var(--white);
`

export const CardsWrapper = styled.div`
  width: 100%;
  height: 60%;

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: flex-start;
    flex-direction: column;
  }
`

export const Card = styled.div`
  border: 1px solid var(--secondary);
  border-radius: 5px;
  width: 280px;
  height: 380px;
  margin: 1.5rem;
  flex-shrink: 0;
`