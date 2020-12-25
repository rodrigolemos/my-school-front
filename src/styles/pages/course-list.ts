import styled from 'styled-components';

export const Container = styled.section`
  min-height: 90vh;
  margin-top: 10vh;
`;

export const Section = styled.section`
  width: 100vw;
  min-height: 90vh;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

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

export const Title = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: var(--white);

  h1 {
    font-size: 6rem !important;
    margin: 2rem 0;
  }

  h2 {
    font-size: 3rem !important;
    font-weight: normal;
  }

  @media (max-width: 768px) {
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
  background-color: var(--secondary);
  color: var(--white);

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

export const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

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
`;

export const ContentWrapper = styled.div`
  width: 100%;
  min-height: 70%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 3rem;

  @media (max-width: 1100px) {
    justify-content: flex-start;
    flex-direction: column;
  }

  @media (max-width: 1100px) {
    flex-wrap: nowrap;
  }
`;

export const Card = styled.div`
  position: relative;
  border-radius: 15px;
  width: 30%;
  height: 180px;
  margin: 1.5rem;
  flex-shrink: 0;
  backface-visibility: hidden;
  transition: all 0.1s ease-out;
  cursor: default;
  background-color: var(--background);
  color: var(--secondary);

  div.content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;

    p {
      font-size: 1.6rem;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 2rem;
    }
  }

  div.title {
    position: absolute;
    top: 0;
    left: 0;
    padding: 1.1rem;
    border-top-left-radius: 15px;
    background-color: #fff;
    color: var(--tertirary);
    background: linear-gradient(to top right, var(--white), var(--background));
    font-size: 2.8rem;
    text-transform: capitalize;
  }

  @media (max-width: 1100px) {
    width: 380px;
  }

  @media (max-width: 375px) {
    width: 100%;
  }
`;
