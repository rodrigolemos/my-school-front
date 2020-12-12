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
  align-items: flex-start;
  justify-content: center;
`

export const Header = styled.div`
  width: 95%;
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
      margin-bottom: .8rem;
    }

    h3 {
      font-size: 2.1rem;
      font-weight: normal;
    }

    @media (max-width: 375px) {
      text-align: center;
      margin-bottom: 2rem;
    }
  }

  div.date {
    display: flex;
    align-items: center;
    
    span {
      font-size: 2rem;
      font-weight: normal;
    }

    svg {
      font-size: 3.1rem;
      margin-right: 1.1rem;
    }
  }
`