export interface ICreatedBy {
  id: string;
  name: string;
  email: string;
}

export interface ICourse {
  id: string;
  name: string;
  description: string;
  created_by?: ICreatedBy;
  created_at?: Date;
  updated_at?: Date;
  tags?: [];
}
