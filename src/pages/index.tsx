import Navbar from '../components/navbar'
import { Section, AnimatedBanner, Presentation, Title, Subtitle } from '../styles/pages/home'

const Home = () => {
  return (
    <>
      <Navbar />
      <Presentation>
        <AnimatedBanner>
          <span>Olá, nós somos a</span>
          <Title>My School.</Title>
          <Subtitle>Nós te ajudamos a aprender.</Subtitle>
          <p>Entendemos a importância do ensino e fazemos com que distância seja somente uma palavra.</p>
          <div className="link">
            <a href="#motivation">
              Conheça nossa motivação
            </a>
          </div>
        </AnimatedBanner>
      </Presentation>
      <Section>
        <a id="motivation" className="navigation" />
        <div className="centered-content">
          <h2>Motivação do projeto</h2>
        </div>
      </Section>
      <Section>
        <a id="information" className="navigation" />
        <h2>Informações sobre EAD</h2>
      </Section>
      <Section>
        <h2>Tecnologias</h2>
      </Section>
    </>
  )
}

export default Home
