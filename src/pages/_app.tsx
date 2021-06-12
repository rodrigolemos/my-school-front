import React, { ReactElement } from 'react';
import Head from 'next/head';
import { ThemeContextProvider } from '../hooks/theme';
import GlobalStyle from '../styles/GlobalStyle';

function MyApp({ Component, pageProps }): ReactElement {
  return (
    <ThemeContextProvider>
      <Head>
        <title>My School</title>
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeContextProvider>
  );
}

export default MyApp;
