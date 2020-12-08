import styled from 'styled-components'

export const DesktopFooter = styled.footer`  
  position: relative;
  background-color: var(--tertiary);
  color: var(--white);

  width: 100vw;
  height: 50vh;
  
  display: flex;
  align-items: center;
  justify-content: center;
`

export const FooterContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  width: 70%;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 2rem 2rem;
    flex-direction: column;
    justify-content: flex-start;
  }
`

export const Box = styled.div`
  margin-top: 3rem;
  width: 45%;
  display: flex;
  align-items: center;

  padding-top: 1rem;
  font-size: 1.8rem;
  border-top: 1px solid var(--shadow);

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const BrandBox = styled(Box)`
  svg {
    margin-right: 1rem;
  }
`

export const ContactBox = styled(Box)`
  justify-content: space-between;

  svg {
    margin-right: 1rem;
  }
`

export const Copyright = styled.div`
  position: absolute;
  margin: 0 auto;
  bottom: 2rem;
`