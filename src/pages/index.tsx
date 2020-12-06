import Navbar from '../components/navbar'
import { Section, Title, Subtitle } from '../styles/pages/home'

const Home = () => {
  return (
    <>
      <Navbar />
      <Section className="presentantion">
        <div className="content">
          <span>Olá, nós somos a</span>
          <Title>My School.</Title>
          <Subtitle>Nós te ajudamos a aprender.</Subtitle>
          <p>Entendemos a importância do ensino e fazemos com que "distância" seja somente uma palavra.</p>
        </div>
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
