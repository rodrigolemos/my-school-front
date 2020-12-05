import styled from 'styled-components'

export const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #DDD;

  width: 100%;
  height: 5rem;
  
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const Title = styled.h1`
  font-size: 20px;
`

export const Menu = styled.ul`
  font-size: 12px;
  display: flex;

  li {
    list-style-type: none;
    margin: 0 1rem;

    a {
      text-decoration: none;
    }
  }
`