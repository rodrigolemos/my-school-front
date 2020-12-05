import Link from 'next/link'

const Home = () => {
  return (
    <>
      <h1>Essa será a Home Page</h1>
      <ul>
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
      </ul>
    </>
  )
}

export default Home
