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
  tags?: SelectType[];
  resources?: SelectType[];
}

export type SelectType = { value: string; label: string };

export interface ICourseInput {
  id?: string;
  name: string;
  tags: SelectType[];
  icon: string;
  resources?: SelectType[];
  audience?: string;
  knowledge?: string;
  description: string;
  created_by: string;
}
