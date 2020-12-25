import styled, { css } from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

interface NavProps {
  isMobile: boolean;
}

export const DesktopNav = styled.nav<NavProps>`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;

  background-color: var(--background);
  color: var(--tertiary);

  width: 100%;
  height: 10vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MobileNav = styled.div<NavProps>`
  display: none;
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  background-color: var(--white);

  ${({ isMobile }) =>
    isMobile &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `}
`;

export const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 70%;
  height: 100%;

  // Tablets
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 2rem;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  display: flex;
  align-items: center;

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

export const OpenMobileNav = styled(GiHamburgerMenu)`
  display: none;
  font-size: 3rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const CloseMobileNav = styled(AiOutlineClose)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  font-size: 2.5rem;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const Menu = styled.ul`
  display: flex;

  @media (max-width: 768px) {
    display: none;
  }

  li {
    list-style-type: none;
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0 2rem;
  }

  a,
  a:active,
  a:visited {
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: var(--primary);
    }
  }
`;

export const MobileMenu = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  width: 100%;
  height: 50%;

  li {
    list-style-type: none;
    font-size: 2.7rem;
    font-weight: bold;
    margin: 0 2rem;
  }

  a,
  a:active,
  a:visited {
    text-decoration: none;
    color: inherit;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: var(--primary);
    }
  }
`;
