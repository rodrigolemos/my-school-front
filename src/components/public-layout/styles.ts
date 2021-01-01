import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  display: grid;
  grid-template-areas:
    'nav'
    'main'
    'footer';
  grid-template-columns: 1fr;
  grid-template-rows: 10vh auto 50vh;

  .nav {
    grid-area: nav;
  }

  .main {
    grid-area: main;
  }

  .footer {
    grid-area: footer;
  }
`;
