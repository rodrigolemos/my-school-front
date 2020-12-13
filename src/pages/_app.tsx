/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable linebreak-style */
import React from 'react'
import { ThemeContextProvider } from '../hooks/theme'
import GlobalStyle from '../styles/GlobalStyle'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet" />
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeContextProvider>
  )
}

export default MyApp
