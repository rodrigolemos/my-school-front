import styled from 'styled-components';
import { showFromTop } from '../animations';

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  margin-bottom: 1rem;

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
  width: 100%;
  padding: 0 1rem;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  animation: ${showFromTop} 0.5s ease-in-out;
`;

export const Card = styled.div`
  width: 25rem;
  height: 25rem;
  padding: 1rem;
  margin: 1rem;
  border-radius: 5px;

  &:first-child {
    margin-left: 0;
  }
`;
