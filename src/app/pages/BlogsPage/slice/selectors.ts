import { RootState } from 'types';
import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './blogSlice';

const selectSlice = (state: RootState) => state.blogSlice || initialState;

export const selectBlogs = createSelector([selectSlice], state => {
  return state.blogs;
});

export const selectSpecificBlog = createSelector([selectSlice], state => {
  return state.blog;
});

export const selectIsLoading = createSelector(
  [selectSlice],
  state => state.isLoading,
);

export const selectRequestSuccess = createSelector(
  [selectSlice],
  state => state.requestSuccess,
);
