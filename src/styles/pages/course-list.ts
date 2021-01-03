import styled from 'styled-components';

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
  margin: 2rem 0;
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
  width: 35rem;
  height: 35rem;
  margin: 1.5rem;

  flex-shrink: 0;
  backface-visibility: hidden;
  cursor: default;

  background-color: var(--background);
  color: var(--secondary);
  transition: all 0.1s ease-out;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  div.title {
    width: 100%;
    height: 45%;
    background-color: var(--light);
    position: relative;

    h3 {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      font-size: 2rem;
      font-weight: normal;
    }
  }

  div.content {
    width: 100%;
    height: 40%;

    p {
      width: 100%;
      height: 100%;
      font-size: 1.4rem;
      padding: 1.2rem;
      letter-spacing: 0.2px;
    }
  }

  div.footer {
    width: 100%;
    height: 15%;

    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    span {
      font-size: 1.4rem;
      padding: 0.6rem 1rem;
      background-color: var(--secondary);
      color: var(--white);
    }
  }

  @media (max-width: 1100px) {
    width: 380px;
  }

  @media (max-width: 375px) {
    width: 100%;
  }
`;
