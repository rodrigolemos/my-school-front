import React, { ReactElement } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { BsChatSquareQuote } from 'react-icons/bs';
import { FaTwitter } from 'react-icons/fa';
import { RiUser3Fill } from 'react-icons/ri';
import { FaUserCog, FaChalkboardTeacher } from 'react-icons/fa';
import { formatDate } from '../../utils/date';
import {
  ProfileColumn,
  ProfileAbout,
  ProfileDetails,
  Avatar,
  Personal,
  About,
  CustomRoleDescription
} from './styles';
import { IUser } from '../../interfaces/IUser';

export const RoleDescription = ({ userRole }: { userRole: string }): ReactElement => {
  const roles = {
    student: {
      label: 'Aluno',
      icon: <RiUser3Fill />
    },
    teacher: {
      label: 'Professor',
      icon: <FaChalkboardTeacher />
    },
    admin: {
      label: 'Administrador',
      icon: <FaUserCog />
    }
  };
  return (
    <>
      {roles[userRole] ? (
        <CustomRoleDescription>
          {roles[userRole].icon} {roles[userRole].label}
        </CustomRoleDescription>
      ) : (
        <CustomRoleDescription>Perfil Não Identificado</CustomRoleDescription>
      )}
    </>
  );
};

const ProfileContainer: React.FC<IUser> = (user: IUser): ReactElement => {
  return (
    <ProfileColumn>
      <ProfileDetails>
        <Avatar className="themed-aux">{user.name.substr(0, 1)}</Avatar>
        <Personal>
          <span>{user.name}</span>
          <RoleDescription userRole={user.role} />
          <span>{user.email}</span>
        </Personal>
      </ProfileDetails>
      <ProfileAbout>
        <About className="themed-aux">
          <span>Sobre</span>
          <label>
            <AiFillHome />
            Perfil criado {formatDate(user.created_at)}
          </label>
          <label>
            <FaTwitter />
            Contato: {user.contact ? user.contact : 'Adicione um contato!'}
          </label>
          <label>
            <BsChatSquareQuote />
            Bio: {user.bio ? user.bio : 'Adicione uma bio!'}
          </label>
        </About>
      </ProfileAbout>
    </ProfileColumn>
  );
};

export default ProfileContainer;
