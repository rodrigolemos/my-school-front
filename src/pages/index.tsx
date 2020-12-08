import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { Section, SectionName, SectionAdditional, AnimatedBanner, CardsWrapper, Card, Presentation, Motivation, Information } from '../styles/pages/home'

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
        <SectionName>A sala de aula fora da sala</SectionName>
        <CardsWrapper>
          <Card>
            <div className="image first"></div>
            <div className="content">
              <div className="title">ACOMPANHAMENTO</div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam numquam nesciunt expedita quasi harum veniam asperiores delectus tenetur neque distinctio reprehenderit vel est autem quis ex voluptate maxime, ratione sed.</p>
            </div>
          </Card>
          <Card>
            <div className="image second"></div>
            <div className="content">
              <div className="title">CONECTIVIDADE</div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, aliquam cum in laudantium nam quo aperiam.</p>
            </div>
          </Card>
          <Card>
            <div className="image third"></div>
            <div className="content">
              <div className="title">COLABORAÇÃO</div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            </div>
          </Card>
          <Card>
            <div className="image fourth"></div>
            <div className="content">
              <div className="title">CRIATIVIDADE</div>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et blanditiis consectetur consequatur cum distinctio expedita ratione sit at sint! Voluptas, maxime praesentium! Et incidunt iure similique autem provident ex doloremque!</p>
            </div>
          </Card>
        </CardsWrapper>
        <SectionAdditional>
          Além disso, contamos com o engajamento de pessoas incríveis como você.
        </SectionAdditional>
      </Motivation>
      <Information>
        <a id="information" className="navigation" />
        <h2>Como o EAD está transformando a sociedade</h2>
      </Information>
      <Section>
        <a id="technologies" className="navigation" />
        <h2>Tecnologias</h2>
      </Section>
      <Footer />
    </>
  )
}

export default Home
