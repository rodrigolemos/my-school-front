import React, { ReactElement } from 'react';
import { FaUserGraduate, FaUsersCog, FaUserTie } from 'react-icons/fa';

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
          <p>Uma aplicação fictícia de cursos online.</p>
          <div className="link">
            <a href="#motivation">Saiba mais</a>
          </div>
        </AnimatedBanner>
      </Presentation>
      <Motivation>
        <a id="motivation" className="navigation" />
        <SectionName>Uma proposta simples</SectionName>
        <ContentWrapper>
          <Card>
            <div className="image">
              <FaUserGraduate />
            </div>
            <div className="content">
              <div className="title">PARA ALUNOS</div>
              <p>
                Faça seu cadastro e matricule-se nos cursos ofertados, assista as aulas disponíveis
                na plataforma e contribua para a comunidade.
              </p>
            </div>
          </Card>
          <Card>
            <div className="image">
              <FaUserTie />
            </div>
            <div className="content">
              <div className="title">PARA PROFESSORES</div>
              <p>
                Crie aulas e questionários, proponha temas de discussão, avalie seus alunos e
                colabore com o crescimento da plataforma.
              </p>
            </div>
          </Card>
          <Card>
            <div className="image">
              <FaUsersCog />
            </div>
            <div className="content">
              <div className="title">PARA ADMINISTRADORES</div>
              <p>
                Gerencie os recursos da plataforma. Inclua, altere ou exclua cursos, alunos,
                professores e matrículas; Revise e aprove solicitações.
              </p>
            </div>
          </Card>
        </ContentWrapper>
        <SectionAdditional>De quem desenvolve para quem se desenvolve.</SectionAdditional>
      </Motivation>
    </PublicLayout>
  );
}
