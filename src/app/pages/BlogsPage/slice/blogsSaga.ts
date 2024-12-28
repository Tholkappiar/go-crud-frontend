import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { BlogActions as actions } from './blogSlice';

const baseBlogAPI = 'http://localhost:8080';
const createBlogAPI = `${baseBlogAPI}/blog`;
const readBlogsAPI = `${baseBlogAPI}/blogs`;
const readBlogAPI = id => `${baseBlogAPI}/blog/${id}`;
const updateBlogAPI = id => `${baseBlogAPI}/blog/${id}`;
const deleteBlogAPI = id => `${baseBlogAPI}/blog/${id}`;

function* fetchBlogs() {
  try {
    const { data } = yield call(() => axios.get(readBlogsAPI));
    if (data) {
      yield put(actions.readBlogsSuccess(data.blogs));
    }
  } catch (err) {
    yield put(actions.readBlogsFailure());
  }
}

function* fetchBlog(action) {
  try {
    const { data } = yield call(() => axios.get(readBlogAPI(action.payload)));
    if (data) {
      yield put(actions.readBlogSuccess(data.blogs));
    }
  } catch (err) {
    yield put(actions.readBlogFailure());
  }
}

function* createBlog(action) {
  try {
    yield call(() =>
      axios.post(createBlogAPI, action.payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }),
    );
    yield put(actions.createBlogSuccess());
  } catch (err) {
    yield put(actions.createBlogFailure());
  }
}

function* updateBlog(action) {
  console.log(action);
  try {
    const { data } = yield call(() =>
      axios.put(updateBlogAPI(action.payload.id), action.payload.data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }),
    );
    if (data) {
      yield put(actions.updateBlogSuccess());
    }
  } catch (err) {
    yield put(actions.updateBlogFailure);
  }
}

function* deleteBlog(action) {
  try {
    const data = yield call(() =>
      axios.delete(deleteBlogAPI(action.payload), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
      }),
    );
    if (data) {
      yield put(actions.deleteBlogSuccess(action.payload));
    }
  } catch (err) {
    yield put(actions.deleteBlogFailure());
  }
}

export default function* blogsSagas() {
  yield takeLatest(actions.createBlog.type, createBlog);
  yield takeLatest(actions.readBlogs.type, fetchBlogs);
  yield takeLatest(actions.updateBlog.type, updateBlog);
  yield takeLatest(actions.deleteBlog.type, deleteBlog);
  yield takeLatest(actions.readBlog.type, fetchBlog);
}
