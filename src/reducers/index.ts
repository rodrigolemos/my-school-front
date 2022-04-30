import { configureStore } from '@reduxjs/toolkit';
import { courseReducer } from './course';

export const store = configureStore({ reducer: courseReducer });
