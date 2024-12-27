import { call, put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosInstance } from 'axios';
import { BlogActions as actions } from './index';
import { Blog } from './types';

const BASE_URL = 'http://localhost:8080';

const getAxiosInstance = (): AxiosInstance => {
  const token = localStorage.getItem('jwt');
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

function* fetchBlogsSaga() {
  try {
    const axiosInstance = getAxiosInstance();
    const response = yield call([axiosInstance, 'get'], '/blogs');
    yield put(actions.getBlogSuccess(response.data.blogs));
  } catch (error: any) {
    yield put(actions.requestFailure(error.message || 'Failed to fetch blogs'));
  }
}

function* createBlogSaga(action: ReturnType<typeof actions.createBlog>) {
  try {
    const axiosInstance = getAxiosInstance();
    yield call([axiosInstance, 'post'], '/blog', action.payload);
    yield put(actions.getBlogs());
  } catch (error: any) {
    yield put(actions.requestFailure(error.message || 'Failed to create blog'));
  }
}

function* getBlogSaga(action: ReturnType<typeof actions.getSpecificBlog>) {
  try {
    const axiosInstance = getAxiosInstance();
    const response = yield call(
      [axiosInstance, 'get'],
      `/blog/${action.payload}`,
    );
    yield put(actions.getSpecificBlogSuccess(response.data.blogs));
  } catch (error: any) {
    yield put(actions.requestFailure(error.message || 'Failed to fetch blog'));
  }
}

function* updateBlogSaga(action: ReturnType<typeof actions.updateBlog>) {
  try {
    const axiosInstance = getAxiosInstance();
    const { id, data } = action.payload;
    yield call([axiosInstance, 'put'], `/blog/${id}`, data);
    yield put(actions.getBlogs());
  } catch (error: any) {
    yield put(actions.requestFailure(error.message || 'Failed to update blog'));
  }
}

function* deleteBlogSaga(action: ReturnType<typeof actions.deleteBlog>) {
  try {
    const axiosInstance = getAxiosInstance();
    yield call([axiosInstance, 'delete'], `/blog/${action.payload}`);
    yield put(actions.getBlogs());
  } catch (error: any) {
    yield put(actions.requestFailure(error.message || 'Failed to delete blog'));
  }
}

export function* BlogsSaga() {
  yield takeLatest(actions.getBlogs.type, fetchBlogsSaga);
  yield takeLatest(actions.createBlog.type, createBlogSaga);
  yield takeLatest(actions.updateBlog.type, updateBlogSaga);
  yield takeLatest(actions.deleteBlog.type, deleteBlogSaga);
  yield takeLatest(actions.getSpecificBlog.type, getBlogSaga);
}
