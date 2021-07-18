import React, { ReactElement } from 'react';
import { FaUsers, FaUserGraduate, FaUsersCog, FaUserTie } from 'react-icons/fa';

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
          <p>Uma aplicação fictícia para simular um sistema educacional.</p>
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
              <FaUsers />
            </div>
            <div className="content">
              <div className="title">VISITANTES</div>
              <p>
                Consulte os cursos disponíveis e as páginas de cadastro e login para ver na prática
                o uso da stack de front-end React, Styled Components e Next.js.
              </p>
            </div>
          </Card>
          <Card>
            <div className="image">
              <FaUserGraduate />
            </div>
            <div className="content">
              <div className="title">ALUNOS</div>
              <p>
                Faça seu cadastro e matricule-se nos cursos ofertados, acompanhe a aprovação de suas
                solicitações e assista as aulas disponíveis na plataforma!
              </p>
            </div>
          </Card>
          <Card>
            <div className="image">
              <FaUserTie />
            </div>
            <div className="content">
              <div className="title">PROFESSORES</div>
              <p>
                Crie aulas e quizzes, proponha temas de discussão, avalie seus alunos e colabore com
                o crescimento da plataforma.
              </p>
            </div>
          </Card>
          <Card>
            <div className="image">
              <FaUsersCog />
            </div>
            <div className="content">
              <div className="title">ADMINISTRADORES</div>
              <p>
                Gerencie os recursos da plataforma. Inclua, altere ou exclua cursos, alunos,
                professores e matrículas; Revise e aprove solicitações.
              </p>
            </div>
          </Card>
        </ContentWrapper>
        <SectionAdditional>De quem desenvolve para quem desenvolve.</SectionAdditional>
      </Motivation>
    </PublicLayout>
  );
}
