import React, { ReactElement } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BsChatSquareQuote } from 'react-icons/bs'
import { FaTwitter } from 'react-icons/fa'
import { formatDate } from '../../utils/date'
import {
  ProfileColumn,
  ProfileAbout,
  ProfileDetails,
  Avatar,
  Personal,
  About
} from './styles'

interface IUser {
  id: string
  name: string
  email: string
  role: string
  contact: string
  bio: string
  created_by?: string
  created_at: Date
  updated_at: Date
}

const ProfileContainer: React.FC<IUser> = (user: IUser): ReactElement => {
  return (
    <ProfileColumn >
      <ProfileDetails>
        <Avatar className="themed-aux">{user.name.substr(0, 1)}</Avatar>
        <Personal>
          <span>{user.name}</span>
          <span>{user.role}</span>
          <span>{user.email}</span>
        </Personal>
      </ProfileDetails>
      <ProfileAbout>
        <About className="themed-aux">
          <span>Sobre</span>
          <label>
            <AiFillHome />Perfil criado {formatDate(user.created_at)}
          </label>
          <label>
            <FaTwitter />Contato: {user.contact ? user.contact : 'Adicione um contato!'}
          </label>
          <label>
            <BsChatSquareQuote />Bio: {user.bio ? user.bio : 'Adicione uma bio!'}
          </label>
        </About>
      </ProfileAbout>
    </ProfileColumn>
  )
}

export default ProfileContainer
