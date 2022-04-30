import { Action } from '../actions/course';
import { ICourse } from '../interfaces/ICourse';

export const courseReducer = (state: ICourse, action: Action): ICourse => {
  switch (action.type) {
    case 'SELECT_COURSE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
