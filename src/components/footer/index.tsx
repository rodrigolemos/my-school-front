import React, { ReactElement } from 'react';
import { AiFillLinkedin, AiFillGithub, AiFillTwitterCircle } from 'react-icons/ai';
import { DesktopFooter, FooterContent, ContactBox, Copyright } from './styles';

const Footer: React.FC = (): ReactElement => {
  return (
    <DesktopFooter>
      <FooterContent>
        <ContactBox>
          Rodrigo Lemos | My School
          <AiFillLinkedin />
          <AiFillGithub />
          <AiFillTwitterCircle />
        </ContactBox>
      </FooterContent>
      <Copyright>&copy; 2021 Todos os direitos reservados</Copyright>
    </DesktopFooter>
  );
};

export default Footer;
