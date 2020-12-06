import styled from 'styled-components'

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  
  background-color: var(--background);
  color: var(--tertiary);

  width: 100%;
  height: 10vh;
  
  display: flex;
  align-items: center;
  justify-content: center;
`

export const NavContent = styled.div`
  width: 70%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  a, a:active, a:visited {
    text-decoration: none;
    color: inherit;
    transition: all .2s ease-in-out;

    &:hover {
      color: var(--primary);
    }
  }
`

export const Title = styled.h1`
  font-size: 3rem;
`

export const Menu = styled.ul`
  display: flex;

  li {
    list-style-type: none;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 2rem;
  }
`