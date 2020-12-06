import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
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
    min-height: 90vh;
    margin-top: 10vh;
    
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
    --secondary: #03719C;
    --tertiary: #343837;
    --background: #FFFFFF;
    --shadow: #DDDDDD;
    --white: #F1F1F1;
  }
`
