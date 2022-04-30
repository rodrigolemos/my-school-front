import React, { ReactElement } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { store } from '../reducers';
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
    },
    Textarea: {
      defaultProps: {
        focusBorderColor: 'orange.500'
      }
    }
  }
});

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>My School</title>
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
