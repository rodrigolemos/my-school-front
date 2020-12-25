import React, { ReactElement } from 'react';
import { ThemeContextProvider } from '../hooks/theme';
import GlobalStyle from '../styles/GlobalStyle';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function MyApp({ Component, pageProps }): ReactElement {
  return (
    <ThemeContextProvider>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
        rel="stylesheet"
      />
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeContextProvider>
  );
}

export default MyApp;
