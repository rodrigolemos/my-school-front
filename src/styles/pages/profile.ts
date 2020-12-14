import styled, { css } from 'styled-components'
import { TextField } from '@material-ui/core'

interface IContainer {
  customTheme: string
}

export const Container = styled.div<IContainer>`
  width: 100vw;
  min-height: 100vh;
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

  @media (max-width: 768px) {
    height: auto;
  }
`

export const Header = styled.div`
  width: 95%;
  min-height: 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  @media (max-width: 768px) {
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

    @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const ProfileColumn = styled.div`
  height: 100%;
  width: 35%;
  padding: 1rem;

  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const InnerProfile = styled.div`
  width: 100%;
  /* border: 1px solid var(--logged); */
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
  min-height: 340px;
  flex-direction: column;
`

export const Avatar = styled.div<IContainer>`
  width: 200px;
  height: 200px;
  margin-bottom: 2rem;
  border-radius: 50%;
  
  ${({ customTheme }) => customTheme === 'dark' ? css`
    background-color: var(--logged);
    color: var(--white);
  ` : css`
    background-color: var(--lighter);
    color: var(--logged);
  `}
`

export const Personal = styled.div`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  span {
    margin-bottom: 1rem;
  }
`

export const About = styled.div<IContainer>`
  font-size: 1.4rem;
  width: 80%;
  height: 75%;
  border-radius: 5px;
  padding: 1.6rem;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  transition: all .2s ease-in-out;
  ${({ customTheme }) => customTheme === 'dark' ? css`
    background-color: var(--logged);
    color: var(--white);
  ` : css`
    background-color: var(--lighter);
    color: var(--logged);
  `}

  @media (max-width: 375px) {
    width: 95%;
    height: 100%;
  }

  span, label {
    margin-bottom: 2rem;
  }

  label {
    display: flex;
    align-items: center;

    svg {
      font-size: 2rem;
      margin-right: 1rem;
    }
  }
`

export const ProfileAbout = styled(InnerProfile)`
  height: 45%;
  min-height: 278px;
`

export const FormColumn = styled.div`
  height: 100%;
  width: 65%;
  padding: 1rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const FormArea = styled.div`
  width: 100%;
  height: 85%;
  min-height: 536px;
  /* border: 1px solid var(--logged); */
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`

export const Form = styled.form<IContainer>`
  width: 100%;
  height: 100%;
  padding: 2rem;
  border-radius: 5px;

  h3 {
    font-size: 2rem;
  }

  transition: all .2s ease-in-out;
  ${({ customTheme }) => customTheme === 'dark' ? css`
    background-color: var(--logged);
    * {
      color: var(--white);
    }
  ` : css`
    background-color: var(--lighter);
    * {
      color: var(--logged);
    }
  `}
`

export const Controls = styled.div`
  width: 100%;
  height: 15%;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 2rem;

    button {
      width: 100%;
    }
  }
`

export const CustomInput = styled(TextField)`
  margin: 2rem 0 !important;
  width: 100%;
  * {
    font-size: 1.6rem !important;
    padding-top: .6rem;
    color: inherit !important;
  }
`