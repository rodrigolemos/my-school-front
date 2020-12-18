import styled, { css } from 'styled-components'
import { DialogContent, TextField } from '@material-ui/core'

interface IContainer {
  customtheme: string
}

export const CustomDialogContent = styled(DialogContent)<IContainer>`
  transition: all .2s ease-in-out;
  ${({ customtheme }) => customtheme === 'dark' ? css`
    background-color: var(--logged);
    color: var(--white) !important;
  ` : css`
    background-color: var(--white);
    color: var(--logged) !important;
  `}
`

export const CustomInput = styled(TextField)`
  margin: 1.8rem 0 !important;
  width: 100%;
  * {
    font-size: 1.4rem !important;
    padding-top: .6rem;
    color: inherit !important;
  }
`

export const Form = styled.form`
  h1 {
    font-size: 2rem;
  }
`