import Link from 'next/link'
import { FiMoon } from 'react-icons/fi'
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
          <li>
            <FiMoon />
          </li>
        </Menu>
      </NavContent>
    </Nav>
  )
}

export default Navbar
