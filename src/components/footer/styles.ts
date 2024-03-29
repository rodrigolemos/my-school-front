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
  cursor: default;

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
  margin-top: 2rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.5rem;

  .contacts {
    display: flex;
    align-items: center;
  }

  svg {
    font-size: 2.2rem;
  }

  a,
  a:link,
  a:visited {
    text-decoration: none;
    color: var(--white);

    &:not(:last-child) > svg {
      margin: 0 0.7rem;
    }
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
