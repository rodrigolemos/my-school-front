import styled, { css } from 'styled-components'
import { DialogContent, TextField, Select, MenuItem } from '@material-ui/core'

interface IContainer {
  customtheme: string
}

export const CustomDialogContent = styled(DialogContent)<IContainer>`
  transition: all .2s ease-in-out;
  ${({ customtheme }) => customtheme === 'dark' ? css`
    background-color: var(--logged);
    color: var(--white) !important;
    label {
      color: var(--white) !important;
    }
  ` : css`
    background-color: var(--white);
    color: var(--logged) !important;
    label {
      color: var(--logged) !important;
    }
  `}
`

export const CustomInput = styled(TextField)`
  margin: 1.8rem 0 !important;
  * {
    font-size: 1.4rem !important;
    padding-top: .6rem;
    color: inherit !important;
  }
`

export const CustomSelect = styled(Select)<IContainer>`
  ${({ customtheme }) => customtheme === 'dark' ? css`
    color: var(--white) !important;
  ` : css`
    color: var(--logged) !important;
  `}
  div {
    margin-top: 1rem;
    font-size: 1.4rem !important;
  }
`

export const CustomMenuItem = styled(MenuItem)`
  font-size: 1.4rem !important;
`

export const Form = styled.form`
  div {
    width: 100%;
  }
  .select-role {
    margin: 2rem 0;
  }
  h1 {
    font-size: 2rem;
  }
  label {
    font-size: 1.4rem !important;
  }
  span {
    font-size: 1.2rem;
  }
`