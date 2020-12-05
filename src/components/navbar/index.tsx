import Link from 'next/link'
import { Nav, Title, Menu } from './styles'

const Navbar = () => {
  return (
    <Nav>
      <Title>My School</Title>
      <Menu>
        <li>
          <Link href="/course-list">
            Cursos
          </Link>
        </li>
        <li>
          <Link href="/login">
            Login
          </Link>
        </li>
        <li>
          <Link href="/create-profile">
            Criar Perfil
          </Link>
        </li>
        <li>
          <Link href="/about">
            Sobre
          </Link>
        </li>
      </Menu>
    </Nav>
  )
}

export default Navbar
