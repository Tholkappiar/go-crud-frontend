import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { userInitialState } from './userSlice';

const selectSlice = (state: RootState) => {
  return state.userSlice || userInitialState;
};

export const selectUserIsLoading = createSelector(
  [selectSlice],
  state => state.isLoading,
);

export const selectUserData = createSelector(
  [selectSlice],
  state => state.user,
);

export const selectUserRequestStatus = createSelector(
  [selectSlice],
  state => state.RequestSuccess,
);
