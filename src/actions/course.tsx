import { ICourse } from '../interfaces/ICourse';

export type Action = {
  type: 'SELECT_COURSE';
  payload: ICourse;
};

export const selectCourse = (course: ICourse): Action => ({
  type: 'SELECT_COURSE',
  payload: course
});
