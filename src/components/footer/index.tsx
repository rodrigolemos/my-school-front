import React, { ReactElement } from 'react'
import { AiFillLinkedin, AiFillGithub, AiFillTwitterCircle } from 'react-icons/ai'
import { GoMortarBoard } from 'react-icons/go'
import { DesktopFooter, FooterContent, BrandBox, ContactBox, Copyright } from './styles'

const Footer: React.FC = (): ReactElement => {
  return (
    <DesktopFooter>
      <FooterContent>
        <BrandBox>
          <GoMortarBoard /> My School
        </BrandBox>
        <ContactBox>
          Rodrigo Lemos
          <div>
            <AiFillLinkedin />
            <AiFillGithub />
            <AiFillTwitterCircle />
          </div>
        </ContactBox>
        <Copyright>
          &copy; 2020 Todos os direitos reservados
        </Copyright>
      </FooterContent>
    </DesktopFooter>
  )
}

export default Footer