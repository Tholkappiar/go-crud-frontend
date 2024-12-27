import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { todoActions as actions } from '.';

// function* doSomething() {}

const fetchTodo = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return data;
};

function* fetchTodosSaga() {
  const response = yield call(fetchTodo);
  yield put(actions.getTodoSuccess(response));
}

export function* todoSaga() {
  yield takeLatest(actions.getTodo.type, fetchTodosSaga);
}
