import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.todo || initialState;

export const selectTodo = createSelector([selectSlice], state => state);
