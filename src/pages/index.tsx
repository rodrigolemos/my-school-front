import React, { ReactElement } from 'react';

import PublicLayout from '../components/public-layout';
import {
  AnimatedBanner,
  Card,
  ContentWrapper,
  Motivation,
  Presentation,
  SectionAdditional,
  SectionName
} from '../styles/pages/home';

export default function Home(): ReactElement {
  return (
    <PublicLayout>
      <Presentation>
        <AnimatedBanner>
          <span>Olá, nós somos a</span>
          <h1>My School.</h1>
          <h2>Aprendemos com você como ensinar melhor.</h2>
          <p>
            Uma aplicação fictícia para simular o controle de usuários em um sistema educacional
            feita com Node, Typescript e NextJS.
          </p>
          <div className="link">
            <a href="#motivation">Conheça o projeto</a>
          </div>
        </AnimatedBanner>
      </Presentation>
      <Motivation>
        <a id="motivation" className="navigation" />
        <SectionName>A sala de aula fora da sala</SectionName>
        <ContentWrapper>
          <Card>
            <div className="image first"></div>
            <div className="content">
              <div className="title">PARTICIPAÇÃO</div>
              <p>
                Construa sua própria grade com temas que julgue importantes para o aprendizado e
                tenha seu curso avaliado por alunos com perfis parecidos. Os melhores cursos são
                disponibilizados para o público e você é presenteado com bônus exclusivos.
              </p>
            </div>
          </Card>
          <Card>
            <div className="image second"></div>
            <div className="content">
              <div className="title">CONECTIVIDADE</div>
              <p>
                Esteja em contato com alunos e professores com interesses similares através de
                canais exclusivos e discuta ideias 24h por dia, 7 dias por semana.
              </p>
            </div>
          </Card>
          <Card>
            <div className="image third"></div>
            <div className="content">
              <div className="title">COLABORAÇÃO</div>
              <p>
                Proponha temas, avalie cursos, participe de grupos de discussão e tenha feedback
                individual e personalizado. Aqui sua opinião conta (e muito).
              </p>
            </div>
          </Card>
          <Card>
            <div className="image fourth"></div>
            <div className="content">
              <div className="title">CRIATIVIDADE</div>
              <p>
                Crie posts interativos, pesquisas e atividades para tornar seu curso mais atrativo e
                divertido para o público. Quanto maior sua comunidade, mais bem avaliado seus cursos
                serão.
              </p>
            </div>
          </Card>
        </ContentWrapper>
        <SectionAdditional>
          Uma plataforma educacional para quem usa e para quem desenvolve.
        </SectionAdditional>
      </Motivation>
    </PublicLayout>
  );
}
