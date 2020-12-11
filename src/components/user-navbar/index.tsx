import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BsPower } from 'react-icons/bs'
import { MdChatBubbleOutline } from 'react-icons/md'
import { DesktopNav, NavContent, Title, MobileMenu, Menu, OpenMobileMenu, OpenMobileNav, CloseMobileNav, MobileNav } from './styles'

const UserNavbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false)
  return (
    <>
      <DesktopNav isMobile={isMobile}>
        <NavContent>
          <div>
            <OpenMobileMenu />
          </div>
          <Title>
            <h1>Título</h1>
          </Title>
          <Menu>
            <li>
              <MdChatBubbleOutline />
            </li>
            <li>
              <IoMdNotificationsOutline />
            </li>
            <li>
              <BsPower />
            </li>
          </Menu>
          <OpenMobileNav>
            <GiHamburgerMenu onClick={() => setIsMobile(true)} />
          </OpenMobileNav>
        </NavContent>
      </DesktopNav>
      <MobileNav isMobile={isMobile}>
        <CloseMobileNav onClick={() => setIsMobile(false)} />
        <MobileMenu>
          <li>
            <span>
              Mensagens
            </span>
          </li>
          <li>
            <span>
              Notificações
            </span>
          </li>
          <li>
            <span>
              Sair
            </span>
          </li>
        </MobileMenu>
      </MobileNav>
    </>
  )
}

export default UserNavbar
