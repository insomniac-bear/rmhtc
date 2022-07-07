/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { verifyEmailToken } from '../api/api';
import { AppDispatch, AppThunk } from '../store';

interface IInitialState {
  isAuth: boolean,
  user: {
    uuid: string;
    email: string;
    emailVerified: boolean;
    businessRole?: any;
    name?: any;
    surname?: any;
    avatarUrl?: any;
    createdAt?: Date;
    updatedAt?: Date;
    accessToken?: string;
  }
}

const initialState: IInitialState = {
  isAuth: false,
  user: {
    uuid: '',
    emailVerified: false,
    name: '',
    email: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser() {
      return initialState;
    },
    setUserAuth(state, action) {
      state.isAuth = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  setUserAuth,
} = userSlice.actions;

export const verifySignupEmailToken: AppThunk = (token: string) => (dispatch: AppDispatch) => verifyEmailToken(token)
  .then((res) => dispatch(setUser(res.data)))
  .catch((error) => {
    throw new Error(error);
  });
