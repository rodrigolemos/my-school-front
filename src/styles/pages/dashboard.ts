import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--logged-dark);
  color: var(--white);
`

export const Main = styled.main`
  position: relative;
  width: 83%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1110px) {
    width: 100%;
  }
`

export const ContentWrapper = styled.div`
  width: 100%;
  height: 90vh;
  margin-top: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`