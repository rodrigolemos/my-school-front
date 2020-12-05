import { useRouter } from 'next/router'

const About = () => {
  const router = useRouter()
  return (
    <>
      <h1>Sobre</h1>
      <span onClick={() => router.back()}>Voltar</span>
    </>
  )
}

export default About