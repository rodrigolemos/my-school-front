import { BsCardChecklist } from 'react-icons/bs'
import { IoIosList } from 'react-icons/io'
import { GoMortarBoard } from 'react-icons/go'
import { FaUserEdit } from 'react-icons/fa'
import { useTheme } from '../../hooks/theme'
import { Container, Title, Content, LevelsList } from './styles'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

const SidebarMenu: React.FC = () => {
  const { theme } = useTheme()
  return (
    <Container customTheme={theme}>
      <Title>
        <GoMortarBoard />My School
      </Title>
      <Content>
        <LevelsList>
          <ListItem button>
            <ListItemIcon><IoIosList /></ListItemIcon>
            <ListItemText primary="Cursos" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><BsCardChecklist /></ListItemIcon>
            <ListItemText primary="Matrículas" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><FaUserEdit /></ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItem>
          <ListItem button>
            <ListItemIcon><GoMortarBoard /></ListItemIcon>
            <ListItemText primary="Aulas" />
          </ListItem>
        </LevelsList>
      </Content>
    </Container>
  )
}

export default SidebarMenu
