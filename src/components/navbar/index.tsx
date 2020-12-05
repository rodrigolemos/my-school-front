import Link from 'next/link'
import { Nav, NavContent, Title, Menu } from './styles'

const Navbar = () => {
  return (
    <Nav>
      <NavContent>
        <Title>
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
        </Menu>
      </NavContent>
    </Nav>
  )
}

export default Navbar
