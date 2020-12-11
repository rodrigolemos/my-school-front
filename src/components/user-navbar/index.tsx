import { useState } from 'react'
import { Cookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { BiMoon } from 'react-icons/bi'
import { RiChat4Line } from 'react-icons/ri'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BsPower } from 'react-icons/bs'
import { useTheme } from '../../hooks/theme'
import { DesktopNav, NavContent, Title, MobileMenu, Menu, OpenMobileMenu, OpenMobileNav, CloseMobileNav, MobileNav } from './styles'

interface IUserNavbarProps {
  title: string
}

const UserNavbar: React.FC<IUserNavbarProps> = ({ title }) => {
  const { theme, changeTheme } = useTheme()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  const logOut = () => {
    const cookies = new Cookies()

    cookies.remove('@my-school:email')
    cookies.remove('@my-school:token')

    router.push('/login')
  }

  return (
    <>
      <DesktopNav isMobile={isMobile} customTheme={theme}>
        <NavContent>
          <div>
            <OpenMobileMenu />
          </div>
          <Title>
            <h1>{title}</h1>
          </Title>
          <Menu>
            <li>
              <BiMoon onClick={changeTheme} />
            </li>
            <li>
              <RiChat4Line />
            </li>
            <li>
              <IoMdNotificationsOutline />
            </li>
            <li>
              <BsPower onClick={logOut} />
            </li>
          </Menu>
          <OpenMobileNav>
            <GiHamburgerMenu onClick={() => setIsMobile(true)} />
          </OpenMobileNav>
        </NavContent>
      </DesktopNav>
      <MobileNav isMobile={isMobile} customTheme={theme}>
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
            <span onClick={logOut}>
              Sair
            </span>
          </li>
        </MobileMenu>
      </MobileNav>
    </>
  )
}

export default UserNavbar
