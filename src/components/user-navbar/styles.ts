import styled, { css } from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { showFromTop } from '../../styles/animations';
interface NavProps {
  isMobile: boolean;
}

export const DesktopNav = styled.nav<NavProps>`
  width: 100%;
  height: 100%;

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

  ${({ isMobile }) =>
    isMobile &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
      animation: ${showFromTop} 0.2s ease-in-out;
    `}
`;

export const NavContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  padding: 0 2rem;

  & > * {
    width: 33%;
  }

  // Tablets
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 2rem;
  }
`;

export const Title = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const OpenMobileMenu = styled(GiHamburgerMenu)`
  display: none;
  font-size: 3rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const OpenMobileNav = styled.div`
  display: none;
  text-align: right;
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
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 768px) {
    display: none;
  }

  li {
    list-style-type: none;
    transition: all 0.1s ease-in-out;

    &:not(:last-child) {
      margin: 0 1rem;
    }

    &:hover {
      color: var(--primary);
    }

    * {
      color: inherit;
      font-size: 2.2rem;
      font-weight: bold;
    }
  }
`;

export const CustomTooltip = styled.span`
  font-size: 1.1rem;
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
