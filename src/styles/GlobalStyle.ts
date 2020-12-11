import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    font-size: 10px;
    scroll-behavior: smooth !important;
  }

  body {
    width: 100vw;
    
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  ::-webkit-scrollbar {
    width: .8rem;
  }

  ::-webkit-scrollbar-track {
    background: #F1F1F1;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #AAA;
    border-radius: .2rem;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #888; 
  }

  :root {
    --primary: #0F9B8E;
    --primary-light: #2FBDAF;
    --secondary: #03719C;
    --secondary-light: #2593BE;
    --tertiary: #343837;
    --tertiary-light: #565A59;
    --background: #FFFFFF;
    --shadow: #DDDDDD;
    --white: #F5F5F5;
    --light: #DEE4F0;

    --logged-dark: #1B2635;
    --logged: #233044;
    --logged-font: #888F99;
  }
`
