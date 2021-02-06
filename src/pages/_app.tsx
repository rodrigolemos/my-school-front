import React, { ReactElement } from 'react';
import Head from 'next/head';
import { ThemeContextProvider } from '../hooks/theme';
import GlobalStyle from '../styles/GlobalStyle';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }): ReactElement {
  return (
    <ThemeContextProvider>
      <Head>
        <title>My School</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeContextProvider>
  );
}

export default MyApp;
