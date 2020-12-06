import Navbar from '../components/navbar'
import { Section } from '../styles/pages/home'

const Home = () => {
  return (
    <>
      <Navbar />
      <Section>
        <h1>Identidade Visual, título, marca, etc.</h1>
      </Section>
      <Section>
        <h2>Motivação do projeto</h2>
      </Section>
      <Section>
        <h2>Informações sobre EAD</h2>
      </Section>
      <Section>
        <h2>Tecnologias</h2>
      </Section>
    </>
  )
}

export default Home
