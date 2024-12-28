import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { UserActions as actions } from './userSlice';

const loginAPI = `http://localhost:8080/user/login`;
const registerAPI = `http://localhost:8080/user/register`;

function* loginUserApi(action) {
  try {
    const response = yield call(() => axios.post(loginAPI, action.payload));
    const data = response.data;
    if (response) {
      yield put(actions.loginUserSuccess(data));
    }
  } catch (err) {
    yield put(actions.loginUserFailure());
  }
}

function* registerUserApi(action) {
  try {
    const { data } = yield call(() => axios.post(registerAPI, action.payload));
    if (data) {
      yield put(actions.registerUserSuccess(data));
    }
  } catch (err) {
    yield put(actions.registerUserFailure());
  }
}

export default function* fetchLoginUser() {
  yield takeLatest(actions.loginUser.type, loginUserApi);
  yield takeLatest(actions.registerUser.type, registerUserApi);
}
