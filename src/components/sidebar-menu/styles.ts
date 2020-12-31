import styled from 'styled-components';
import { List, ListItemIcon } from '@material-ui/core';

export const Container = styled.aside`
  z-index: 2;
  width: 100%;
  height: 100%;
  padding: 2rem;

  transition: all 0.2s ease-in-out;
  background-color: var(--logged);
  color: var(--white);
`;

export const LevelsList = styled(List)`
  span {
    font-size: 1.4rem;
  }

  svg {
    font-size: 2.2rem;
    color: var(--logged-font);
  }
`;

export const ListIcon = styled(ListItemIcon)`
  min-width: 35px !important;
  text-align: center;
`;
