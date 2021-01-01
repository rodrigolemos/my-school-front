import React, { ReactElement } from 'react';
import { Container } from './styles';

import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

interface IPublicLayout {
  children: ReactElement | ReactElement[];
}

export default function PublicLayout({ children }: IPublicLayout): ReactElement {
  return (
    <Container>
      <div className="nav">
        <Navbar />
      </div>
      <div className="main">{children}</div>
      <div className="footer">
        <Footer />
      </div>
    </Container>
  );
}
