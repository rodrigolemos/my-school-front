import React, { ReactElement } from 'react';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { DesktopFooter, FooterContent, ContactBox, Copyright } from './styles';

const Footer: React.FC = (): ReactElement => {
  return (
    <DesktopFooter>
      <FooterContent>
        <ContactBox>
          <div className="contacts">
            <span>My School</span>
            <a href="https://www.linkedin.com/in/rodrigolemosrl">
              <AiFillLinkedin />
            </a>
            <a href="https://github.com/rodrigolemos">
              <AiFillGithub />
            </a>
          </div>
        </ContactBox>
      </FooterContent>
      <Copyright>&copy; 2021 Todos os direitos reservados</Copyright>
    </DesktopFooter>
  );
};

export default Footer;
