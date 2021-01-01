import styled, { css } from 'styled-components';
import { showFromTop } from '../animations';
import { TableRow } from '@material-ui/core';

interface IContainer {
  customtheme: string;
}

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

  div.add {
    display: flex;
    align-items: center;

    span {
      font-size: 1.2rem;
    }
  }
`;

export const Content = styled.div`
  width: 100%;
  padding: 0 1rem;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  animation: ${showFromTop} 0.5s ease-in-out;
`;

export const MyTableRow = styled(TableRow)<IContainer>`
  transition: all 0.2s ease-in-out;
  ${({ customtheme }) =>
    customtheme === 'dark'
      ? css`
          th,
          td,
          svg {
            border-bottom: 1px solid var(--logged-dark) !important;
            background-color: var(--logged);
            color: var(--white) !important;
          }
        `
      : css`
          th,
          td,
          svg {
            border-bottom: 1px solid var(--light) !important;
            background-color: var(--white);
            color: var(--logged) !important;
          }
        `}
`;
