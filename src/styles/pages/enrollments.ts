import styled, { css } from 'styled-components';
import { showFromTop } from '../animations';
import { TableRow } from '@material-ui/core';

interface IContainer {
  customtheme: string;
}

export const Header = styled.div`
  width: 100%;
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
  min-height: 85%;
  padding: 1rem;

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

export const FilterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Filter = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IStatus {
  status: string;
}

export const Status = styled.div<IStatus>`
  padding: 0.5rem;
  border-radius: 4px;
  width: 10rem;
  margin: 0 auto;
  color: white;
  ${({ status }) =>
    status === 'A'
      ? css`
          background-color: var(--success);
        `
      : status === 'C'
      ? css`
          background-color: var(--danger);
        `
      : css`
          background-color: var(--warning);
        `}
`;
