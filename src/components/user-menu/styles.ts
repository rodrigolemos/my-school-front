import styled from 'styled-components'

export const Container = styled.aside`
  z-index: 2;
  height: 100vh;
  width: 17%;
  background-color: #CCC;

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
  background-color: #AAA;

  svg {
    margin-right: 1rem;
  }
  
  a, a:active, a:visited {
    color: inherit;
    text-decoration: none !important;
  }
`
