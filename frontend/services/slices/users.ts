/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { registerUser, setPrimaryPassword, verifyEmailToken } from '../../utils/api';
import { AppDispatch, AppThunk } from '../store';

interface IInitialState {
  signupEmail: string;
  status: string;
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
  }
}

const initialState: IInitialState = {
  signupEmail: '',
  status: 'success',
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
    setRegistrationEmail(state, action) {
      state.signupEmail = action.payload;
    },
  },
});

export const {
  setUser,
  setRegistrationEmail,
} = userSlice.actions;

export const signup: AppThunk = (email: string) => (dispatch: AppDispatch) => registerUser(email)
  .then(() => dispatch(setRegistrationEmail(email)))
  .catch((error) => {
    throw new Error(error);
  });

export const verifySignupEmailToken: AppThunk = (token: string) => (dispatch: AppDispatch) => verifyEmailToken(token)
  .then((res) => dispatch(setUser(res.data)))
  .catch((error) => {
    throw new Error(error);
  });

export const confirmPassword: AppThunk = ({
  uuid, password, role, company,
}: any) => (dispatch: AppDispatch) => setPrimaryPassword(uuid, password, role, company)
  .then((res) => dispatch(setUser(res.data)))
  .catch((error) => {
    throw new Error(error);
  });
