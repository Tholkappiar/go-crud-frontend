import { createSlice } from '@reduxjs/toolkit';
import { BlogState } from './types';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import blogsSagas from './blogsSaga';

export const initialState: BlogState = {
  blogs: [],
  isLoading: false,
  requestSuccess: false,
  blog: undefined,
};

const blogSlice = createSlice({
  name: 'blogSlice',
  initialState,
  reducers: {
    createBlog: (state, action) => {
      state.isLoading = true;
      state.requestSuccess = false;
    },
    createBlogSuccess: state => {
      state.isLoading = false;
      state.requestSuccess = true;
    },
    createBlogFailure: state => {
      state.isLoading = false;
      state.requestSuccess = false;
    },
    readBlogs: state => {
      state.isLoading = true;
      state.requestSuccess = false;
    },
    readBlogsSuccess: (state, action) => {
      state.isLoading = false;
      state.blogs = action.payload;
    },
    readBlogsFailure: state => {
      state.isLoading = false;
      state.requestSuccess = false;
    },
    updateBlog: (state, action) => {
      state.isLoading = true;
      state.requestSuccess = false;
    },
    updateBlogSuccess: state => {
      state.isLoading = false;
      state.requestSuccess = true;
    },
    updateBlogFailure: (state, action) => {
      state.isLoading = false;
      state.requestSuccess = false;
    },
    deleteBlog: (state, action) => {
      state.isLoading = true;
      state.requestSuccess = false;
    },
    deleteBlogSuccess: (state, action) => {
      state.isLoading = false;
      state.requestSuccess = true;
      state.blogs = state.blogs.filter(blog => blog.Id !== action.payload);
    },
    deleteBlogFailure: state => {
      state.isLoading = false;
      state.requestSuccess = false;
    },
    readBlog: (state, action) => {
      state.isLoading = true;
      state.requestSuccess = false;
    },
    readBlogSuccess: (state, action) => {
      state.isLoading = false;
      state.blog = action.payload;
    },
    readBlogFailure: state => {
      state.isLoading = false;
      state.requestSuccess = false;
    },
  },
});

export const { actions: BlogActions } = blogSlice;

export default blogSlice.reducer;

export const useBlogSlice = () => {
  useInjectReducer({ key: blogSlice.name, reducer: blogSlice.reducer });
  useInjectSaga({ key: blogSlice.name, saga: blogsSagas });
  return { actions: blogSlice.actions };
};
