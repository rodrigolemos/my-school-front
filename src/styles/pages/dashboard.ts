import styled from 'styled-components';
import { heartBeat } from '../animations';

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Main = styled.main`
  position: relative;
  width: 83%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1110px) {
    width: 100%;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 90vh;
  margin-top: 10vh;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  @media (max-width: 768px) {
    height: auto;
  }
`;

export const Header = styled.div`
  width: 95%;
  min-height: 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  @media (max-width: 375px) {
    flex-direction: column;
  }

  div.greeting {
    h2 {
      font-size: 2.6rem;
      font-weight: normal;
      margin-bottom: 0.8rem;
    }

    h3 {
      font-size: 2.1rem;
      font-weight: normal;
    }

    @media (max-width: 375px) {
      text-align: center;
      margin: 2rem 0;
    }
  }
`;

export const Content = styled.div`
  width: 95%;
  min-height: 85%;
  padding: 1rem;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const StatsColumn = styled.div`
  height: 100%;
  width: 65%;
  padding: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const StatsArea = styled.div`
  width: 100%;
  height: 100%;
  min-height: 536px;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const DashboardArea = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px;

  display: grid;
  grid-template-columns: repeat(auto-fit, 1fr);

  .col {
    min-height: 276px;
    font-size: 2rem;
    margin: 1rem;
    padding: 1.5rem;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    backface-visibility: hidden;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.03);
    }

    @media (max-width: 768px) {
      grid-column: 1/3;
    }

    h4 {
      width: 100%;
      height: 20%;
      font-weight: normal;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    div {
      width: 100%;
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        animation: ${heartBeat} 1s ease-in-out;
        font-size: 8rem;
      }
    }
  }

  .full {
    align-items: flex-start;
    justify-content: flex-start;
    grid-column: 1/3;
  }
`;
