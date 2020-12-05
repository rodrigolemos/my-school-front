import { useRouter } from 'next/router'
import Navbar from '../components/navbar'

const About = () => {
  const router = useRouter()
  return (
    <>
      <Navbar />
      <h1>Sobre</h1>
      <span onClick={() => router.back()}>Voltar</span>
    </>
  )
}

export default About