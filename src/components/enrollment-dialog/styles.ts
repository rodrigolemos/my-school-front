import styled, { css } from 'styled-components';
import { DialogContent } from '@material-ui/core';

interface IContainer {
  customtheme: string;
}

export const CustomDialogContent = styled(DialogContent)<IContainer>`
  transition: all 0.2s ease-in-out;
  ${({ customtheme }) =>
    customtheme === 'dark'
      ? css`
          background-color: var(--logged);
          color: var(--white) !important;
          label {
            color: var(--white) !important;
          }
        `
      : css`
          background-color: var(--white);
          color: var(--logged) !important;
          label {
            color: var(--logged) !important;
          }
        `}
`;

export const Form = styled.form`
  div.alert {
    width: 100%;
    margin: 2rem 0;
    font-size: 1.6rem;
  }
  h1 {
    font-size: 2.2rem;
  }
  span {
    font-size: 1.2rem;
  }
  div.log {
    margin-bottom: 1rem;
    text-align: center;
  }
`;
