import { ICourse } from './ICourse';
import { IUser } from './IUser';

export interface IEnrollment {
  user_id: IUser;
  course_id: ICourse;
  positions: number;
  created_at: Date;
  updated_at: Date;
  status: string;
}
