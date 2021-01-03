import styled from 'styled-components';

export const DesktopFooter = styled.footer`
  position: relative;
  background-color: var(--tertiary);
  color: var(--white);

  width: 100vw;
  height: 50vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

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
`;

export const ContactBox = styled.div`
  margin-top: 3rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  padding-top: 1rem;
  font-size: 1.5rem;
  border-top: 1px solid var(--shadow);

  svg {
    margin: 0 0.6rem;
    font-size: 1.8rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const Copyright = styled.div`
  position: absolute;
  bottom: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;
