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
  justify-content: flex-start;
  flex-direction: column;
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
      margin: 2rem 0;
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

export const Content = styled.div`
  width: 95%;
  min-height: 85%;
  padding: 1rem;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  @media (max-width: 375px) {
    flex-direction: column;
  }
`

export const ProfileColumn = styled.div`
  height: 100%;
  width: 30%;
  padding: 1rem;

  display: flex;
  flex-direction: column;

  @media (max-width: 375px) {
    width: 100%;
  }
`

export const InnerProfile = styled.div`
  width: 100%;
  border: 1px solid var(--logged);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`

export const ProfileDetails = styled(InnerProfile)`
  height: 55%;
`

export const ProfileAbout = styled(InnerProfile)`
  height: 45%;
`

export const StatsColumn = styled.div`
  height: 100%;
  width: 70%;
  padding: 1rem;

  @media (max-width: 375px) {
    width: 100%;
  }
`

export const StatsDetails = styled.div`
  width: 100%;
  height: 85%;
  border: 1px solid var(--logged);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Controls = styled.div`
  width: 100%;
  height: 15%;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 375px) {
    justify-content: center;

    button {
      width: 100%;
    }
  }
`