import Link from 'next/link'
import { BsCardChecklist } from 'react-icons/bs'
import { BsPieChartFill } from 'react-icons/bs'
import { IoIosList } from 'react-icons/io'
import { GoMortarBoard } from 'react-icons/go'
import { FaUserEdit } from 'react-icons/fa'
import { useTheme } from '../../hooks/theme'
import { Container, Title, Content, LevelsList } from './styles'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

interface ISidebarMenu {
  isAdmin: boolean
}

const SidebarMenu: React.FC<ISidebarMenu> = ({ isAdmin }) => {
  const { theme } = useTheme()
  return (
    <Container customTheme={theme}>
      <Title>
        <GoMortarBoard />My School
      </Title>
      <Content>
        <LevelsList>
          <Link href="/dashboard">
            <ListItem button>
              <ListItemIcon><BsPieChartFill /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </Link>
          <Link href="/me">
            <ListItem button>
              <ListItemIcon><FaUserEdit /></ListItemIcon>
              <ListItemText primary="Perfil" />
            </ListItem>
          </Link>
          <Link href="/courses">
            <ListItem button>
              <ListItemIcon><IoIosList /></ListItemIcon>
              <ListItemText primary="Cursos" />
            </ListItem>
          </Link>
          <Link href="/classes">
            <ListItem button>
              <ListItemIcon><GoMortarBoard /></ListItemIcon>
              <ListItemText primary="Aulas" />
            </ListItem>
          </Link>
          {isAdmin && (
            <>
              <Link href="/users">
                <ListItem button>
                  <ListItemIcon><BsCardChecklist /></ListItemIcon>
                  <ListItemText primary="Usuários" />
                </ListItem>
              </Link>
              <Link href="/enrollments">
                <ListItem button>
                  <ListItemIcon><BsCardChecklist /></ListItemIcon>
                  <ListItemText primary="Matrículas" />
                </ListItem>
              </Link>
            </>
          )}
        </LevelsList>
      </Content>
    </Container>
  )
}

export default SidebarMenu
