import React, { ReactElement, useState } from 'react';
import Link from 'next/link';
import { GoMortarBoard } from 'react-icons/go';
import {
  DesktopNav,
  NavContent,
  Title,
  MobileMenu,
  Menu,
  OpenMobileNav,
  CloseMobileNav,
  MobileNav
} from './styles';

type typeTsMobile = boolean;

const Navbar: React.FC = (): ReactElement => {
  const [isMobile, setIsMobile] = useState<typeTsMobile>(false);
  return (
    <>
      <DesktopNav isMobile={isMobile}>
        <NavContent>
          <Title>
            <GoMortarBoard />
            <Link href="/">My School</Link>
          </Title>
          <Menu>
            <li>
              <Link href="/course-list">Cursos</Link>
            </li>
            <li>
              <Link href="/create-profile">Criar Perfil</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </Menu>
          <OpenMobileNav onClick={() => setIsMobile(true)} />
        </NavContent>
      </DesktopNav>
      <MobileNav isMobile={isMobile}>
        <CloseMobileNav onClick={() => setIsMobile(false)} />
        <MobileMenu>
          <li>
            <Link href="/">Início</Link>
          </li>
          <li>
            <Link href="/course-list">Cursos</Link>
          </li>
          <li>
            <Link href="/create-profile">Criar Perfil</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
        </MobileMenu>
      </MobileNav>
    </>
  );
};

export default Navbar;
