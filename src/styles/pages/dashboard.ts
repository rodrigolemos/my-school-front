import styled, { css } from 'styled-components'

interface IContainer {
  customTheme: string
}

export const Container = styled.div<IContainer>`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all .2s ease-in-out;
  ${({ customTheme }) => customTheme === 'dark' ? css`
    background-color: var(--logged-dark);
    color: var(--white);
  ` : css`
    background-color: var(--white);
    color: var(--logged);
  `}
`

export const Main = styled.main`
  position: relative;
  width: 83%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1110px) {
    width: 100%;
  }
`

export const ContentWrapper = styled.div`
  width: 100%;
  height: 90vh;
  margin-top: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`