import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-columns: 20vw 1fr;
  grid-template-rows: 10vh 1fr;
  grid-template-areas:
    'logo nav'
    'aside main';

  .nav {
    grid-area: nav;
  }

  .logo {
    grid-area: logo;
  }

  .aside {
    grid-area: aside;
  }

  .main {
    grid-area: main;
    overflow-y: auto;

    padding: 1rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    grid-template-areas:
      'nav nav'
      'main main';

    .logo {
      display: none;
    }

    .aside {
      display: none;
    }
  }
`;

export const Logo = styled.div`
  font-size: 2.6rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10vh;
  background-color: var(--logged);
  color: var(--white);
  cursor: pointer;

  svg {
    margin-right: 1rem;
  }

  a,
  a:active,
  a:visited {
    color: inherit;
    text-decoration: none !important;
  }
`;
