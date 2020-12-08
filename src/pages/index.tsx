import Navbar from '../components/navbar'
import { Section, SectionName, AnimatedBanner, CardsWrapper, Card, Presentation, Motivation, Information } from '../styles/pages/home'

const Home = () => {
  return (
    <>
      <Navbar />
      <Presentation>
        <AnimatedBanner>
          <span>Olá, nós somos a</span>
          <h1>My School.</h1>
          <h2>Nós te ajudamos a aprender.</h2>
          <p>Entendemos a importância do ensino e fazemos com que distância seja somente uma palavra.</p>
          <div className="link">
            <a href="#motivation">
              Conheça o projeto
            </a>
          </div>
        </AnimatedBanner>
      </Presentation>
      <Motivation>
        <a id="motivation" className="navigation" />
        <SectionName>Nossa Motivação</SectionName>
        <CardsWrapper>
          <Card />
          <Card />
          <Card />
          <Card />
        </CardsWrapper>
      </Motivation>
      <Information>
        <a id="information" className="navigation" />
        <h2>Informações sobre EAD</h2>
      </Information>
      <Section>
        <a id="technologies" className="navigation" />
        <h2>Tecnologias</h2>
      </Section>
    </>
  )
}

export default Home
