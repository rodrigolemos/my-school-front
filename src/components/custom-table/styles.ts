import styled, { css } from 'styled-components';
import { TableRow } from '@material-ui/core';

interface IContainer {
  customtheme: string;
}

export const MyTableRow = styled(TableRow)<IContainer>`
  *,
  p {
    font-size: 16px;
  }
  select {
    color: var(--font);
  }
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
            background-color: var(--lighter);
            color: var(--logged) !important;
          }
        `}
`;
