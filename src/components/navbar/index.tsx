import { useState } from 'react'
import Link from 'next/link'
import { FiMoon } from 'react-icons/fi'
import { GoMortarBoard } from 'react-icons/go'
import { DesktopNav, NavContent, Title, MobileMenu, Menu, OpenMobileNav, CloseMobileNav, MobileNav } from './styles'

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false)
  return (
    <>
      <DesktopNav isMobile={isMobile}>
        <NavContent>
          <Title>
            <GoMortarBoard />
            <Link href="/">
              My School
            </Link>
          </Title>
          <Menu>
            <li>
              <Link href="/course-list">
                Cursos
              </Link>
            </li>
            <li>
              <Link href="/create-profile">
                Criar Perfil
              </Link>
            </li>
            <li>
              <Link href="/login">
                Login
              </Link>
            </li>
            <li>
              <Link href="/about">
                Sobre
              </Link>
            </li>
            <li>
              <FiMoon />
            </li>
          </Menu>
          <OpenMobileNav onClick={() => setIsMobile(true)} />
        </NavContent>
      </DesktopNav>
      <MobileNav isMobile={isMobile}>
        <CloseMobileNav onClick={() => setIsMobile(false)} />
        <MobileMenu>
          <li>
            <Link href="/">
              Início
            </Link>
          </li>
          <li>
            <Link href="/course-list">
              Cursos
            </Link>
          </li>
          <li>
            <Link href="/create-profile">
              Criar Perfil
            </Link>
          </li>
          <li>
            <Link href="/login">
              Login
            </Link>
          </li>
          <li>
            <Link href="/about">
              Sobre
            </Link>
          </li>
        </MobileMenu>
      </MobileNav>
    </>
  )
}

export default Navbar
