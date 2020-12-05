import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
  * {
    margin: 0;
    padding: 0;
  }

  html {
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    font-size: 10px;
  }

  body {
    width: 100vw;
    height: 90vh;
    margin-top: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
