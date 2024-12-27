import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { todoSaga } from './saga';
import { Todo, TodoState } from './types';

export const initialState: TodoState = {
  isLoading: false,
  todos: null,
  failureResponse: null,
};

const slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
    getTodo(state) {
      state.isLoading = true;
    },
    getTodoSuccess(state, action: PayloadAction<Todo[]>) {
      state.isLoading = false;
      state.todos = action.payload;
    },
  },
});

export const { actions: todoActions } = slice;

export const useTodoSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: todoSaga });
  return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useTodoSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
