import Navbar from '../components/navbar'
import { Section, Title, Subtitle, CardWrapper, Card } from '../styles/pages/home'

const Home = () => {
  return (
    <>
      <Navbar />
      <Section className="presentation">
        <div className="presentation-content">
          <span>Olá, nós somos a</span>
          <Title>My School.</Title>
          <Subtitle>Nós te ajudamos a aprender.</Subtitle>
          <p>Entendemos a importância do ensino e fazemos com que distância seja somente uma palavra.</p>
          <div className="link">
            <a href="#motivation-nav">
              Conheça nossa motivação
            </a>
          </div>
        </div>
      </Section>
      <Section className="motivation">
        <a id="motivation-nav" className="navigation" />
        <h2>Motivação do projeto</h2>
        <CardWrapper>
          <Card />
          <Card />
          <Card />
        </CardWrapper>
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
