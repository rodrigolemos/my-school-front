import React, { ReactElement } from 'react';
import Link from 'next/link';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BsPieChartFill } from 'react-icons/bs';
import { IoIosList } from 'react-icons/io';
import { GoMortarBoard } from 'react-icons/go';
import { FaUserEdit } from 'react-icons/fa';
import { BsCardChecklist } from 'react-icons/bs';
import { Container, LevelsList, ListIcon } from './styles';
import { Divider, ListItem, ListItemText } from '@material-ui/core';

interface ISidebarMenu {
  isAdmin: boolean;
}

const SidebarMenu: React.FC<ISidebarMenu> = ({ isAdmin }: ISidebarMenu): ReactElement => {
  return (
    <Container>
      <LevelsList>
        <Link href="/dashboard">
          <ListItem button>
            <ListIcon>
              <BsPieChartFill />
            </ListIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link href="/profile">
          <ListItem button>
            <ListIcon>
              <FaUserEdit />
            </ListIcon>
            <ListItemText primary="Perfil" />
          </ListItem>
        </Link>
        {isAdmin ? (
          <>
            <Divider />
            <Link href="/courses">
              <ListItem button>
                <ListIcon>
                  <IoIosList />
                </ListIcon>
                <ListItemText primary="Cursos" />
              </ListItem>
            </Link>
            <Link href="/users">
              <ListItem button>
                <ListIcon>
                  <AiOutlineUsergroupAdd />
                </ListIcon>
                <ListItemText primary="Usuários" />
              </ListItem>
            </Link>
            <Link href="/enrollments">
              <ListItem button>
                <ListIcon>
                  <BsCardChecklist />
                </ListIcon>
                <ListItemText primary="Matrículas" />
              </ListItem>
            </Link>
          </>
        ) : (
          <>
            <Link href="/classes">
              <ListItem button>
                <ListIcon>
                  <GoMortarBoard />
                </ListIcon>
                <ListItemText primary="Aulas" />
              </ListItem>
            </Link>
          </>
        )}
      </LevelsList>
    </Container>
  );
};

export default SidebarMenu;
