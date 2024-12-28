import { createSlice } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import userSagas from './userSagas';
import { userState } from './types';

export const userInitialState: userState = {
  user: {
    user_id: '',
    jwt: '',
  },
  isLoading: false,
  RequestSuccess: false,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState: userInitialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoading = true;
      state.RequestSuccess = false;
    },
    loginUserSuccess: (state, action) => {
      state.isLoading = false;
      state.RequestSuccess = true;
      const user = {
        jwt: action.payload?.session?.access_token,
        user_id: action.payload?.session?.user?.id,
      };
      state.user = user;
    },
    loginUserFailure: state => {
      state.isLoading = false;
      state.RequestSuccess = false;
    },
    registerUser: (state, action) => {
      state.isLoading = true;
      state.RequestSuccess = false;
    },
    registerUserSuccess: (state, action) => {
      state.isLoading = false;
      state.RequestSuccess = true;
      state.user = action.payload;
    },
    registerUserFailure: state => {
      state.isLoading = false;
      state.RequestSuccess = false;
    },
  },
});

export const { actions: UserActions } = userSlice;

export default userSlice.reducer;

export const useUserSlice = () => {
  useInjectReducer({ key: userSlice.name, reducer: userSlice.reducer });
  useInjectSaga({ key: userSlice.name, saga: userSagas });
  return { actions: userSlice.actions };
};
