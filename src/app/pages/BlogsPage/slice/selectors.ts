import { RootState } from 'types';
import { initialState } from '.';
import { createSelector } from '@reduxjs/toolkit';

const selectSlice = (state: RootState) => state?.blogs || initialState;

export const selectBlogs = createSelector([selectSlice], state => state.blogs);

export const selectSpecificBlog = createSelector(
  [selectSlice],
  state => state.currentBlog,
);

export const selectIsLoading = createSelector(
  [selectSlice],
  state => state.isLoading,
);

export const selectFailureResponse = createSelector(
  [selectSlice],
  state => state.failureResponse,
);

export const selectUpdateResponse = createSelector(
  [selectSlice],
  state => state.updateSuccess,
);

export const selectCreateResponse = createSelector(
  [selectSlice],
  state => state.createSuccess,
);
