import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { Blog, BlogState } from './types';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { BlogsSaga } from './saga';

export const initialState: BlogState = {
  isLoading: false,
  blogs: [],
  currentBlog: null,
  failureResponse: null,
  updateSuccess: false,
  createSuccess: false,
};

const Blogslice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    getBlogs(state) {
      state.isLoading = true;
      state.failureResponse = null;
    },
    getBlogSuccess(state, action: PayloadAction<Blog[]>) {
      state.isLoading = false;
      state.blogs = action.payload;
      state.failureResponse = null;
    },
    createBlog(
      state,
      action: PayloadAction<{ Title: string; Description: string }>,
    ) {
      state.isLoading = true;
      state.failureResponse = null;
      state.createSuccess = true;
    },
    createBlogSuccess(state) {
      state.isLoading = false;
      state.failureResponse = null;
      state.createSuccess = false;
    },
    updateBlog(
      state,
      action: PayloadAction<{
        id: number;
        data: { Title: string; Description: string };
      }>,
    ) {
      state.isLoading = true;
      state.failureResponse = null;
      state.updateSuccess = true;
    },
    updateBlogSuccess(state, action: PayloadAction<Blog>) {
      state.isLoading = false;
      state.failureResponse = null;
      state.currentBlog = action.payload;
      state.updateSuccess = false;
    },
    resetUpdateSuccess(state) {
      state.updateSuccess = false;
    },
    deleteBlog(state, action: PayloadAction<number>) {
      state.isLoading = true;
      state.failureResponse = null;
    },
    deleteBlogSuccess(state) {
      state.isLoading = false;
      state.failureResponse = null;
    },
    requestFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.failureResponse = action.payload;
      state.updateSuccess = false;
    },
    getSpecificBlog(state, action: PayloadAction<number>) {
      state.isLoading = true;
      state.failureResponse = null;
      state.currentBlog = null;
      state.updateSuccess = false;
    },
    getSpecificBlogSuccess(state, action: PayloadAction<Blog>) {
      state.isLoading = false;
      state.currentBlog = action.payload;
      state.failureResponse = null;
    },
    resetSpecificBlog(state) {
      state.currentBlog = null;
      state.failureResponse = null;
      state.updateSuccess = false;
    },
  },
});

export const { actions: BlogActions } = Blogslice;

export const useBlogSlice = () => {
  useInjectReducer({ key: Blogslice.name, reducer: Blogslice.reducer });
  useInjectSaga({ key: Blogslice.name, saga: BlogsSaga });
  return { actions: Blogslice.actions };
};

export default Blogslice.reducer;
