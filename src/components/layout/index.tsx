import React, { ReactElement } from 'react';
import Link from 'next/link';
import { Container, Logo } from './styles';

import { GoMortarBoard } from 'react-icons/go';
import SidebarMenu from '../../components/sidebar-menu';
import UserNavBar from '../../components/user-navbar';

interface ILayout {
  isAdmin: boolean;
  title: string;
  children: ReactElement | ReactElement[];
}

export default function Layout({ isAdmin, title, children }: ILayout): ReactElement {
  return (
    <Container className="themed">
      <div className="nav">
        <UserNavBar title={title} />
      </div>
      <div className="logo">
        <Link href="/">
          <Logo>
            <GoMortarBoard />
            My School
          </Logo>
        </Link>
      </div>
      <div className="aside">
        <SidebarMenu isAdmin={isAdmin} />
      </div>
      <div className="main">{children}</div>
    </Container>
  );
}
