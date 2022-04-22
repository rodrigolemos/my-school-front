import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeContextProvider } from '../hooks/theme';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/nunito-sans';

const theme = extendTheme({
  fonts: {
    heading: 'Nunito Sans, sans-serif',
    body: 'Nunito Sans, sans-serif'
  },
  colors: {
    'primary.100': '#161616'
  },
  initialColorMode: 'light',
  useSystemColorMode: false,
  components: {
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: 'orange.500'
        }
      }
    },
    Input: {
      defaultProps: {
        focusBorderColor: 'orange.500'
      }
    }
  }
});

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ThemeContextProvider>
      <ChakraProvider theme={theme}>
        <Head>
          <title>My School</title>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThemeContextProvider>
  );
}

export default MyApp;
