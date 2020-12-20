import React, { ReactElement, useState } from 'react'
import { Cookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { BiMoon } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BsPower } from 'react-icons/bs'
import { IconButton, Tooltip } from '@material-ui/core'
import { useTheme } from '../../hooks/theme'
import { DesktopNav, NavContent, Title, MobileMenu, Menu, CustomTooltip, OpenMobileMenu, OpenMobileNav, CloseMobileNav, MobileNav } from './styles'

interface IUserNavbarProps {
  title: string
}

type typeIsMobile = boolean

const UserNavbar: React.FC<IUserNavbarProps> = ({ title }: IUserNavbarProps): ReactElement => {
  const { changeTheme } = useTheme()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState<typeIsMobile>(false)

  const logOut = () => {
    const cookies = new Cookies()

    cookies.remove('@my-school:user')
    cookies.remove('@my-school:token')

    router.push('/login')
  }

  return (
    <>
      <DesktopNav isMobile={isMobile} className="themed">
        <NavContent>
          <div>
            <OpenMobileMenu />
          </div>
          <Title>
            <h1>{title}</h1>
          </Title>
          <Menu>
            <li>
              <Tooltip title={<CustomTooltip>Tema</CustomTooltip>}>
                <IconButton onClick={changeTheme}>
                  <BiMoon />
                </IconButton>
              </Tooltip>
            </li>
            <li>
              <Tooltip title={<CustomTooltip>Notificações</CustomTooltip>}>
                <IconButton onClick={changeTheme}>
                  <IoMdNotificationsOutline />
                </IconButton>
              </Tooltip>
            </li>
            <li>
              <Tooltip title={<CustomTooltip>Sair</CustomTooltip>}>
                <IconButton onClick={logOut}>
                  <BsPower />
                </IconButton>
              </Tooltip>
            </li>
          </Menu>
          <OpenMobileNav>
            <GiHamburgerMenu onClick={() => setIsMobile(true)} />
          </OpenMobileNav>
        </NavContent>
      </DesktopNav>
      <MobileNav isMobile={isMobile} className="themed">
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
