interface ICreatedBy {
  id: string;
  name: string;
  email: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  contact: string;
  bio: string;
  created_by?: ICreatedBy;
  created_at: Date;
  updated_at: Date;
}
