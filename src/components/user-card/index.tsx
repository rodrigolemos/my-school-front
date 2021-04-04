import React, { ReactElement } from 'react';
import { RoleDescription } from '../profile-container';
import { Container } from './styles';
import { IUser } from '../../interfaces/IUser';

const UserCard: React.FC<IUser> = (user: IUser): ReactElement => {
  return (
    <Container>
      <RoleDescription userRole={user.role} />
    </Container>
  );
};

export default UserCard;
