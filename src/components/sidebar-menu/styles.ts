import styled from 'styled-components'
import { List, ListItemIcon } from '@material-ui/core'

export const Container = styled.aside`
  z-index: 2;
  height: 100vh;
  width: 17%;
  
  transition: all .2s ease-in-out;
  background-color: var(--logged);
  color: var(--white);

  @media (max-width: 1110px) {
    display: none;
  }
`

export const Title = styled.div`
  font-size: 2.6rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10vh;

  svg {
    margin-right: 1rem;
  }
  
  a, a:active, a:visited {
    color: inherit;
    text-decoration: none !important;
  }
`

export const Content = styled.div`
  width: 100%;
  height: 90vh;
  padding: 2rem;
`

export const LevelsList = styled(List)`
  span {
    font-size: 1.4rem;
  }

  svg {
    font-size: 2.2rem;
    color: var(--logged-font);
  }
`

export const ListIcon = styled(ListItemIcon)`
  min-width: 35px !important;
  text-align: center;
`
